import { NextResponse } from 'next/server';
import { getPersonProfile } from '@/lib/db/queries/person.js';

export const dynamic = 'force-dynamic';
export const maxDuration = 10;

export async function GET(request, { params }) {
  try {
    const { id } = await params; // Next.js 15 async params rule
    if (!id) {
      return NextResponse.json({ error: 'Person ID parameter is required' }, { status: 400 });
    }

    const profile = await getPersonProfile(id);
    if (!profile) {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 });
    }

    return NextResponse.json({ data: profile });
  } catch (error) {
    console.error('Person Profile API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch person profile', details: error.message },
      { status: 500 }
    );
  }
}
