import { NextResponse } from 'next/server';
import { getCompanyNetwork } from '@/lib/db/queries/company.js';

export const dynamic = 'force-dynamic';
export const maxDuration = 10;

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '20';

    if (!id) {
      return NextResponse.json({ error: 'Company ID is required' }, { status: 400 });
    }

    const companyData = await getCompanyNetwork(id, limit);
    return NextResponse.json({ data: companyData, total: companyData.length });
  } catch (error) {
    console.error('Company API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company network', details: error.message },
      { status: 500 }
    );
  }
}
