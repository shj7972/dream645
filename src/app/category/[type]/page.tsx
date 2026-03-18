import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import dreamsData from '@/data/dreams_new.json'

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

const VALID_TYPES = ['good', 'bad', 'baby'] as const

const TYPE_META: Record<
    string,
    {
        label: string
        emoji: string
        title: string
        description: string
        keywords: string[]
    }
> = {
    good: {
        label: '길몽',
        emoji: '🍀',
        title: '길몽 모음 - 좋은 꿈 해몽 총정리',
        description:
            '행운과 복을 가져다주는 길몽 모음입니다. 황금돼지, 용, 잉어 등 좋은 꿈의 의미와 행운의 로또 번호를 무료로 확인하세요.',
        keywords: [
            '길몽',
            '좋은 꿈',
            '길몽 모음',
            '길몽 해몽',
            '길몽 종류',
            '길몽 리스트',
            '행운의 꿈',
            '꿈해몽 길몽',
            '로또 꿈',
            '로또 당첨 꿈',
            '돈 생기는 꿈',
            '무료 꿈해몽',
            '2026년 길몽',
        ],
    },
    bad: {
        label: '흉몽',
        emoji: '🧿',
        title: '흉몽 모음 - 나쁜 꿈 해몽과 대처법',
        description:
            '주의가 필요한 흉몽 모음입니다. 나쁜 꿈의 의미를 정확히 알고 현명하게 대처하세요. 흉몽도 액땜이 될 수 있습니다.',
        keywords: [
            '흉몽',
            '나쁜 꿈',
            '흉몽 모음',
            '흉몽 해몽',
            '흉몽 종류',
            '흉몽 리스트',
            '무서운 꿈',
            '악몽 해석',
            '흉몽 대처법',
            '흉몽 액땜',
            '꿈 경고',
            '무료 꿈해몽',
            '2026년 흉몽',
        ],
    },
    baby: {
        label: '태몽',
        emoji: '👶',
        title: '태몽 모음 - 태몽 해몽과 의미 총정리',
        description:
            '귀한 아이를 예고하는 태몽 모음입니다. 호랑이, 용, 과일 등 태몽의 의미와 아이의 미래를 점쳐보세요.',
        keywords: [
            '태몽',
            '태몽 해몽',
            '태몽 모음',
            '태몽 의미',
            '태몽 종류',
            '태몽 리스트',
            '임신 꿈',
            '아기 꿈',
            '태몽 해석',
            '태몽 아들 딸',
            '태몽 꿈 의미',
            '무료 꿈해몽',
            '2026년 태몽',
        ],
    },
}

const TYPE_EMOJI: Record<string, string> = {
    good: '🍀',
    bad: '🧿',
    baby: '👶',
}

export async function generateStaticParams() {
    return VALID_TYPES.map((type) => ({ type }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ type: string }>
}): Promise<Metadata> {
    const { type } = await params
    const meta = TYPE_META[type]

    if (!meta) {
        return { title: '카테고리를 찾을 수 없습니다 | Dream645' }
    }

    return {
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        alternates: {
            canonical: `https://www.dream645.kr/category/${type}`,
        },
        openGraph: {
            title: `${meta.title} | Dream645`,
            description: meta.description,
            url: `https://www.dream645.kr/category/${type}`,
            siteName: 'Dream645',
            locale: 'ko_KR',
            type: 'website',
            images: [
                {
                    url: '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: `Dream645 ${meta.label} 꿈해몽`,
                },
            ],
        },
    }
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ type: string }>
}) {
    const { type } = await params
    const meta = TYPE_META[type]

    if (!meta) {
        notFound()
    }

    const filteredDreams = dreams.filter((d) => d.type === type)

    // BreadcrumbList JSON-LD
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
                name: meta.label,
            },
        ],
    }

    // CollectionPage JSON-LD
    const collectionJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: meta.title,
        description: meta.description,
        url: `https://www.dream645.kr/category/${type}`,
        isPartOf: {
            '@type': 'WebSite',
            name: 'Dream645',
            url: 'https://www.dream645.kr',
        },
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(collectionJsonLd),
                }}
            />

            <div className="background-overlay"></div>

            <header className="detail-header">
                <nav aria-label="브레드크럼" className="breadcrumb">
                    <Link href="/">홈</Link>
                    <span className="breadcrumb-sep">›</span>
                    <span className="breadcrumb-current">
                        {meta.emoji} {meta.label}
                    </span>
                </nav>
            </header>

            <main className="category-main">
                <section className="category-hero">
                    <h1 className="category-title">
                        {meta.emoji} {meta.title}
                    </h1>
                    <p className="category-description">{meta.description}</p>
                    <p className="category-count">
                        총 <strong>{filteredDreams.length}</strong>개의{' '}
                        {meta.label}
                    </p>
                </section>

                <section
                    className="category-grid"
                    aria-label={`${meta.label} 목록`}
                >
                    {filteredDreams.map((dream) => (
                        <Link
                            key={dream.id}
                            href={`/dream/${dream.id}`}
                            className="category-card"
                        >
                            <span
                                className={`dream-type type-${dream.type}`}
                            >
                                {meta.label}
                            </span>
                            <h2>{dream.title}</h2>
                            <p className="category-card-summary">
                                {dream.summary.slice(0, 80)}...
                            </p>
                            <div className="lucky-numbers">
                                {dream.lucky_numbers.map((num) => (
                                    <span key={num} className="number-circle">
                                        {num}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </section>

                {/* 다른 카테고리 링크 */}
                <nav className="other-categories" aria-label="다른 카테고리">
                    <h2>다른 카테고리도 확인해 보세요</h2>
                    <div className="other-categories-links">
                        {VALID_TYPES.filter((t) => t !== type).map((t) => (
                            <Link
                                key={t}
                                href={`/category/${t}`}
                                className="other-category-link"
                            >
                                {TYPE_EMOJI[t]} {TYPE_META[t].label} 보기
                            </Link>
                        ))}
                        <Link href="/" className="other-category-link">
                            🔮 전체 꿈해몽 보기
                        </Link>
                    </div>
                </nav>
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
