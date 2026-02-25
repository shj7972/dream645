import { ImageResponse } from 'next/og'
import dreamsData from '@/data/dreams_new.json'

interface Dream {
    id: string
    title: string
    type: 'good' | 'bad' | 'baby'
    summary: string
    lucky_numbers: number[]
}

const dreams: Dream[] = dreamsData as Dream[]

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const TYPE_CONFIG: Record<string, { label: string; emoji: string; color: string; bg: string }> = {
    good: { label: '길몽', emoji: '🍀', color: '#4ade80', bg: '#052e16' },
    bad: { label: '흉몽', emoji: '🧿', color: '#f87171', bg: '#2a0a0a' },
    baby: { label: '태몽', emoji: '👶', color: '#fbbf24', bg: '#1a1200' },
}

export default async function OGImage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const dream = dreams.find((d) => d.id === id)

    if (!dream) {
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

    const config = TYPE_CONFIG[dream.type]

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
                {/* Top: Badge */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                    }}
                >
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
                </div>

                {/* Middle: Title + Summary */}
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
                        {dream.title} 해몽
                    </div>
                    <div
                        style={{
                            fontSize: 24,
                            color: '#94a3b8',
                            lineHeight: 1.5,
                            maxWidth: '900px',
                        }}
                    >
                        {dream.summary.length > 80
                            ? dream.summary.slice(0, 80) + '...'
                            : dream.summary}
                    </div>
                </div>

                {/* Bottom: Lucky Numbers + Branding */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                    }}
                >
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <span style={{ fontSize: 20, color: '#94a3b8', marginRight: '8px' }}>
                            행운의 번호
                        </span>
                        {dream.lucky_numbers.map((num) => (
                            <div
                                key={num}
                                style={{
                                    width: '46px',
                                    height: '46px',
                                    borderRadius: '50%',
                                    background: `${config.color}22`,
                                    border: `2px solid ${config.color}55`,
                                    color: config.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 18,
                                    fontWeight: 700,
                                }}
                            >
                                {num}
                            </div>
                        ))}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
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
