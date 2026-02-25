'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

interface ShareButtonsProps {
    title: string
    description: string
    url: string
    imageUrl: string
    type: 'good' | 'bad' | 'baby'
    luckyNumbers: number[]
}

const TYPE_SHARE_TEXT: Record<string, string> = {
    good: '🍀 친구에게 행운 나눠주기',
    bad: '🧿 친구에게 공유해서 액땜하기',
    baby: '👶 예쁜 태몽 공유하기',
}

declare global {
    interface Window {
        Kakao?: {
            init: (key: string) => void
            isInitialized: () => boolean
            Share: {
                sendDefault: (options: Record<string, unknown>) => void
            }
        }
    }
}

export default function ShareButtons({
    title,
    description,
    url,
    imageUrl,
    type,
    luckyNumbers,
}: ShareButtonsProps) {
    const [copied, setCopied] = useState(false)
    const [kakaoReady, setKakaoReady] = useState(false)

    useEffect(() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init('40fefcc33108df9ac665a849c1f77ced')
            setKakaoReady(true)
        }
    }, [])

    function handleKakaoShare() {
        if (!window.Kakao) return

        if (!window.Kakao.isInitialized()) {
            window.Kakao.init('40fefcc33108df9ac665a849c1f77ced')
        }

        window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: title,
                description: description,
                imageUrl: imageUrl,
                link: {
                    mobileWebUrl: url,
                    webUrl: url,
                },
            },
            buttons: [
                {
                    title: '꿈해몽 보기',
                    link: {
                        mobileWebUrl: url,
                        webUrl: url,
                    },
                },
            ],
        })
    }

    async function handleNativeShare() {
        const shareData = {
            title: `신비의 기록 - ${title}`,
            text: `${title}\n\n${description}\n\n행운의 번호: ${luckyNumbers.join(', ')}`,
            url: url,
        }

        try {
            if (navigator.share) {
                await navigator.share(shareData)
            } else {
                await handleCopyLink()
            }
        } catch {
            // User cancelled share
        }
    }

    async function handleCopyLink() {
        try {
            await navigator.clipboard.writeText(
                `${title}\n${description}\n행운의 번호: ${luckyNumbers.join(', ')}\n${url}`
            )
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            // Clipboard failed
        }
    }

    return (
        <>
            <Script
                src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
                integrity="sha384-DKYJZ8NLiK8MN4/C5P2ezmFnkrWAhl/gb6LiQSbFG8bk38C9+kBfDCX3K3fVEJl"
                crossOrigin="anonymous"
                strategy="lazyOnload"
                onLoad={() => {
                    if (window.Kakao && !window.Kakao.isInitialized()) {
                        window.Kakao.init('40fefcc33108df9ac665a849c1f77ced')
                        setKakaoReady(true)
                    }
                }}
            />
            <div className="share-buttons">
                <button
                    className="share-btn share-btn-kakao"
                    onClick={handleKakaoShare}
                    aria-label="카카오톡으로 공유"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 3C6.5 3 2 6.58 2 11c0 2.83 1.87 5.32 4.69 6.72-.14.53-.52 1.94-.6 2.24-.09.37.14.37.29.27.12-.08 1.9-1.29 2.66-1.81.62.09 1.27.14 1.96.14 5.5 0 10-3.58 10-8S17.5 3 12 3z" />
                    </svg>
                    카카오톡 공유
                </button>

                <button
                    className="share-btn share-btn-native"
                    onClick={handleNativeShare}
                    aria-label="공유하기"
                >
                    {TYPE_SHARE_TEXT[type]}
                </button>

                <button
                    className="share-btn share-btn-copy"
                    onClick={handleCopyLink}
                    aria-label="링크 복사"
                >
                    {copied ? '✅ 복사됨!' : '🔗 링크 복사'}
                </button>
            </div>
        </>
    )
}
