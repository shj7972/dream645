import Link from 'next/link'
import dreamsData from '@/data/dreams_new.json'
import DreamGrid from './components/DreamGrid'

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

                {/* SEO용 카테고리 내비게이션 - 크롤러가 카테고리 페이지를 발견 */}
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

            {/* SEO용 숨김 콘텐츠: 검색엔진이 페이지 내용을 파악할 수 있도록 서버 렌더링 */}
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
                <p>&copy; 2026 신비의 기록. All rights reserved.</p>
            </footer>
        </>
    )
}
