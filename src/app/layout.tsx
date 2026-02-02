import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    metadataBase: new URL('https://www.dream645.kr'),
    title: {
        default: 'Dream645 - 무료 꿈해몽 & 로또 번호 추천',
        template: '%s | Dream645',
    },
    description: '어젯밤 꿈이 로또 당첨의 신호일까요? 꿈해몽 분석과 AI가 추천하는 행운의 번호를 무료로 확인하세요.',
    openGraph: {
        title: 'Dream645 - 무료 꿈해몽 & 로또 번호 추천',
        description: '어젯밤 꿈이 로또 당첨의 신호일까요? 꿈해몽 분석과 AI가 추천하는 행운의 번호를 무료로 확인하세요.',
        url: 'https://www.dream645.kr',
        siteName: 'Dream645',
        locale: 'ko_KR',
        type: 'website',
        images: [
            {
                url: '/dream_background.png', // Using existing background image as fallback OG image
                width: 1200,
                height: 630,
                alt: 'Dream645 Cover Image',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Dream645 - 무료 꿈해몽 & 로또 번호 추천',
        description: '어젯밤 꿈이 로또 당첨의 신호일까요? 꿈해몽 분석과 AI가 추천하는 행운의 번호를 무료로 확인하세요.',
        images: ['/dream_background.png'],
    },
    verification: {
        google: 'v_7_s_i_e_r_i_f_i_c_a_t_i_o_n_c_o_d_e', // Placeholder
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
