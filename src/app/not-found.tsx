import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '페이지를 찾을 수 없습니다',
    description: '요청하신 페이지를 찾을 수 없습니다. Dream645에서 꿈해몽을 검색해 보세요.',
}

export default function NotFound() {
    return (
        <>
            <div className="background-overlay"></div>

            <main className="not-found-main">
                <div className="not-found-content">
                    <div className="not-found-emoji">🌙</div>
                    <h1 className="not-found-title">꿈에서 길을 잃으셨나요?</h1>
                    <p className="not-found-description">
                        요청하신 페이지를 찾을 수 없습니다.
                        <br />
                        하지만 걱정 마세요, 새로운 꿈을 찾아 떠나볼까요?
                    </p>

                    <div className="not-found-actions">
                        <Link href="/" className="cta-btn">
                            🔮 홈으로 돌아가기
                        </Link>
                        <div className="not-found-links">
                            <Link href="/category/good">🍀 길몽 보기</Link>
                            <Link href="/category/bad">🧿 흉몽 보기</Link>
                            <Link href="/category/baby">👶 태몽 보기</Link>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <p>&copy; 2026 Dream645 신비의 기록. All rights reserved.</p>
            </footer>
        </>
    )
}
