import { NextResponse } from 'next/server';
import { initiateCall } from '@/lib/callService';

export async function POST(request: Request) {
  const { name, phone, carId } = await request.json();

  try {
    const result = await initiateCall(name, phone, carId);
    return NextResponse.json({ success: true, callId: result.callId });
  } catch (error) {
    console.error('Failed to initiate call:', error);

    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
