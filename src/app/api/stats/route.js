import { NextResponse } from 'next/server';
import { getNetworkStats } from '@/lib/db/queries/stats.js';

export const dynamic = 'force-dynamic';
export const maxDuration = 10;

export async function GET() {
  try {
    const stats = await getNetworkStats();
    return NextResponse.json({ data: stats });
  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch network overview stats', details: error.message },
      { status: 500 }
    );
  }
}
