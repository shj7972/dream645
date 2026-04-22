import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const { email } = await request.json()

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: '올바른 이메일 주소를 입력해 주세요.' },
                { status: 400 }
            )
        }

        const { error } = await resend.emails.send({
            from: 'Dream645 <onboarding@resend.dev>',
            to: ['seo.hyunjong@gmail.com'],
            subject: `[Dream645] 뉴스레터 구독 신청 - ${email}`,
            html: `
                <h2>[Dream645] 뉴스레터 구독 신청</h2>
                <p>새로운 구독자: <strong>${email}</strong></p>
                <p>구독 신청 시각: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</p>
            `,
        })

        if (error) {
            console.error('Newsletter Resend error:', error)
            return NextResponse.json(
                { error: '구독 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('Newsletter API error:', err)
        return NextResponse.json(
            { error: '서버 오류가 발생했습니다.' },
            { status: 500 }
        )
    }
}
