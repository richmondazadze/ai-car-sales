import { NextResponse } from 'next/server';

const APPLICATION_KEY = process.env.SINCH_APP_KEY;
const APPLICATION_SECRET = process.env.SINCH_APP_SECRET;
const SINCH_NUMBER = process.env.SINCH_PHONE_NUMBER;
const LOCALE = "en-US";  // You can change this or make it an environment variable
const TO_NUMBER = process.env.TEST_TO_NUMBER;  // Add this to your .env.local

export async function GET() {
  if (!APPLICATION_KEY || !APPLICATION_SECRET || !SINCH_NUMBER || !TO_NUMBER) {
    return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 });
  }

  const basicAuthentication = APPLICATION_KEY + ":" + APPLICATION_SECRET;

  const ttsBody = {
    method: 'ttsCallout',
    ttsCallout: {
      cli: SINCH_NUMBER,
      destination: { type: 'number', endpoint: TO_NUMBER },
      locale: LOCALE,
      text: 'This is a test call from Sinch',
    }
  };

  try {
    const response = await fetch("https://calling.api.sinch.com/calling/v1/callouts", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + Buffer.from(basicAuthentication).toString('base64')
      },
      body: JSON.stringify(ttsBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to initiate call' }, { status: 500 });
  }
}