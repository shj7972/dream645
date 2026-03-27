'use client'

import { useState } from 'react'

interface BlogShareButtonsProps {
    title: string
    description: string
    url: string
}

export default function BlogShareButtons({
    title,
    description,
    url,
}: BlogShareButtonsProps) {
    const [copied, setCopied] = useState(false)

    function handleKakaoShare() {
        // Kakao SDK 없이 카카오톡 공유 링크 방식 사용
        const encodedUrl = encodeURIComponent(url)
        window.open(
            `https://story.kakao.com/share?url=${encodedUrl}`,
            '_blank',
            'noopener,noreferrer,width=600,height=400'
        )
    }

    function handleNaverShare() {
        const encodedUrl = encodeURIComponent(url)
        const encodedTitle = encodeURIComponent(title)
        window.open(
            `https://share.naver.com/web/shareView?url=${encodedUrl}&title=${encodedTitle}`,
            '_blank',
            'noopener,noreferrer,width=600,height=400'
        )
    }

    function handleXShare() {
        const text = encodeURIComponent(`${title}\n${description}`)
        const encodedUrl = encodeURIComponent(url)
        window.open(
            `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`,
            '_blank',
            'noopener,noreferrer'
        )
    }

    async function handleNativeShare() {
        const shareData = { title, text: description, url }
        try {
            if (navigator.share) {
                await navigator.share(shareData)
            } else {
                await handleCopyLink()
            }
        } catch {
            // 사용자 취소
        }
    }

    async function handleCopyLink() {
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            // 조용히 무시
        }
    }

    return (
        <div className="blog-share-section">
            <p className="blog-share-label">이 글이 도움이 됐다면 공유해 주세요</p>
            <div className="share-buttons">
                <button
                    className="share-btn share-btn-kakao"
                    onClick={handleKakaoShare}
                    aria-label="카카오스토리에 공유"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3C6.5 3 2 6.58 2 11c0 2.83 1.87 5.32 4.69 6.72-.14.53-.52 1.94-.6 2.24-.09.37.14.37.29.27.12-.08 1.9-1.29 2.66-1.81.62.09 1.27.14 1.96.14 5.5 0 10-3.58 10-8S17.5 3 12 3z" />
                    </svg>
                    카카오
                </button>

                <button
                    className="share-btn share-btn-naver"
                    onClick={handleNaverShare}
                    aria-label="네이버에 공유"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.5 12.6L8.3 4H4v16h6.5V11.4L15.7 20H20V4h-6.5z" />
                    </svg>
                    네이버
                </button>

                <button
                    className="share-btn share-btn-x"
                    onClick={handleXShare}
                    aria-label="X(트위터)에 공유"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    X
                </button>

                <button
                    className="share-btn share-btn-native"
                    onClick={handleNativeShare}
                    aria-label="공유하기"
                >
                    📤 더 공유하기
                </button>

                <button
                    className="share-btn share-btn-copy"
                    onClick={handleCopyLink}
                    aria-label="링크 복사"
                >
                    {copied ? '✅ 복사됨!' : '🔗 링크 복사'}
                </button>
            </div>
        </div>
    )
}
