import { NextResponse } from 'next/server'
import dreams from '@/data/dreams.json'

export async function GET() {
    return NextResponse.json(dreams)
}
