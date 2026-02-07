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

const TYPE_LABELS: Record<string, string> = {
    good: '길몽',
    bad: '흉몽',
    baby: '태몽',
}

const TYPE_EMOJI: Record<string, string> = {
    good: '🍀',
    bad: '🧿',
    baby: '👶',
}

// --- SSG: 빌드 시 모든 꿈 페이지를 정적 생성 ---
export async function generateStaticParams() {
    return dreams.map((dream) => ({
        id: dream.id,
    }))
}

// --- 동적 메타데이터: 각 페이지에 고유한 title, description, OG ---
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>
}): Promise<Metadata> {
    const { id } = await params
    const dream = dreams.find((d) => d.id === id)

    if (!dream) {
        return { title: '꿈을 찾을 수 없습니다 | Dream645' }
    }

    const typeLabel = TYPE_LABELS[dream.type]
    const keyword = dream.title.replace(/ 꿈$/, '')
    const title = `${dream.title} 해몽 - ${typeLabel} | Dream645`
    const description = `${keyword} 꿈의 의미와 해석을 알아보세요. ${typeLabel}인 이 꿈의 상세 해몽, 행운의 로또 번호(${dream.lucky_numbers.join(', ')}), 행동 팁까지 무료로 확인하세요.`

    return {
        title,
        description,
        keywords: [
            dream.title,
            `${keyword} 꿈해몽`,
            `${keyword} 꿈 의미`,
            `${keyword} 꿈 해석`,
            typeLabel,
            '꿈해몽',
            '로또번호',
            '꿈풀이',
        ],
        alternates: {
            canonical: `https://www.dream645.kr/dream/${dream.id}`,
        },
        openGraph: {
            title,
            description,
            url: `https://www.dream645.kr/dream/${dream.id}`,
            siteName: 'Dream645',
            locale: 'ko_KR',
            type: 'article',
            images: [
                {
                    url: `/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: `${dream.title} - Dream645 꿈해몽`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/og-image.png'],
        },
    }
}

export default async function DreamDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const dream = dreams.find((d) => d.id === id)

    if (!dream) {
        notFound()
    }

    const typeLabel = TYPE_LABELS[dream.type]
    const typeEmoji = TYPE_EMOJI[dream.type]
    const keyword = dream.title.replace(/ 꿈$/, '')

    // 관련 꿈 추천: 같은 타입 우선, 최대 6개
    const relatedDreams = dreams
        .filter((d) => d.id !== dream.id && d.type === dream.type)
        .slice(0, 3)
    const otherTypeDreams = dreams
        .filter(
            (d) =>
                d.id !== dream.id &&
                d.type !== dream.type &&
                !relatedDreams.includes(d)
        )
        .slice(0, 3)
    const suggestedDreams = [...relatedDreams, ...otherTypeDreams]

    // JSON-LD 구조화 데이터
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${dream.title} 해몽`,
        description: dream.summary,
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
            '@id': `https://www.dream645.kr/dream/${dream.id}`,
        },
        image: `https://www.dream645.kr/cat_${dream.type}.png`,
    }

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: `${dream.title}은 무슨 뜻인가요?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: dream.summary,
                },
            },
            {
                '@type': 'Question',
                name: `${dream.title}의 행운의 숫자는?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `${dream.title}의 행운의 로또 번호는 ${dream.lucky_numbers.join(', ')}입니다.`,
                },
            },
            {
                '@type': 'Question',
                name: '꿈해몽은 과학적인가요?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: '꿈해몽은 심리학적 상징과 전통적인 민속 신앙이 결합된 해석입니다. 과학적 증명보다는 심리적 위안과 재미로 접근하는 것이 좋습니다.',
                },
            },
        ],
    }

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
                name: typeLabel,
                item: `https://www.dream645.kr/category/${dream.type}`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: dream.title,
            },
        ],
    }

    return (
        <>
            {/* 구조화 데이터 */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd),
                }}
            />

            <div className="background-overlay"></div>

            {/* 네비게이션 */}
            <header className="detail-header">
                <nav aria-label="브레드크럼" className="breadcrumb">
                    <Link href="/">홈</Link>
                    <span className="breadcrumb-sep">›</span>
                    <span>{typeLabel}</span>
                    <span className="breadcrumb-sep">›</span>
                    <span className="breadcrumb-current">{dream.title}</span>
                </nav>
            </header>

            <main className="detail-main">
                <article className="dream-detail-article">
                    {/* 꿈 유형 배지 */}
                    <span className={`dream-type type-${dream.type}`}>
                        {typeEmoji} {typeLabel}
                    </span>

                    {/* 제목 (H1) */}
                    <h1 className="dream-detail-title">{dream.title} 해몽</h1>

                    {/* 인트로 섹션 */}
                    <section className="intro-section rich-text">
                        <p>
                            많은 분들이{' '}
                            <strong className="text-highlight">
                                {keyword}
                            </strong>{' '}
                            꿈을 꾸고 그 의미를 궁금해합니다. 이 꿈은{' '}
                            <strong className="text-highlight">
                                {typeLabel}
                            </strong>
                            으로 분류되며, 구체적인 해몽과 행운의 숫자를 아래에서
                            확인해 보세요.
                        </p>
                    </section>

                    {/* 이미지 */}
                    <div className="modal-image-container">
                        <img
                            src={`/cat_${dream.type}.png`}
                            alt={`${dream.title} - ${typeLabel} 꿈해몽 이미지`}
                            className="modal-cat-image"
                            width={700}
                            height={250}
                        />
                    </div>

                    {/* 요약 */}
                    <section className="dream-summary-section">
                        <h2>🔮 꿈 요약</h2>
                        <p className="rich-text">{dream.summary}</p>
                    </section>

                    {/* 상세 해몽 */}
                    <section className="dream-detail-section">
                        <h2>📖 상세 해몽</h2>
                        <p className="rich-text">{dream.detail}</p>
                    </section>

                    {/* 행동 팁 */}
                    <section className="action-tip-box">
                        <h2>💡 행동 팁</h2>
                        <p>{dream.action_tip}</p>
                    </section>

                    {/* 행운의 번호 */}
                    <section className="lucky-numbers-section">
                        <h2>🎰 행운의 로또 번호</h2>
                        <div className="lucky-numbers">
                            {dream.lucky_numbers.map((num) => (
                                <span key={num} className="number-circle large">
                                    {num}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* FAQ 섹션 */}
                    <section className="faq-section" aria-label="자주 묻는 질문">
                        <h2>❓ 자주 묻는 질문</h2>
                        <div className="faq-list">
                            <details className="faq-detail">
                                <summary>
                                    {dream.title}은 무슨 뜻인가요?
                                </summary>
                                <p>{dream.summary}</p>
                            </details>
                            <details className="faq-detail">
                                <summary>
                                    {dream.title}의 행운의 숫자는?
                                </summary>
                                <p>
                                    이 꿈의 행운의 로또 번호는{' '}
                                    {dream.lucky_numbers.join(', ')}입니다.
                                    재미로 참고해 보세요!
                                </p>
                            </details>
                            <details className="faq-detail">
                                <summary>꿈해몽은 과학적인가요?</summary>
                                <p>
                                    꿈해몽은 심리학적 상징과 전통적인 민속 신앙이
                                    결합된 해석입니다. 과학적 증명보다는 심리적
                                    위안과 재미로 접근하는 것이 좋습니다.
                                </p>
                            </details>
                            <details className="faq-detail">
                                <summary>
                                    흉몽을 꾸면 어떻게 해야 하나요?
                                </summary>
                                <p>
                                    흉몽은 오히려 액땜이 될 수 있습니다. 너무
                                    걱정하지 말고 평소보다 말과 행동을 조심하며
                                    차분하게 하루를 보내세요.
                                </p>
                            </details>
                        </div>
                    </section>

                    {/* 꿈해몽 활용법 (고정 콘텐츠) */}
                    <section className="static-content-box rich-text">
                        <h2>💡 꿈해몽 더 잘 활용하는 법</h2>
                        <p>
                            꿈은 무의식의 반영입니다. 단순히 길몽과 흉몽을
                            나누기보다, 꿈이 전하는 심리적 메시지에 귀 기울여
                            보세요. 특히{' '}
                            <strong>
                                오전에는 꿈 이야기를 하지 않는 것
                            </strong>
                            이 좋습니다.
                        </p>
                        <p>
                            로또 번호는 재미로만 즐기세요. 맹신하기보다 긍정적인
                            에너지로 하루를 시작하는 도구로 활용하는 것이
                            현명합니다.
                        </p>
                    </section>
                </article>

                {/* 관련 꿈 추천 */}
                <aside className="related-dreams-section">
                    <h2>🌙 다른 꿈해몽도 확인해 보세요</h2>
                    <nav aria-label="관련 꿈 목록" className="related-dreams-grid">
                        {suggestedDreams.map((d) => (
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

                {/* CTA: 메인으로 */}
                <div className="cta-section">
                    <Link href="/" className="cta-btn">
                        🔮 더 많은 꿈해몽 보러가기
                    </Link>
                </div>
            </main>

            <footer>
                <p>&copy; 2026 Dream645 신비의 기록. All rights reserved.</p>
            </footer>
        </>
    )
}
