import { NextResponse } from 'next/server';
import { handleUserInput } from '@/lib/callService';

export async function POST(request: Request) {
  const data = await request.json();
  
  // Extract relevant information from Sinch webhook data
  const userInput = data.userInput;
  const carId = data.carId; // You'd need to pass this information through the call somehow

  const response = await handleUserInput(userInput, carId);

  // Construct Sinch SVAML response
  const svamlResponse = {
    instructions: [
      {
        name: 'say',
        text: response
      },
      {
        name: 'collectDTMF',
        maxDigits: 1,
        timeoutMilis: 10000
      }
    ]
  };

  return NextResponse.json(svamlResponse);
}