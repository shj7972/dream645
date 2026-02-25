'use client'

import { useEffect, useState, useCallback } from 'react'
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

const KAKAO_APP_KEY = '40fefcc33108df9ac665a849c1f77ced'

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

    const initKakao = useCallback(() => {
        try {
            if (window.Kakao) {
                if (!window.Kakao.isInitialized()) {
                    window.Kakao.init(KAKAO_APP_KEY)
                }
                setKakaoReady(true)
            }
        } catch (e) {
            console.error('Kakao SDK init error:', e)
        }
    }, [])

    useEffect(() => {
        // SDK가 이미 로드되어 있는 경우 (다른 페이지에서 이미 로드됨)
        if (window.Kakao) {
            initKakao()
        }
    }, [initKakao])

    function handleKakaoShare() {
        if (!window.Kakao) {
            // SDK가 아직 로드되지 않은 경우 - 대체 동작으로 링크 복사
            alert('카카오톡 SDK를 로딩 중입니다. 잠시 후 다시 시도해 주세요.')
            return
        }

        if (!window.Kakao.isInitialized()) {
            try {
                window.Kakao.init(KAKAO_APP_KEY)
            } catch (e) {
                console.error('Kakao init error:', e)
                alert('카카오톡 연결에 실패했습니다. 링크 복사를 이용해 주세요.')
                return
            }
        }

        try {
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
        } catch (e) {
            console.error('Kakao Share error:', e)
            alert('카카오톡 공유에 실패했습니다. 링크 복사를 이용해 주세요.')
        }
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
            // Clipboard failed - fallback
            const textArea = document.createElement('textarea')
            textArea.value = `${title}\n${description}\n행운의 번호: ${luckyNumbers.join(', ')}\n${url}`
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <>
            <Script
                src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.9/kakao.min.js"
                strategy="afterInteractive"
                onLoad={initKakao}
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
