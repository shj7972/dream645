import Link from 'next/link'
import dreamsData from '@/data/dreams_new.json'
import blogPosts from '@/data/blog_posts.json'
import DreamGrid from './components/DreamGrid'
import NewsletterForm from './components/NewsletterForm'
import AdUnit from './components/AdUnit'

interface Dream {
    id: string
    title: string
    type: 'good' | 'bad' | 'baby'
    summary: string
    detail: string
    lucky_numbers: number[]
    action_tip: string
}

const dreams: Dream[] = dreamsData as Dream[]

const TYPE_LABEL: Record<string, string> = { good: '길몽', bad: '흉몽', baby: '태몽' }
const TYPE_EMOJI: Record<string, string> = { good: '🍀', bad: '🧿', baby: '👶' }

// 날짜 기반으로 오늘의 꿈 선택 (매일 자정에 바뀜)
function getDreamOfTheDay(): Dream {
    const now = new Date()
    const dayOfYear =
        Math.floor(
            (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
        )
    return dreams[dayOfYear % dreams.length]
}

// 홈페이지 전용 JSON-LD: ItemList 스키마 (인기 꿈 목록)
const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '인기 꿈해몽 목록',
    description: '가장 많이 검색되는 꿈해몽 목록입니다.',
    numberOfItems: dreams.length,
    itemListElement: dreams.slice(0, 10).map((dream, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: dream.title,
        url: `https://www.dream645.kr/dream/${dream.id}`,
    })),
}

export default function Home() {
    const goodCount = dreams.filter((d) => d.type === 'good').length
    const badCount = dreams.filter((d) => d.type === 'bad').length
    const babyCount = dreams.filter((d) => d.type === 'baby').length

    const todayDream = getDreamOfTheDay()

    const recentBlogPosts = [...blogPosts]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3)

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(itemListJsonLd),
                }}
            />

            <div className="background-overlay"></div>

            <header>
                <div className="logo">
                    <img
                        src="/logo.svg"
                        alt="Dream645 Logo"
                        className="logo-image"
                        width={60}
                        height={60}
                    />
                    <div className="logo-text">
                        <h1>신비의 기록</h1>
                        <p>당신의 꿈에 담긴 비밀을 풀어보세요</p>
                    </div>
                </div>

                {/* SEO용 카테고리 내비게이션 */}
                <nav aria-label="꿈 카테고리" className="home-category-nav">
                    <Link href="/category/good" className="home-category-link type-good">
                        🍀 길몽 ({goodCount})
                    </Link>
                    <Link href="/category/bad" className="home-category-link type-bad">
                        🧿 흉몽 ({badCount})
                    </Link>
                    <Link href="/category/baby" className="home-category-link type-baby">
                        👶 태몽 ({babyCount})
                    </Link>
                </nav>

                <DreamGrid dreams={dreams} />
            </header>

            {/* 오늘의 꿈 섹션 */}
            <section className="today-dream-section" aria-label="오늘의 꿈">
                <div className="today-dream-inner">
                    <div className="today-dream-header">
                        <span className="today-dream-badge">✨ 오늘의 꿈</span>
                        <h2 className="today-dream-title">{todayDream.title}</h2>
                        <span className={`today-dream-type type-${todayDream.type}`}>
                            {TYPE_EMOJI[todayDream.type]} {TYPE_LABEL[todayDream.type]}
                        </span>
                    </div>
                    <p className="today-dream-summary">{todayDream.summary}</p>
                    <div className="today-dream-numbers">
                        <span className="today-dream-numbers-label">오늘의 행운 번호</span>
                        <div className="lucky-numbers">
                            {todayDream.lucky_numbers.map((num) => (
                                <span key={num} className="number-circle">{num}</span>
                            ))}
                        </div>
                    </div>
                    <Link href={`/dream/${todayDream.id}`} className="today-dream-cta">
                        자세한 해몽 보기 →
                    </Link>
                </div>
            </section>

            {/* 광고: 메인 중단 */}
            <AdUnit slot="7981263686" minHeight={100} />

            {/* 블로그 미리보기 섹션 */}
            <section className="home-blog-section" aria-label="꿈해몽 블로그">
                <div className="home-blog-inner">
                    <div className="home-blog-header">
                        <h2 className="home-blog-section-title">📝 꿈해몽 가이드</h2>
                        <Link href="/blog" className="home-blog-more">
                            전체 보기 →
                        </Link>
                    </div>
                    <div className="home-blog-grid">
                        {recentBlogPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="home-blog-card"
                            >
                                <p className="home-blog-card-title">{post.title}</p>
                                <p className="home-blog-card-desc">{post.description}</p>
                                <span className="home-blog-card-read">
                                    약 {post.readTime}분 →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 뉴스레터 구독 섹션 */}
            <section className="newsletter-section" aria-label="뉴스레터 구독">
                <div className="newsletter-inner">
                    <h2 className="newsletter-title">🌙 꿈해몽 소식 받아보기</h2>
                    <p className="newsletter-desc">
                        새로운 꿈해몽 가이드, 로또 번호 팁, 오늘의 꿈을 이메일로 받아보세요.
                    </p>
                    <NewsletterForm />
                    <p className="newsletter-privacy">
                        스팸 없음 · 언제든지 구독 취소 가능
                    </p>
                </div>
            </section>

            {/* SEO용 숨김 콘텐츠 */}
            <section className="seo-content" aria-label="꿈해몽 소개">
                <h2>무료 꿈해몽 - 꿈 해석과 로또 번호 추천</h2>
                <p>
                    Dream645는 {dreams.length}개 이상의 꿈해몽 데이터베이스를 보유한
                    무료 꿈 해석 서비스입니다. 길몽, 흉몽, 태몽으로 분류된 각 꿈의
                    상세한 의미와 행운의 로또 번호를 확인하세요.
                </p>
                <h3>카테고리별 꿈해몽</h3>
                <ul>
                    <li>
                        <Link href="/category/good">
                            길몽 (좋은 꿈) - {goodCount}개
                        </Link>
                        : 재물운, 승진, 합격 등 행운을 예고하는 꿈
                    </li>
                    <li>
                        <Link href="/category/bad">
                            흉몽 (나쁜 꿈) - {badCount}개
                        </Link>
                        : 주의가 필요한 꿈과 현명한 대처법
                    </li>
                    <li>
                        <Link href="/category/baby">
                            태몽 (아기 꿈) - {babyCount}개
                        </Link>
                        : 귀한 아이를 예고하는 태몽의 의미
                    </li>
                </ul>
                <h3>꿈해몽 블로그</h3>
                <p>
                    꿈에 대해 더 알고 싶다면{' '}
                    <Link href="/blog">꿈해몽 블로그</Link>를 확인하세요.
                    인기 꿈 TOP 10, 태몽 가이드, 악몽 대처법 등 유용한
                    가이드를 제공합니다.
                </p>
            </section>

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
