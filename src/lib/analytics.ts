declare global {
    interface Window {
        gtag?: (command: string, ...args: unknown[]) => void
    }
}

type EventName =
    | 'search'
    | 'dream_view'
    | 'favorite_add'
    | 'favorite_remove'
    | 'filter_change'
    | 'share_click'
    | 'contact_submit'
    | 'newsletter_subscribe'

interface EventParams {
    search_term?: string
    dream_id?: string
    dream_title?: string
    dream_type?: string
    filter_type?: string
    share_platform?: string
    inquiry_type?: string
}

export function trackEvent(eventName: EventName, params?: EventParams) {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', eventName, params)
    }
}
