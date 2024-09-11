import { NextRequest, NextResponse } from 'next/server'
import { initiateCall } from '@/lib/callService'

export async function POST(request: NextRequest) {
  const { name, phone, carId } = await request.json()
  
  try {
    const result = await initiateCall(name, phone, carId)
    console.log('Call initiated:', result)
    return NextResponse.json({ message: 'Call initiated successfully', result }, { status: 200 })
  } catch (error: unknown) {
    console.error('Failed to initiate call:', error)
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Failed to initiate call', error: error.message }, { status: 500 })
    } else {
      return NextResponse.json({ message: 'Failed to initiate call', error: 'An unknown error occurred' }, { status: 500 })
    }
  }
}