import { NextResponse } from 'next/server'
import twilio from 'twilio'
import { handleVoiceCall } from '@/lib/callService'

export async function POST(request: Request) {
  const twiml = new twilio.twiml.VoiceResponse()
  await handleVoiceCall(twiml)

  return new NextResponse(twiml.toString(), {
    status: 200,
    headers: { 'Content-Type': 'text/xml' },
  })
}