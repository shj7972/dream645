'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'

export default function NewsletterForm() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMsg, setErrorMsg] = useState('')

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        setStatus('loading')
        setErrorMsg('')

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            const data: { error?: string } = await res.json().catch(() => ({}))

            if (!res.ok) {
                setErrorMsg(data.error ?? '오류가 발생했습니다.')
                setStatus('error')
                return
            }

            trackEvent('newsletter_subscribe')
            setStatus('success')
            setEmail('')
        } catch {
            setErrorMsg('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
            setStatus('error')
        }
    }

    if (status === 'success') {
        return (
            <div className="newsletter-success">
                <span>✅</span>
                <p>구독 신청이 완료되었습니다! 새로운 꿈해몽 콘텐츠를 보내드릴게요.</p>
            </div>
        )
    }

    return (
        <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
                type="email"
                className="newsletter-input"
                placeholder="이메일 주소 입력"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
                aria-label="뉴스레터 구독 이메일"
            />
            <button
                type="submit"
                className="newsletter-btn"
                disabled={status === 'loading'}
            >
                {status === 'loading' ? '처리 중...' : '무료 구독'}
            </button>
            {status === 'error' && (
                <p className="newsletter-error">{errorMsg}</p>
            )}
        </form>
    )
}
