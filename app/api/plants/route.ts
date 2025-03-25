import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://localhost:3001/api/plants', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plants' },
      { status: 500 }
    );
  }
} 