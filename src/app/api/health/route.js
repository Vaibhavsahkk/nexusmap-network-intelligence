import { NextResponse } from 'next/server';
import { getDriver } from '@/lib/db/driver.js';

export const dynamic = 'force-dynamic';
export const maxDuration = 10;

export async function GET() {
  try {
    const driver = getDriver();
    await driver.verifyConnectivity();
    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Health Check Failed:', error);
    return NextResponse.json(
      { status: 'unhealthy', database: 'disconnected', error: error.message },
      { status: 503 }
    );
  }
}
