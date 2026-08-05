import { NextResponse } from 'next/server';
import { searchNetwork } from '@/lib/db/queries/search.js';

export const dynamic = 'force-dynamic';
export const maxDuration = 10;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limit = searchParams.get('limit') || '20';

    if (!query || query.trim() === '') {
      return NextResponse.json(
        { error: 'Search query parameter (q) is required' },
        { status: 400 }
      );
    }

    const results = await searchNetwork(query.trim(), limit);
    return NextResponse.json({
      data: results,
      total: results.length,
      query: query.trim(),
    });
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { error: 'Failed to execute search query', details: error.message },
      { status: 500 }
    );
  }
}
