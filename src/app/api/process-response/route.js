import { NextResponse } from 'next/server'
import twilio from 'twilio'
import { processResponse } from '@/lib/callService'

export async function POST(request: Request) {
  const formData = await request.formData()
  const transcription = formData.get('TranscriptionText') as string

  const response = await processResponse(transcription)

  const twiml = new twilio.twiml.VoiceResponse()
  twiml.say(response)

  return new NextResponse(twiml.toString(), {
    status: 200,
    headers: { 'Content-Type': 'text/xml' },
  })
}