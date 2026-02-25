'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

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

    function toggleFavorite(e: React.MouseEvent, dreamId: string) {
        e.preventDefault()
        e.stopPropagation()
        setFavorites((prev) => {
            const next = prev.includes(dreamId)
                ? prev.filter((id) => id !== dreamId)
                : [...prev, dreamId]
            localStorage.setItem('dream_favorites', JSON.stringify(next))
            return next
        })
    }

    function handleFilterChange(filter: string) {
        setCurrentFilter(filter)
        setCurrentPage(1)
    }

    function handleSearch(value: string) {
        setSearchQuery(value)
        setCurrentPage(1)
    }

    function goToPage(page: number) {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Pagination range
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
