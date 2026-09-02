import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: '서비스 소개',
    description:
        'Dream645 신비의 기록은 한국 전통 꿈해몽 문화와 심리학적 해석을 결합한 무료 꿈 해석 서비스입니다. 1,200개 이상의 꿈 데이터베이스를 보유합니다.',
    alternates: {
        canonical: 'https://www.dream645.kr/about',
    },
    openGraph: {
        title: '서비스 소개',
        description: 'Dream645 신비의 기록 서비스 소개',
        url: 'https://www.dream645.kr/about',
        siteName: 'Dream645',
        locale: 'ko_KR',
        type: 'website',
    },
}

export default function AboutPage() {
    return (
        <>
            <div className="background-overlay"></div>

            <header className="detail-header">
                <nav aria-label="브레드크럼" className="breadcrumb">
                    <Link href="/">홈</Link>
                    <span className="breadcrumb-sep">›</span>
                    <span className="breadcrumb-current">서비스 소개</span>
                </nav>
            </header>

            <main className="detail-main">
                <article className="dream-detail-article">
                    <h1 className="dream-detail-title">Dream645 신비의 기록</h1>

                    <section className="rich-text" style={{ marginBottom: '2rem' }}>
                        <p>
                            Dream645 신비의 기록은 한국의 전통 꿈해몽 문화를
                            디지털로 계승하고, 현대 심리학적 시각을 더해
                            꿈의 의미를 쉽고 친근하게 풀어드리는 무료 서비스입니다.
                        </p>
                    </section>

                    <section className="rich-text" style={{ marginBottom: '2rem' }}>
                        <h2>서비스 특징</h2>
                        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                            <li>
                                <strong>1,213개의 꿈해몽 데이터베이스</strong> — 길몽·흉몽·태몽을
                                세분화하여 각 꿈의 전통적 의미와 심리학적 해석을 제공합니다.
                            </li>
                            <li>
                                <strong>전통 민속 + 현대 심리학</strong> — 수백 년간 이어온
                                한국 꿈해몽 전통을 프로이트·융의 심리학 이론과 함께 풀어냅니다.
                            </li>
                            <li>
                                <strong>행운의 로또 번호</strong> — 꿈과 연관된 행운의 숫자를
                                재미로 참고할 수 있습니다. 당연히 당첨을 보장하지 않으며,
                                오락 목적으로만 제공됩니다.
                            </li>
                            <li>
                                <strong>완전 무료</strong> — 회원가입 없이 모든 콘텐츠를
                                자유롭게 이용할 수 있습니다.
                            </li>
                        </ul>
                    </section>

                    <section className="rich-text" style={{ marginBottom: '2rem' }}>
                        <h2>콘텐츠 기준</h2>
                        <p>
                            Dream645의 꿈해몽 콘텐츠는 다음 기준으로 작성됩니다.
                        </p>
                        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                            <li>
                                <strong>문화적 전통</strong>: 한국을 비롯한 동아시아의
                                전통 해몽서와 민속 자료를 참고합니다.
                            </li>
                            <li>
                                <strong>심리학적 해석</strong>: 프로이트의 무의식 이론,
                                융의 원형 상징, 현대 인지심리학 연구를 반영합니다.
                            </li>
                            <li>
                                <strong>균형 잡힌 시각</strong>: 미신적 맹신을 지양하고,
                                꿈해몽을 심리적 성찰과 재미의 도구로 안내합니다.
                            </li>
                        </ul>
                        <p style={{ marginTop: '0.75rem' }}>
                            꿈해몽과 행운의 번호는 오락·심리적 위안 목적으로만 제공되며,
                            실제 의사결정의 근거로 사용하지 않도록 안내합니다.
                        </p>
                    </section>

                    <section className="rich-text" style={{ marginBottom: '2rem' }}>
                        <h2>Dream645를 만드는 이유</h2>
                        <p>
                            한국인에게 꿈은 단순한 수면 현상이 아닙니다. 새벽에 꾼 꿈이
                            하루의 기운을 좌우한다고 여기며, 소중한 사람의 태몽을 해석하고
                            가족과 나누는 문화가 오랫동안 이어져 왔습니다.
                        </p>
                        <p style={{ marginTop: '0.75rem' }}>
                            Dream645는 이러한 문화적 전통을 온라인에서 쉽게 찾아볼 수 있도록
                            정리하고, 과학적 맥락을 더해 더욱 깊이 있게 이해할 수 있도록
                            돕는 것을 목표로 합니다.
                        </p>
                    </section>

                    <section className="rich-text" style={{ marginBottom: '2rem' }}>
                        <h2>콘텐츠 작성 및 감수</h2>
                        <p>
                            Dream645의 모든 꿈해몽 콘텐츠는 동일한 작성 및 감수 프로세스를 거칩니다.
                            각 꿈 항목은 전통 해몽서의 원전 내용을 1차 자료로 삼고,
                            프로이트·융·인지심리학의 학술 자료를 2차 해석 근거로 활용하여
                            작성됩니다. 작성된 초안은 내부 검수를 거쳐 팩트 오류,
                            과도한 미신적 표현, 의학적 오해 가능성을 점검한 뒤 게시합니다.
                        </p>
                        <p style={{ marginTop: '0.75rem' }}>
                            꿈해몽 콘텐츠는 전통 문화 자료와 심리학 연구를 기반으로 하지만,
                            의학적 진단이나 심리 치료를 목적으로 하지 않습니다.
                            지속적인 불면, 악몽, 수면 관련 문제가 있는 경우
                            의사나 수면 전문가의 진료를 받으시기를 권합니다.
                        </p>
                    </section>

                    <section className="rich-text" style={{ marginBottom: '2rem' }}>
                        <h2>참고 자료 및 출처 투명화</h2>
                        <p>
                            Dream645 콘텐츠의 작성 근거가 되는 자료 유형은 다음과 같습니다.
                        </p>
                        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                            <li>
                                <strong>동아시아 전통 해몽서</strong>:
                                조선시대 해몽 관련 문헌, 중국 고대 해몽서,
                                일본 민간 해몽 자료 등 역사적 출전을 참고합니다.
                            </li>
                            <li>
                                <strong>심리학 저작</strong>:
                                프로이트「꿈의 해석」, 융「인간과 상징」,
                                현대 인지행동치료 및 수면 심리학 관련 논문과 저술을 반영합니다.
                            </li>
                            <li>
                                <strong>민속 문화 자료</strong>:
                                한국 구비문학, 민담, 풍속 기록 중
                                꿈과 관련된 자료를 수집하여 참고합니다.
                            </li>
                            <li>
                                <strong>수면 과학 연구</strong>:
                                REM 수면, 꿈 회상, 반복 꿈 관련
                                학술 연구 결과를 해석에 반영합니다.
                            </li>
                        </ul>
                        <p style={{ marginTop: '0.75rem' }}>
                            개별 꿈 항목의 해석은 복수의 자료를 교차 검토하여 작성되며,
                            전통적 해석과 심리학적 해석을 명확히 구분하여 제시합니다.
                        </p>
                    </section>

                    <section className="rich-text" style={{ marginBottom: '2rem' }}>
                        <h2>면책 고지</h2>
                        <p>
                            Dream645의 꿈해몽 콘텐츠는 한국 전통 문화와 심리학적 해석을
                            결합한 참고 자료로 제공됩니다. 본 콘텐츠는 의학적 진단,
                            심리 치료적 조언, 또는 전문가 상담을 대체하지 않습니다.
                            꿈해몽은 문화적 전통과 심리적 성찰의 도구로 이해하시고,
                            건강·정신 건강 관련 문제가 지속되는 경우 반드시
                            의사나 전문가의 진료를 받으시기 바랍니다.
                        </p>
                    </section>

                    <section className="rich-text" style={{ marginBottom: '2rem' }}>
                        <h2>연락처</h2>
                        <p>
                            서비스 관련 문의, 콘텐츠 오류 제보, 광고 문의는 문의 페이지를 이용해 주세요.
                        </p>
                        <p style={{ marginTop: '0.75rem' }}>
                            <Link href="/contact" style={{ color: 'var(--accent-color)' }}>
                                문의 페이지 바로가기 →
                            </Link>
                        </p>
                    </section>

                    <section className="rich-text" style={{ marginBottom: '2rem' }}>
                        <p style={{ fontSize: '0.875rem', color: '#888' }}>
                            최종 업데이트: 2026-09-02
                        </p>
                    </section>
                </article>

                <div className="cta-section">
                    <Link href="/" className="cta-btn">
                        🔮 꿈해몽 시작하기
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
