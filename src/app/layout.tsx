import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import Script from 'next/script'

const notoSansKR = Noto_Sans_KR({
    subsets: ['latin'],
    weight: ['300', '400', '700'],
    display: 'swap',
    variable: '--font-noto-sans-kr',
})

export const metadata: Metadata = {
    metadataBase: new URL('https://www.dream645.kr'),
    title: {
        default: 'Dream645 - 무료 꿈해몽 & 로또 번호 추천',
        template: '%s | Dream645',
    },
    description:
        '어젯밤 꿈이 로또 당첨의 신호일까요? 꿈해몽 분석과 AI가 추천하는 행운의 번호를 무료로 확인하세요. 길몽, 흉몽, 태몽 해석부터 로또 추천 번호까지.',
    keywords: [
        '꿈해몽',
        '꿈풀이',
        '꿈 해석',
        '로또 번호 추천',
        '길몽',
        '흉몽',
        '태몽',
        '무료 꿈해몽',
        '꿈 의미',
        '로또 꿈',
        '행운의 숫자',
    ],
    alternates: {
        canonical: 'https://www.dream645.kr',
        languages: {
            'ko-KR': 'https://www.dream645.kr',
        },
    },
    openGraph: {
        title: 'Dream645 - 무료 꿈해몽 & 로또 번호 추천',
        description:
            '어젯밤 꿈이 로또 당첨의 신호일까요? 꿈해몽 분석과 AI가 추천하는 행운의 번호를 무료로 확인하세요.',
        url: 'https://www.dream645.kr',
        siteName: 'Dream645',
        locale: 'ko_KR',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Dream645 - 무료 꿈해몽과 로또 번호 추천 서비스',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Dream645 - 무료 꿈해몽 & 로또 번호 추천',
        description:
            '어젯밤 꿈이 로또 당첨의 신호일까요? 꿈해몽 분석과 AI가 추천하는 행운의 번호를 무료로 확인하세요.',
        images: ['/og-image.png'],
    },
    verification: {
        google: 'v_7_s_i_e_r_i_f_i_c_a_t_i_o_n_c_o_d_e', // TODO: Google Search Console에서 실제 코드 발급 후 교체
        other: {
            'naver-site-verification': 'ca3bdee8fb6502de13dfbf1cd243971587a0b2e5',
        },
    },
}

// WebSite 구조화 데이터 (검색엔진 사이트링크 검색창)
const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dream645 - 신비의 기록',
    url: 'https://www.dream645.kr',
    description:
        '무료 꿈해몽과 AI 로또 번호 추천 서비스. 길몽, 흉몽, 태몽 분석부터 행운의 숫자까지.',
    potentialAction: {
        '@type': 'SearchAction',
        target: 'https://www.dream645.kr/?q={search_term_string}',
        'query-input': 'required name=search_term_string',
    },
}

const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Dream645',
    url: 'https://www.dream645.kr',
    logo: 'https://www.dream645.kr/logo.png',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko" className={notoSansKR.variable}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(websiteJsonLd),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(organizationJsonLd),
                    }}
                />
            </head>
            <body className={notoSansKR.className}>
                {children}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-WHWQBZ6E8H"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WHWQBZ6E8H');
          `}
                </Script>
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2947913248390883"
                    crossOrigin="anonymous"
                    strategy="lazyOnload"
                />
            </body>
        </html>
    )
}
