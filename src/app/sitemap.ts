import { MetadataRoute } from 'next'
import dreamsData from '../data/dreams.json'

// Define the Dream interface based on the JSON structure
interface Dream {
    id: string
    title: string
    type: string
    summary: string
    lucky_numbers: number[]
    action_tip: string
}

const dreams: Dream[] = dreamsData as Dream[]
const BASE_URL = 'https://www.dream645.kr'

export default function sitemap(): MetadataRoute.Sitemap {
    // Static routes
    const routes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
    ]

    // Dynamic routes from dreams.json
    const dreamRoutes = dreams.map((dream) => ({
        url: `${BASE_URL}/dream/${dream.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [...routes, ...dreamRoutes]
}
