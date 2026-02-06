import Script from 'next/script'

export default function Home() {
    return (
        <>
            <div className="background-overlay"></div>

            <header>
                <div className="logo">
                    <img src="/logo.svg" alt="Dream645 Logo" className="logo-image" />
                    <div className="logo-text">
                        <h1>신비의 기록</h1>
                        <p>당신의 꿈에 담긴 비밀을 풀어보세요</p>
                    </div>
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        id="search-input"
                        placeholder="어떤 꿈을 꾸셨나요? 예: 돼지, 용, 이내..."
                        autoComplete="off"
                    />
                    <div className="filter-buttons">
                        <button className="filter-btn active" data-type="all">
                            전체
                        </button>
                        <button className="filter-btn" data-type="good">
                            길몽
                        </button>
                        <button className="filter-btn" data-type="bad">
                            흉몽
                        </button>
                        <button className="filter-btn" data-type="baby">
                            태몽
                        </button>
                        <button className="filter-btn" data-type="fav">
                            ⭐ 즐겨찾기
                        </button>
                    </div>
                </div>
            </header>

            <main>
                <div id="dream-grid" className="dream-grid">
                    {/* Dreams will be injected here by script.js */}
                    <div className="loading-spinner">신비로운 기운을 불러오는 중...</div>
                </div>
            </main>

            {/* Modal for details */}
            <div id="dream-modal" className="modal">
                <div className="modal-content glass">
                    <span className="close-btn">&times;</span>
                    <div id="modal-body"></div>
                    <div className="modal-footer">
                        <button id="modal-fav-btn" className="action-btn">
                            ⭐ 저장하기
                        </button>
                        <button id="modal-share-btn" className="action-btn">
                            🔗 공유하기
                        </button>
                    </div>
                </div>
            </div>

            <footer>
                <p>&copy; 2026 신비의 기록. All rights reserved.</p>
            </footer>

            <Script src="/script.js" strategy="afterInteractive" />
            <Script id="sw-register" strategy="afterInteractive">
                {`
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/service-worker.js');
            });
          }
        `}
            </Script>
        </>
    )
}
