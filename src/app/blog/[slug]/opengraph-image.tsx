import { ImageResponse } from 'next/og'
import blogPosts from '@/data/blog_posts.json'

interface BlogPost {
    slug: string
    title: string
    description: string
    category: string
    date: string
    readTime: number
}

const posts: BlogPost[] = blogPosts as BlogPost[]

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const CATEGORY_CONFIG: Record<string, { label: string; emoji: string; color: string; bg: string }> = {
    guide: { label: '가이드', emoji: '📖', color: '#a78bfa', bg: '#1a0a2e' },
    tip: { label: '팁', emoji: '💡', color: '#fbbf24', bg: '#1a1200' },
    knowledge: { label: '지식', emoji: '🧠', color: '#38bdf8', bg: '#0a1a2e' },
}

const DEFAULT_CONFIG = { label: '블로그', emoji: '✍️', color: '#a78bfa', bg: '#1a0a2e' }

export default async function OGImage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = posts.find((p) => p.slug === slug)

    if (!post) {
        return new ImageResponse(
            (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#0b0e14',
                        color: 'white',
                        fontSize: 48,
                    }}
                >
                    Dream645
                </div>
            ),
            { ...size }
        )
    }

    const config = CATEGORY_CONFIG[post.category] ?? DEFAULT_CONFIG

    const titleLines = post.title.length > 28
        ? [post.title.slice(0, 28), post.title.slice(28)]
        : [post.title]

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '60px 70px',
                    background: `linear-gradient(135deg, #0b0e14 0%, ${config.bg} 50%, #0b0e14 100%)`,
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Top: Category Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                        style={{
                            padding: '8px 20px',
                            borderRadius: '30px',
                            background: `${config.color}22`,
                            border: `2px solid ${config.color}`,
                            color: config.color,
                            fontSize: 24,
                            fontWeight: 700,
                        }}
                    >
                        {config.emoji} {config.label}
                    </div>
                    <div
                        style={{
                            padding: '8px 16px',
                            borderRadius: '30px',
                            background: '#ffffff11',
                            border: '1px solid #ffffff22',
                            color: '#94a3b8',
                            fontSize: 20,
                        }}
                    >
                        읽는 시간 {post.readTime}분
                    </div>
                </div>

                {/* Middle: Title + Description */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        flex: 1,
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            fontSize: 52,
                            fontWeight: 800,
                            color: '#ffffff',
                            lineHeight: 1.3,
                            letterSpacing: '-1px',
                        }}
                    >
                        {titleLines.map((line, i) => (
                            <div key={i}>{line}</div>
                        ))}
                    </div>
                    <div
                        style={{
                            fontSize: 24,
                            color: '#94a3b8',
                            lineHeight: 1.5,
                            maxWidth: '900px',
                        }}
                    >
                        {post.description.length > 80
                            ? post.description.slice(0, 80) + '...'
                            : post.description}
                    </div>
                </div>

                {/* Bottom: Date + Branding */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#64748b',
                            fontSize: 20,
                        }}
                    >
                        <span>🗓</span>
                        <span>{post.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: 28, color: '#a78bfa', fontWeight: 700 }}>
                            Dream645
                        </span>
                        <span style={{ fontSize: 18, color: '#64748b' }}>
                            신비의 기록
                        </span>
                    </div>
                </div>
            </div>
        ),
        { ...size }
    )
}
