import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: '문의하기 | Dream645',
    description:
        'Dream645 신비의 기록에 문의하세요. 콘텐츠 오류 제보, 서비스 개선 의견, 광고 문의를 환영합니다.',
    alternates: {
        canonical: 'https://www.dream645.kr/contact',
    },
    openGraph: {
        title: '문의하기 | Dream645',
        description: 'Dream645에 문의하세요.',
        url: 'https://www.dream645.kr/contact',
        siteName: 'Dream645',
        locale: 'ko_KR',
        type: 'website',
    },
}

export default function ContactPage() {
    return (
        <>
            <div className="background-overlay"></div>

            <header className="detail-header">
                <nav aria-label="브레드크럼" className="breadcrumb">
                    <Link href="/">홈</Link>
                    <span className="breadcrumb-sep">›</span>
                    <span className="breadcrumb-current">문의하기</span>
                </nav>
            </header>

            <main className="detail-main">
                <article className="dream-detail-article">
                    <h1 className="dream-detail-title">문의하기</h1>

                    <section className="rich-text" style={{ marginBottom: '2rem' }}>
                        <p>
                            Dream645 신비의 기록을 이용해 주셔서 감사합니다.
                            서비스 관련 문의 사항이 있으시면 아래 이메일로
                            연락해 주세요. 접수 후 <strong>10영업일 이내</strong>에
                            답변 드리겠습니다.
                        </p>
                    </section>

                    <section className="action-tip-box" style={{ marginBottom: '2rem' }}>
                        <h2>📧 이메일 문의</h2>
                        <p style={{ marginBottom: '0.5rem' }}>
                            <a
                                href="mailto:contact@dream645.kr"
                                style={{
                                    color: 'var(--accent-color)',
                                    fontSize: '1.1rem',
                                    fontWeight: '700',
                                }}
                            >
                                contact@dream645.kr
                            </a>
                        </p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            답변 기간: 영업일 기준 10일 이내
                        </p>
                    </section>

                    <section className="rich-text" style={{ marginBottom: '2rem' }}>
                        <h2>문의 유형</h2>
                        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                            <li>
                                <strong>콘텐츠 오류 제보</strong> — 꿈해몽 내용 중 잘못된
                                해석이나 오탈자를 발견하셨다면 알려주세요.
                            </li>
                            <li>
                                <strong>서비스 개선 의견</strong> — 기능 개선 아이디어나
                                불편한 점을 공유해 주세요.
                            </li>
                            <li>
                                <strong>개인정보 관련 문의</strong> — 개인정보 처리에 관한
                                열람·삭제·정지 요청을 처리해 드립니다.
                            </li>
                            <li>
                                <strong>광고·제휴 문의</strong> — 광고 또는 콘텐츠 제휴를
                                원하시면 이메일로 연락해 주세요.
                            </li>
                        </ul>
                    </section>

                    <section className="rich-text" style={{ marginBottom: '2rem' }}>
                        <h2>자주 묻는 질문</h2>
                        <div className="faq-list">
                            <details className="faq-detail">
                                <summary>꿈해몽 데이터 출처가 어디인가요?</summary>
                                <p>
                                    한국 전통 해몽 문화 및 민속 자료, 심리학 연구(프로이트·융)를
                                    바탕으로 작성된 콘텐츠입니다. 오락·심리적 성찰 목적으로만
                                    이용하시기를 권장합니다.
                                </p>
                            </details>
                            <details className="faq-detail">
                                <summary>로또 번호가 정말 당첨되나요?</summary>
                                <p>
                                    로또 번호는 재미를 위한 참고 정보일 뿐, 당첨을 보장하지
                                    않습니다. 로또는 순수한 확률 게임입니다.
                                </p>
                            </details>
                            <details className="faq-detail">
                                <summary>개인정보는 어떻게 처리되나요?</summary>
                                <p>
                                    별도의 회원가입이 없으며, 직접 식별 가능한 개인정보를
                                    수집하지 않습니다. 자세한 내용은{' '}
                                    <Link href="/privacy" style={{ color: 'var(--accent-color)' }}>
                                        개인정보처리방침
                                    </Link>
                                    을 확인해 주세요.
                                </p>
                            </details>
                        </div>
                    </section>
                </article>

                <div className="cta-section">
                    <Link href="/" className="cta-btn">
                        🔮 꿈해몽 보러가기
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
