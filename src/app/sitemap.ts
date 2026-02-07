import { MetadataRoute } from 'next'
import dreamsData from '../data/dreams_new.json'

interface Dream {
    id: string
    title: string
    type: string
    summary: string
    detail: string
    lucky_numbers: number[]
    action_tip: string
}

const dreams: Dream[] = dreamsData as Dream[]
const BASE_URL = 'https://www.dream645.kr'

export default function sitemap(): MetadataRoute.Sitemap {
    // 정적 라우트
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/category/good`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/category/bad`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/category/baby`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
    ]

    // 개별 꿈 상세 페이지 라우트
    const dreamRoutes = dreams.map((dream) => ({
        url: `${BASE_URL}/dream/${dream.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [...staticRoutes, ...dreamRoutes]
}
