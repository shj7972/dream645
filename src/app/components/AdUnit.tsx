'use client'

import { useEffect } from 'react'

/**
 * 애드센스 디스플레이 광고 단위 (dream645 전용)
 * usage: <AdUnit slot="XXXXXXXXXX" format="horizontal" />
 * layout.tsx에서 adsbygoogle.js가 lazyOnload로 로드됨.
 * push()는 광고 컨테이너가 화면에 그려진 후 1회 실행 (중복 push 방지).
 */
declare global {
    interface Window {
        adsbygoogle?: unknown[]
    }
}

export default function AdUnit({
    slot,
    format = 'auto',
    minHeight = 100,
    style,
}: {
    slot: string
    format?: string
    minHeight?: number
    style?: React.CSSProperties
}) {
    useEffect(() => {
        try {
            // 스크립트 lazyOnload라 늦게 도착할 수 있음 — 준비되면 push, 아니면 짧게 재시도
            let tries = 0
            const timer = setInterval(() => {
                tries += 1
                if (window.adsbygoogle) {
                    window.adsbygoogle.push({})
                    clearInterval(timer)
                } else if (tries > 40) {
                    clearInterval(timer) // 20초 초과 시 포기 (스크립트 차단 환경)
                }
            }, 500)
            return () => clearInterval(timer)
        } catch {
            // 광고 차단 등 환경에서는 조용히 무시
        }
    }, [])

    return (
        <div style={{ margin: '1.2rem auto', textAlign: 'center', ...style }}>
            <ins
                className="adsbygoogle"
                style={{
                    display: 'block',
                    minHeight,
                    maxWidth: '100%',
                    overflow: 'hidden',
                }}
                data-ad-client="ca-pub-2947913248390883"
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive="true"
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
                }}
            />
        </div>
    )
}