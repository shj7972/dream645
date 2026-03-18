import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
    try {
        const { name, email, type, message } = await request.json()

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: '이름, 이메일, 내용은 필수입니다.' },
                { status: 400 }
            )
        }

        const typeLabel: Record<string, string> = {
            error: '콘텐츠 오류 제보',
            improvement: '서비스 개선 의견',
            privacy: '개인정보 관련 문의',
            ads: '광고·제휴 문의',
            other: '기타 문의',
        }

        const { data, error } = await resend.emails.send({
            from: 'Dream645 <onboarding@resend.dev>',
            to: ['seo.hyunjong@gamil.com'],
            subject: `[Dream645] ${typeLabel[type] ?? '문의'} - ${name}`,
            html: `
                <h2>[Dream645] 문의가 접수되었습니다</h2>
                <table style="border-collapse:collapse;width:100%;max-width:600px;">
                    <tr>
                        <td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;width:120px;">문의 유형</td>
                        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${typeLabel[type] ?? type}</td>
                    </tr>
                    <tr>
                        <td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;">이름</td>
                        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;">이메일</td>
                        <td style="padding:8px 12px;border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;vertical-align:top;">내용</td>
                        <td style="padding:8px 12px;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
                    </tr>
                </table>
            `,
        })

        if (error) {
            console.error('Resend error:', error)
            return NextResponse.json(
                { error: '메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.' },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true, id: data?.id })
    } catch (err) {
        console.error('Contact API error:', err)
        return NextResponse.json(
            { error: '서버 오류가 발생했습니다.' },
            { status: 500 }
        )
    }
}
