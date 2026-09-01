import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import blogPosts from '@/data/blog_posts.json'
import dreamsData from '@/data/dreams_new.json'
import BlogShareButtons from '@/app/components/BlogShareButtons'
import AdUnit from '@/app/components/AdUnit'

interface BlogPost {
    slug: string
    title: string
    description: string
    category: string
    date: string
    readTime: number
    content: { type: string; text: string }[]
    relatedDreamIds: string[]
}

interface Dream {
    id: string
    title: string
    type: 'good' | 'bad' | 'baby'
    summary: string
}

const posts: BlogPost[] = blogPosts as BlogPost[]
const dreams: Dream[] = dreamsData as Dream[]

const TYPE_EMOJI: Record<string, string> = {
    good: '🍀',
    bad: '🧿',
    baby: '👶',
}

const TYPE_LABELS: Record<string, string> = {
    good: '길몽',
    bad: '흉몽',
    baby: '태몽',
}

const CATEGORY_LABELS: Record<string, string> = {
    guide: '📖 가이드',
    tip: '💡 팁',
    knowledge: '🧠 지식',
}

export async function generateStaticParams() {
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const post = posts.find((p) => p.slug === slug)

    if (!post) {
        return { title: '글을 찾을 수 없습니다' }
    }

    const categoryConfig: Record<string, string[]> = {
        guide: ['꿈해몽 방법', '꿈 해석 가이드', '꿈해몽 총정리', '꿈해몽 하는법'],
        tip: ['꿈해몽 팁', '꿈 활용법', '꿈해몽 노하우', '로또 꿈 번호'],
        knowledge: ['꿈 지식', '꿈 상징', '꿈해몽 원리', '꿈 심리학'],
    }

    // 제목에서 핵심 키워드 추출 (2~5글자 명사 토큰)
    const titleKeywords = post.title
        .replace(/[—\-·|]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length >= 2 && w.length <= 8)
        .slice(0, 5)
        .map((w) => `${w} 해몽`)

    return {
        title: `${post.title} — 꿈해몽 블로그`,
        description: post.description,
        keywords: [
            post.title,
            '꿈해몽',
            '꿈 해석',
            '꿈풀이',
            ...titleKeywords,
            ...(categoryConfig[post.category] ?? []),
            '무료 꿈해몽',
            '2026년 꿈해몽',
        ],
        alternates: {
            canonical: `https://www.dream645.kr/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.description,
            url: `https://www.dream645.kr/blog/${post.slug}`,
            siteName: 'Dream645',
            locale: 'ko_KR',
            type: 'article',
            publishedTime: post.date,
            modifiedTime: post.date,
            images: [
                {
                    url: `https://www.dream645.kr/blog/${post.slug}/opengraph-image`,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: [`https://www.dream645.kr/blog/${post.slug}/opengraph-image`],
        },
    }
}

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = posts.find((p) => p.slug === slug)

    if (!post) {
        notFound()
    }

    // 관련 꿈 데이터 가져오기
    const relatedDreams = dreams.filter((d) =>
        post.relatedDreamIds.includes(d.id)
    )

    // 다른 블로그 글 추천 (현재 글 제외, 최대 3개)
    const otherPosts = posts
        .filter((p) => p.slug !== post.slug)
        .slice(0, 3)

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        author: {
            '@type': 'Organization',
            name: 'Dream645',
            url: 'https://www.dream645.kr',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Dream645',
            logo: {
                '@type': 'ImageObject',
                url: 'https://www.dream645.kr/logo.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.dream645.kr/blog/${post.slug}`,
        },
    }

    // FAQ Schema: 헤딩-단락 쌍에서 자동 생성 (최대 4개)
    const faqPairs: { question: string; answer: string }[] = []
    for (let i = 0; i < post.content.length - 1; i++) {
        if (
            post.content[i].type === 'heading' &&
            post.content[i + 1].type === 'paragraph'
        ) {
            faqPairs.push({
                question: post.content[i].text,
                answer: post.content[i + 1].text,
            })
            if (faqPairs.length >= 4) break
        }
    }

    const faqJsonLd =
        faqPairs.length > 0
            ? {
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  mainEntity: faqPairs.map((pair) => ({
                      '@type': 'Question',
                      name: pair.question,
                      acceptedAnswer: {
                          '@type': 'Answer',
                          text: pair.answer,
                      },
                  })),
              }
            : null

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: '홈',
                item: 'https://www.dream645.kr',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: '블로그',
                item: 'https://www.dream645.kr/blog',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
            },
        ],
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleJsonLd),
                }}
            />
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(faqJsonLd),
                    }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd),
                }}
            />

            <div className="background-overlay"></div>

            <header className="detail-header">
                <nav aria-label="브레드크럼" className="breadcrumb">
                    <Link href="/">홈</Link>
                    <span className="breadcrumb-sep">›</span>
                    <Link href="/blog">블로그</Link>
                    <span className="breadcrumb-sep">›</span>
                    <span className="breadcrumb-current">{post.title}</span>
                </nav>
            </header>

            <main className="detail-main">
                <article className="blog-article">
                    {/* 카테고리 + 날짜 */}
                    <div className="blog-article-meta">
                        <span className="blog-article-category">
                            {CATEGORY_LABELS[post.category]}
                        </span>
                        <time dateTime={post.date}>{post.date}</time>
                        <span>· 읽는 시간 약 {post.readTime}분</span>
                    </div>

                    <h1 className="blog-article-title">{post.title}</h1>

                    <p className="blog-article-description">
                        {post.description}
                    </p>

                    {/* 본문 콘텐츠 */}
                    <div className="blog-article-content">
                        {post.content.map((block, i) => {
                            if (block.type === 'heading') {
                                return (
                                    <h2 key={i} className="blog-content-heading">
                                        {block.text}
                                    </h2>
                                )
                            }
                            return (
                                <p key={i} className="blog-content-paragraph">
                                    {block.text}
                                </p>
                            )
                        })}
                    </div>
                </article>

                {/* 공유 버튼 */}
                <BlogShareButtons
                    title={post.title}
                    description={post.description}
                    url={`https://www.dream645.kr/blog/${post.slug}`}
                />

                {/* 관련 꿈해몽 */}
                {/* 광고: 본문 하단 */}
                <AdUnit slot="7981263686" minHeight={100} />

                {relatedDreams.length > 0 && (
                    <aside className="related-dreams-section">
                        <h2>🔮 관련 꿈해몽</h2>
                        <nav
                            aria-label="관련 꿈 목록"
                            className="related-dreams-grid"
                        >
                            {relatedDreams.map((d) => (
                                <Link
                                    key={d.id}
                                    href={`/dream/${d.id}`}
                                    className="related-dream-card"
                                >
                                    <span className="related-dream-emoji">
                                        {TYPE_EMOJI[d.type]}
                                    </span>
                                    <div className="related-dream-info">
                                        <span
                                            className={`dream-type type-${d.type} small`}
                                        >
                                            {TYPE_LABELS[d.type]}
                                        </span>
                                        <h3>{d.title}</h3>
                                        <p>{d.summary.slice(0, 60)}...</p>
                                    </div>
                                </Link>
                            ))}
                        </nav>
                    </aside>
                )}

                {/* 다른 블로그 글 */}
                <aside className="related-dreams-section">
                    <h2>📝 다른 글도 읽어보세요</h2>
                    <nav
                        aria-label="다른 블로그 글"
                        className="related-dreams-grid"
                    >
                        {otherPosts.map((p) => (
                            <Link
                                key={p.slug}
                                href={`/blog/${p.slug}`}
                                className="related-dream-card"
                            >
                                <span className="related-dream-emoji">📖</span>
                                <div className="related-dream-info">
                                    <span className="dream-type small" style={{ color: '#a78bfa' }}>
                                        {CATEGORY_LABELS[p.category]}
                                    </span>
                                    <h3>{p.title}</h3>
                                    <p>{p.description.slice(0, 60)}...</p>
                                </div>
                            </Link>
                        ))}
                    </nav>
                </aside>

                <div className="cta-section">
                    <Link href="/blog" className="cta-btn" style={{ marginRight: '1rem' }}>
                        📝 블로그 더보기
                    </Link>
                    <Link href="/" className="cta-btn">
                        🔮 꿈해몽 바로가기
                    </Link>
                </div>
            </main>

            <footer>
                <div className="footer-links">
                    <Link href="/about">서비스 소개</Link>
                    <span>|</span>
                    <Link href="/privacy">개인정보처리방침</Link>
                    <span>|</span>
                    <Link href="/contact">문의하기</Link>
                </div>
                <p>&copy; 2026 Dream645 신비의 기록. All rights reserved.</p>
            </footer>
        </>
    )
}
