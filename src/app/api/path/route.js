import { NextResponse } from 'next/server';
import { findShortestPath } from '@/lib/db/queries/path.js';

export const dynamic = 'force-dynamic';
export const maxDuration = 10;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const targetId = searchParams.get('to');
    const fromId = searchParams.get('from');

    if (!targetId) {
      return NextResponse.json(
        { error: 'Target person ID (to) is required' },
        { status: 400 }
      );
    }

    const pathData = await findShortestPath(targetId, fromId);
    if (!pathData.found) {
      return NextResponse.json({ data: pathData }, { status: 404 });
    }

    return NextResponse.json({ data: pathData });
  } catch (error) {
    console.error('Path API Error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate warm path', details: error.message },
      { status: 500 }
    );
  }
}
