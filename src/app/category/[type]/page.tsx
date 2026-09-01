import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import dreamsData from '@/data/dreams_new.json'
import AdUnit from '@/app/components/AdUnit'

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

interface TypeMeta {
    label: string
    emoji: string
    title: string
    description: string
    keywords: string[]
    faq: { question: string; answer: string }[]
}

const TYPE_META: Record<string, TypeMeta> = {
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
        faq: [
            {
                question: '길몽이란 무엇인가요?',
                answer: '길몽(吉夢)은 좋은 일이 일어날 것을 예고하는 꿈입니다. 재물운, 건강운, 명예운, 애정운 등 삶의 긍정적인 변화를 앞두고 나타나는 꿈으로, 황금돼지·용·잉어 등이 등장하는 꿈이 대표적입니다.',
            },
            {
                question: '길몽을 꾸면 어떻게 해야 하나요?',
                answer: '길몽을 꾼 날은 오랫동안 미뤄왔던 중요한 결정이나 새로운 시작을 실행하기 좋은 날입니다. 로또나 복권을 가볍게 구입해 보는 것도 좋은 방법입니다. 무엇보다 긍정적인 마음가짐으로 하루를 시작하는 것이 중요합니다.',
            },
            {
                question: '길몽을 꾸면 반드시 좋은 일이 생기나요?',
                answer: '길몽이 반드시 좋은 일을 보장하지는 않습니다. 하지만 길몽을 꾼 날 긍정적인 에너지를 유지하면 주변의 기회에 더욱 열린 자세로 임하게 되어 좋은 결과를 만들어낼 가능성이 높아집니다.',
            },
            {
                question: '가장 강력한 재물 길몽은 무엇인가요?',
                answer: '전통 꿈해몽에서 가장 강력한 재물 길몽은 황금돼지가 집에 들어오는 꿈, 용이 하늘로 승천하는 꿈, 하늘에서 돈이 비처럼 쏟아지는 꿈 등입니다. 돈다발을 줍는 꿈이나 뱀이 몸을 감는 꿈도 강한 재물운을 예고합니다.',
            },
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
        faq: [
            {
                question: '흉몽을 꾸면 반드시 나쁜 일이 생기나요?',
                answer: '흉몽이 반드시 나쁜 일을 의미하지는 않습니다. 전통 꿈해몽에서는 흉몽이 오히려 액땜의 역할을 한다고 봅니다. 꿈에서 나쁜 일을 겪었으니 현실에서는 그 위험이 비켜간다는 해석입니다.',
            },
            {
                question: '흉몽을 꿨을 때 액땜 방법은 무엇인가요?',
                answer: '흉몽 후에는 굵은 소금을 현관에 뿌리거나 베개 아래 놓는 전통적인 방법이 있습니다. 또한 빨간 팥죽을 먹거나 밝은 색 옷을 입는 것도 나쁜 기운을 쫓는 전통적인 방법입니다. 심리적으로는 꿈이 전하는 경고를 현실에서 미리 준비하고 대비하는 것이 가장 현명한 방법입니다.',
            },
            {
                question: '흉몽과 길몽의 차이는 무엇인가요?',
                answer: '길몽은 재물·명예·건강 등 긍정적인 변화를 예고하는 꿈이고, 흉몽은 주의가 필요한 상황이나 경고를 담은 꿈입니다. 하지만 꿈의 의미는 고정된 것이 아니라 꿈꾼 사람의 상황과 세부 내용에 따라 달라집니다.',
            },
            {
                question: '반복되는 악몽의 의미는 무엇인가요?',
                answer: '반복되는 악몽은 현실에서 해결하지 못한 문제나 스트레스가 있다는 강한 신호입니다. 꿈이 전하는 메시지를 파악하고 현실의 해당 문제에 적극적으로 대처하는 것이 악몽을 없애는 근본적인 방법입니다.',
            },
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
        faq: [
            {
                question: '태몽이란 무엇인가요?',
                answer: '태몽은 임신 전후로 임산부 본인 또는 가까운 가족이 꾸는 특별한 꿈입니다. 보통 매우 생생하고 기억에 오래 남는 것이 특징으로, 전통적으로 태어날 아이의 성격·재능·미래를 예고한다고 여겨집니다.',
            },
            {
                question: '태몽으로 아이 성별을 알 수 있나요?',
                answer: '과학적으로 태몽과 성별 사이의 인과관계는 증명되지 않았습니다. 전통적으로 호랑이·용·큰 동물은 아들, 꽃·나비·보석은 딸을 예고한다고 알려져 있습니다. 재미있는 참고 자료로만 활용하시고 정확한 성별 확인은 초음파 검사로 하시기 바랍니다.',
            },
            {
                question: '태몽은 누가 꿀 수 있나요?',
                answer: '태몽은 임산부 본인뿐만 아니라 배우자, 부모님, 형제자매 등 가까운 가족도 꿀 수 있습니다. 심지어 임신 전에 미리 꾸는 경우도 있으며, 꿈이 특별히 생생하고 강렬하다면 태몽일 가능성이 높습니다.',
            },
            {
                question: '가장 길한 태몽은 무엇인가요?',
                answer: '전통 꿈해몽에서 가장 길한 태몽으로는 용이 나타나는 꿈, 호랑이가 품에 안는 꿈, 봉황이 날아오는 꿈이 꼽힙니다. 황금빛 물체나 빛나는 태양이 등장하는 꿈도 귀한 아이의 탄생을 예고하는 최상급 태몽입니다.',
            },
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
        return { title: '카테고리를 찾을 수 없습니다' }
    }

    return {
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        alternates: {
            canonical: `https://www.dream645.kr/category/${type}`,
        },
        openGraph: {
            title: meta.title,
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

    // FAQPage JSON-LD
    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: meta.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqJsonLd),
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

                {/* 광고: 목록 상단 */}
                <AdUnit slot="7981263686" minHeight={100} />

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
