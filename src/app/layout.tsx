import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    metadataBase: new URL('https://www.dream645.kr'),
    title: 'Dream645 - 무료 꿈해몽 & 로또 번호 추천',
    description: '어젯밤 꿈이 로또 당첨의 신호일까요? 꿈해몽 분석과 AI가 추천하는 행운의 번호를 무료로 확인하세요.',
    verification: {
        google: 'v_7_s_i_e_r_i_f_i_c_a_t_i_o_n_c_o_d_e', // Placeholder, user needs to provide actual code if they have it, or keeps placeholder
        other: {
            'naver-site-verification': 'v_7_s_i_e_r_i_f_i_c_a_t_i_o_n_c_o_d_e', // Placeholder
        },
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
            <body>{children}</body>
        </html>
    )
}
