import { NextResponse } from 'next/server'
import dreams from '@/data/dreams_new.json'

export async function GET() {
    return NextResponse.json(dreams)
}
