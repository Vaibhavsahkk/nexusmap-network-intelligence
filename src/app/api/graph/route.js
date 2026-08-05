import { NextResponse } from 'next/server';
import { getGraphData } from '@/lib/db/queries/graph.js';

export const dynamic = 'force-dynamic';
export const maxDuration = 10;

export async function GET() {
  try {
    const graphData = await getGraphData();
    return NextResponse.json({ data: graphData });
  } catch (error) {
    console.error('Graph API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch network graph visualization data', details: error.message },
      { status: 500 }
    );
  }
}
