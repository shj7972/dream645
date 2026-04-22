'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'

interface Dream {
    id: string
    title: string
    type: 'good' | 'bad' | 'baby'
    summary: string
    detail: string
    lucky_numbers: number[]
    action_tip: string
}

const TYPE_LABELS: Record<string, string> = {
    good: '길몽',
    bad: '흉몽',
    baby: '태몽',
}

const TYPE_EMOJI: Record<string, string> = {
    good: '🍀',
    bad: '🧿',
    baby: '👶',
}

const ITEMS_PER_PAGE = 12
const MAX_RECENT = 6

export default function DreamGrid({ dreams }: { dreams: Dream[] }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [currentFilter, setCurrentFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [favorites, setFavorites] = useState<string[]>(() => {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem('dream_favorites') || '[]')
        }
        return []
    })
    const [recentIds, setRecentIds] = useState<string[]>(() => {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem('dream_recent') || '[]')
        }
        return []
    })

    const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const filteredDreams = useMemo(() => {
        return dreams.filter((dream) => {
            const query = searchQuery.toLowerCase()
            const matchesQuery =
                dream.title.toLowerCase().includes(query) ||
                dream.summary.toLowerCase().includes(query)
            const matchesFilter =
                currentFilter === 'all' ||
                (currentFilter === 'fav'
                    ? favorites.includes(dream.id)
                    : dream.type === currentFilter)
            return matchesQuery && matchesFilter
        })
    }, [dreams, searchQuery, currentFilter, favorites])

    const totalPages = Math.ceil(filteredDreams.length / ITEMS_PER_PAGE)
    const safePage = Math.min(currentPage, totalPages || 1)
    const pageDreams = filteredDreams.slice(
        (safePage - 1) * ITEMS_PER_PAGE,
        safePage * ITEMS_PER_PAGE
    )

    const recentDreams = useMemo(() => {
        return recentIds
            .map((id) => dreams.find((d) => d.id === id))
            .filter((d): d is Dream => d !== undefined)
    }, [recentIds, dreams])

    function recordRecent(dreamId: string) {
        setRecentIds((prev) => {
            const next = [dreamId, ...prev.filter((id) => id !== dreamId)].slice(0, MAX_RECENT)
            localStorage.setItem('dream_recent', JSON.stringify(next))
            return next
        })
    }

    function toggleFavorite(e: React.MouseEvent, dreamId: string) {
        e.preventDefault()
        e.stopPropagation()
        setFavorites((prev) => {
            const isAdding = !prev.includes(dreamId)
            const next = isAdding
                ? [...prev, dreamId]
                : prev.filter((id) => id !== dreamId)
            localStorage.setItem('dream_favorites', JSON.stringify(next))
            const dream = dreams.find((d) => d.id === dreamId)
            trackEvent(isAdding ? 'favorite_add' : 'favorite_remove', {
                dream_id: dreamId,
                dream_title: dream?.title,
                dream_type: dream?.type,
            })
            return next
        })
    }

    function handleFilterChange(filter: string) {
        setCurrentFilter(filter)
        setCurrentPage(1)
        trackEvent('filter_change', { filter_type: filter })
    }

    function handleSearch(value: string) {
        setSearchQuery(value)
        setCurrentPage(1)
        if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current)
        if (value.trim().length >= 2) {
            searchDebounceRef.current = setTimeout(() => {
                trackEvent('search', { search_term: value.trim() })
            }, 800)
        }
    }

    useEffect(() => {
        return () => {
            if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current)
        }
    }, [])

    function goToPage(page: number) {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    function getPageRange() {
        const maxVisible = 5
        let start = Math.max(1, safePage - Math.floor(maxVisible / 2))
        let end = Math.min(totalPages, start + maxVisible - 1)
        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1)
        }
        const pages: (number | 'dots')[] = []
        if (start > 1) {
            pages.push(1)
            if (start > 2) pages.push('dots')
        }
        for (let i = start; i <= end; i++) pages.push(i)
        if (end < totalPages) {
            if (end < totalPages - 1) pages.push('dots')
            pages.push(totalPages)
        }
        return pages
    }

    const filters = [
        { key: 'all', label: '전체' },
        { key: 'good', label: '길몽' },
        { key: 'bad', label: '흉몽' },
        { key: 'baby', label: '태몽' },
        { key: 'fav', label: '⭐ 즐겨찾기' },
    ]

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    id="search-input"
                    placeholder="어떤 꿈을 꾸셨나요? 예: 돼지, 용, 이빨..."
                    autoComplete="off"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <div className="filter-buttons">
                    {filters.map((f) => (
                        <button
                            key={f.key}
                            className={`filter-btn ${currentFilter === f.key ? 'active' : ''}`}
                            onClick={() => handleFilterChange(f.key)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {recentDreams.length > 0 && searchQuery === '' && currentFilter === 'all' && (
                <section className="recent-dreams-section">
                    <h2 className="recent-dreams-title">🕐 최근 본 꿈</h2>
                    <div className="recent-dreams-list">
                        {recentDreams.map((dream) => (
                            <Link
                                key={dream.id}
                                href={`/dream/${dream.id}`}
                                className="recent-dream-chip"
                                onClick={() => recordRecent(dream.id)}
                            >
                                <span className={`recent-chip-type type-${dream.type}`}>
                                    {TYPE_EMOJI[dream.type]}
                                </span>
                                <span className="recent-chip-title">{dream.title}</span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            <main>
                <div className="dream-grid">
                    {pageDreams.length === 0 ? (
                        <p className="loading-spinner">검색 결과가 없습니다.</p>
                    ) : (
                        pageDreams.map((dream, index) => {
                            const isFav = favorites.includes(dream.id)
                            return (
                                <Link
                                    key={dream.id}
                                    href={`/dream/${dream.id}`}
                                    className={`dream-card ${isFav ? 'is-fav' : ''}`}
                                    style={{
                                        animationDelay: `${(index % 12) * 0.1}s`,
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        position: 'relative',
                                    }}
                                    onClick={() => {
                                        recordRecent(dream.id)
                                        trackEvent('dream_view', {
                                            dream_id: dream.id,
                                            dream_title: dream.title,
                                            dream_type: dream.type,
                                        })
                                    }}
                                >
                                    <span
                                        className="fav-star"
                                        onClick={(e) =>
                                            toggleFavorite(e, dream.id)
                                        }
                                        role="button"
                                        aria-label={
                                            isFav
                                                ? '즐겨찾기 해제'
                                                : '즐겨찾기 추가'
                                        }
                                    >
                                        {isFav ? '★' : '☆'}
                                    </span>
                                    <span
                                        className={`dream-type type-${dream.type}`}
                                    >
                                        {TYPE_EMOJI[dream.type]}{' '}
                                        {TYPE_LABELS[dream.type]}
                                    </span>
                                    <h3>{dream.title}</h3>
                                    <p className="dream-summary">
                                        {dream.summary}
                                    </p>
                                    <div className="lucky-numbers">
                                        {dream.lucky_numbers.map((num) => (
                                            <span
                                                key={num}
                                                className="number-circle"
                                            >
                                                {num}
                                            </span>
                                        ))}
                                    </div>
                                </Link>
                            )
                        })
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            className={`page-btn ${safePage === 1 ? 'disabled' : ''}`}
                            disabled={safePage === 1}
                            onClick={() => goToPage(safePage - 1)}
                        >
                            ◀
                        </button>
                        {getPageRange().map((item, i) =>
                            item === 'dots' ? (
                                <span key={`dots-${i}`} className="page-dots">
                                    ···
                                </span>
                            ) : (
                                <button
                                    key={item}
                                    className={`page-btn ${item === safePage ? 'active' : ''}`}
                                    onClick={() => goToPage(item)}
                                >
                                    {item}
                                </button>
                            )
                        )}
                        <button
                            className={`page-btn ${safePage === totalPages ? 'disabled' : ''}`}
                            disabled={safePage === totalPages}
                            onClick={() => goToPage(safePage + 1)}
                        >
                            ▶
                        </button>
                    </div>
                )}
            </main>
        </>
    )
}
