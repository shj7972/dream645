import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: '개인정보처리방침 | Dream645',
    description:
        'Dream645 신비의 기록 개인정보처리방침입니다. 수집하는 개인정보의 항목, 이용 목적, 보유 기간 등을 안내합니다.',
    alternates: {
        canonical: 'https://www.dream645.kr/privacy',
    },
    openGraph: {
        title: '개인정보처리방침 | Dream645',
        description: 'Dream645 신비의 기록 개인정보처리방침',
        url: 'https://www.dream645.kr/privacy',
        siteName: 'Dream645',
        locale: 'ko_KR',
        type: 'website',
    },
}

export default function PrivacyPage() {
    return (
        <>
            <div className="background-overlay"></div>

            <header className="detail-header">
                <nav aria-label="브레드크럼" className="breadcrumb">
                    <Link href="/">홈</Link>
                    <span className="breadcrumb-sep">›</span>
                    <span className="breadcrumb-current">개인정보처리방침</span>
                </nav>
            </header>

            <main className="detail-main">
                <article className="dream-detail-article">
                    <h1 className="dream-detail-title">개인정보처리방침</h1>

                    <section className="rich-text" style={{ marginBottom: '2rem' }}>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            시행일: 2026년 2월 1일 · 최종 수정일: 2026년 3월 1일
                        </p>
                        <p>
                            Dream645 신비의 기록(이하 &quot;서비스&quot;)은 이용자의 개인정보를
                            소중히 여기며, 「개인정보 보호법」 및 관련 법령을 준수합니다.
                            본 방침은 서비스 이용 과정에서 수집되는 개인정보의 처리에 관한
                            사항을 안내합니다.
                        </p>
                    </section>

                    <section className="rich-text" style={{ marginBottom: '2rem' }}>
                        <h2>1. 수집하는 개인정보 항목</h2>
                        <p>Dream645는 아래와 같은 정보를 자동으로 수집할 수 있습니다.</p>
                        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                            <li>접속 IP 주소, 접속 일시, 브라우저 종류 및 운영체제</li>
                            <li>방문한 페이지 URL, 이전 방문 사이트(리퍼러)</li>
                            <li>서비스 이용 패턴(Google Analytics를 통한 집계 통계)</li>
                            <li>즐겨찾기(로컬 스토리지에 저장, 서버에 전송되지 않음)</li>
                        </ul>
                        <p style={{ marginTop: '0.75rem' }}>
                            별도의 회원가입이 없으며, 이름·이메일·전화번호 등 직접
                            식별 가능한 개인정보는 수집하지 않습니다.
                        </p>
                    </section>

                    <section className="rich-text" style={{ marginBottom: '2rem' }}>
                        <h2>2. 개인정보 수집 및 이용 목적</h2>
                        <ul style={{ paddingLeft: '1.5rem' }}>
                            <li>서비스 품질 개선 및 통계 분석</li>
                            <li>부정 이용 방지 및 보안 유지</li>
                            <li>광고 서비스 제공(Google AdSense)</li>
                        </ul>
                    </section>

                    <section className="rich-text" style={{ marginBottom: '2rem' }}>
                        <h2>3. 개인정보 보유 및 이용 기간</h2>
                        <p>
                            수집된 정보는 서비스 제공 목적이 달성되면 즉시 파기하며,
                            관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.
                        </p>
                        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                            <li>Google Analytics 데이터: 기본 26개월(Google 정책 준수)</li>
                            <li>서비스 접속 로그: 3개월</li>
                        </ul>
                    </section>

                    <section className="rich-text" style={{ marginBottom: '2rem' }}>
                        <h2>4. 쿠키(Cookie) 및 유사 기술</h2>
                        <p>
                            Dream645는 서비스 분석 및 광고 게재를 위해 쿠키를 사용합니다.
                        </p>
                        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                            <li>
                                <strong>Google Analytics</strong>: 방문자 통계 수집.
                                <a
                                    href="https://policies.google.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'var(--accent-color)', marginLeft: '0.25rem' }}
                                >
                                    Google 개인정보처리방침
                                </a>
                            </li>
                            <li>
                                <strong>Google AdSense</strong>: 맞춤 광고 제공.
                                이용자는 브라우저 설정에서 쿠키를 거부할 수 있으나,
                                일부 서비스 기능이 제한될 수 있습니다.
                            </li>
                        </ul>
                        <p style={{ marginTop: '0.75rem' }}>
                            브라우저 설정에서 쿠키를 비활성화하거나,
                            <a
                                href="https://adssettings.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'var(--accent-color)', margin: '0 0.25rem' }}
                            >
                                Google 광고 설정
                            </a>
                            에서 맞춤 광고를 거부할 수 있습니다.
                        </p>
                    </section>

                    <section className="rich-text" style={{ marginBottom: '2rem' }}>
                        <h2>5. 개인정보의 제3자 제공</h2>
                        <p>
                            Dream645는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.
                            단, Google Analytics 및 Google AdSense 서비스 운영을 위해
                            Google LLC에 집계 데이터가 전달될 수 있습니다.
                        </p>
                    </section>

                    <section className="rich-text" style={{ marginBottom: '2rem' }}>
                        <h2>6. 이용자 권리</h2>
                        <p>이용자는 언제든지 아래의 권리를 행사할 수 있습니다.</p>
                        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                            <li>개인정보 처리 현황 열람 요청</li>
                            <li>개인정보 삭제 요청</li>
                            <li>개인정보 처리 정지 요청</li>
                        </ul>
                        <p style={{ marginTop: '0.75rem' }}>
                            권리 행사는 하단의 연락처로 문의해 주시면 10영업일 이내에 답변 드립니다.
                        </p>
                    </section>

                    <section className="rich-text" style={{ marginBottom: '2rem' }}>
                        <h2>7. 개인정보 보호책임자 및 연락처</h2>
                        <p>개인정보 관련 문의 및 권리 행사:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                            <li>서비스명: Dream645 신비의 기록</li>
                            <li>
                                문의:{' '}
                                <Link href="/contact" style={{ color: 'var(--accent-color)' }}>
                                    문의 페이지 바로가기
                                </Link>
                            </li>
                            <li>처리 기간: 접수 후 10영업일 이내</li>
                        </ul>
                    </section>

                    <section className="rich-text" style={{ marginBottom: '2rem' }}>
                        <h2>8. 방침 변경 고지</h2>
                        <p>
                            본 개인정보처리방침이 변경될 경우, 변경 사항을 서비스 내
                            공지사항 또는 해당 페이지를 통해 사전에 안내합니다.
                        </p>
                    </section>
                </article>

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
