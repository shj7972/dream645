import type { Metadata } from 'next'
import Link from 'next/link'
import blogPosts from '@/data/blog_posts.json'
import AdUnit from '../components/AdUnit'

export const metadata: Metadata = {
    title: '꿈해몽 블로그 - 꿈 해석 가이드와 팁',
    description:
        '꿈해몽 방법, 태몽 가이드, 악몽 대처법, 로또 번호 선택법 등 꿈에 대한 모든 정보를 확인하세요.',
    alternates: {
        canonical: 'https://www.dream645.kr/blog',
    },
    openGraph: {
        title: '꿈해몽 블로그 - 꿈 해석 가이드와 팁',
        description:
            '꿈해몽 방법, 태몽 가이드, 악몽 대처법, 로또 번호 선택법 등 꿈에 대한 모든 정보를 확인하세요.',
        url: 'https://www.dream645.kr/blog',
        siteName: 'Dream645',
        locale: 'ko_KR',
        type: 'website',
    },
}

const CATEGORY_LABELS: Record<string, { label: string; emoji: string }> = {
    guide: { label: '가이드', emoji: '📖' },
    tip: { label: '팁', emoji: '💡' },
    knowledge: { label: '지식', emoji: '🧠' },
}

export default function BlogListPage() {
    const sortedPosts = [...blogPosts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    const blogListJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: '꿈해몽 블로그',
        description: '꿈 해석, 태몽, 꿈해몽 가이드 등 꿈에 대한 블로그',
        url: 'https://www.dream645.kr/blog',
        blogPost: sortedPosts.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            url: `https://www.dream645.kr/blog/${post.slug}`,
        })),
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(blogListJsonLd),
                }}
            />

            <div className="background-overlay"></div>

            <header className="detail-header">
                <nav aria-label="브레드크럼" className="breadcrumb">
                    <Link href="/">홈</Link>
                    <span className="breadcrumb-sep">›</span>
                    <span className="breadcrumb-current">블로그</span>
                </nav>
            </header>

            <main className="blog-main">
                <section className="blog-hero">
                    <h1 className="blog-hero-title">📝 꿈해몽 블로그</h1>
                    <p className="blog-hero-description">
                        꿈의 의미부터 활용법까지, 꿈에 대한 모든 이야기
                    </p>
                </section>

                {/* 광고: 목록 상단 */}
                <AdUnit slot="7981263686" minHeight={100} />

                <section className="blog-grid" aria-label="블로그 글 목록">
                    {sortedPosts.map((post) => {
                        const cat = CATEGORY_LABELS[post.category]
                        return (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="blog-card"
                            >
                                <div className="blog-card-meta">
                                    <span className="blog-card-category">
                                        {cat?.emoji} {cat?.label}
                                    </span>
                                    <span className="blog-card-date">
                                        {post.date}
                                    </span>
                                </div>
                                <h2 className="blog-card-title">
                                    {post.title}
                                </h2>
                                <p className="blog-card-description">
                                    {post.description}
                                </p>
                                <span className="blog-card-read">
                                    읽는 시간 약 {post.readTime}분 →
                                </span>
                            </Link>
                        )
                    })}
                </section>

                <div className="cta-section">
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
