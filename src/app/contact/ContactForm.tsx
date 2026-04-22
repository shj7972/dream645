'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
    const [formState, setFormState] = useState<FormState>('idle')
    const [errorMsg, setErrorMsg] = useState('')
    const [form, setForm] = useState({
        name: '',
        email: '',
        type: 'other',
        message: '',
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormState('loading')
        setErrorMsg('')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            let data: { error?: string; success?: boolean } = {}
            try {
                data = await res.json()
            } catch {
                // JSON 파싱 실패 = 서버 에러
            }

            if (!res.ok) {
                setErrorMsg(data.error ?? `서버 오류가 발생했습니다. (${res.status})`)
                setFormState('error')
                return
            }

            trackEvent('contact_submit', { inquiry_type: form.type })
            setFormState('success')
            setForm({ name: '', email: '', type: 'other', message: '' })
        } catch {
            setErrorMsg('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
            setFormState('error')
        }
    }

    if (formState === 'success') {
        return (
            <div className="contact-success-box">
                <p className="contact-success-icon">✅</p>
                <h3>문의가 접수되었습니다</h3>
                <p>10영업일 이내에 입력하신 이메일로 답변 드리겠습니다.</p>
                <button
                    className="contact-reset-btn"
                    onClick={() => setFormState('idle')}
                >
                    새 문의 작성하기
                </button>
            </div>
        )
    }

    return (
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-field">
                <label htmlFor="contact-name">이름 *</label>
                <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="홍길동"
                    value={form.name}
                    onChange={handleChange}
                    required
                    disabled={formState === 'loading'}
                />
            </div>

            <div className="contact-field">
                <label htmlFor="contact-email">이메일 *</label>
                <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    disabled={formState === 'loading'}
                />
            </div>

            <div className="contact-field">
                <label htmlFor="contact-type">문의 유형</label>
                <select
                    id="contact-type"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    disabled={formState === 'loading'}
                >
                    <option value="error">콘텐츠 오류 제보</option>
                    <option value="improvement">서비스 개선 의견</option>
                    <option value="privacy">개인정보 관련 문의</option>
                    <option value="ads">광고·제휴 문의</option>
                    <option value="other">기타 문의</option>
                </select>
            </div>

            <div className="contact-field">
                <label htmlFor="contact-message">내용 *</label>
                <textarea
                    id="contact-message"
                    name="message"
                    placeholder="문의 내용을 자세히 입력해 주세요."
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    required
                    disabled={formState === 'loading'}
                />
            </div>

            {formState === 'error' && (
                <p className="contact-error">{errorMsg}</p>
            )}

            <button
                type="submit"
                className="contact-submit-btn"
                disabled={formState === 'loading'}
            >
                {formState === 'loading' ? '전송 중...' : '문의 보내기'}
            </button>
        </form>
    )
}
