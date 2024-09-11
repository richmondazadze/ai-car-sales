import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // Here you would typically handle the transcription callback
  // For now, we'll just log it
  console.log('Transcription callback received')
  return NextResponse.json({ message: 'Transcription received' }, { status: 200 })
}