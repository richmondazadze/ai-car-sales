import { Buffer } from 'buffer';

const BASE_URL = 'https://calling.api.sinch.com/calling/v1/callouts';

export async function initiateCall(name: string, phone: string, carId: number) {
  const appKey = process.env.SINCH_APP_KEY;
  const appSecret = process.env.SINCH_APP_SECRET;
  const sinchNumber = process.env.SINCH_PHONE_NUMBER;

  if (!appKey || !appSecret || !sinchNumber) {
    throw new Error('Sinch credentials are not properly configured');
  }

  const auth = Buffer.from(`${appKey}:${appSecret}`).toString('base64');

  const ttsBody = {
    method: 'ttsCallout',
    ttsCallout: {
      cli: sinchNumber,
      destination: { type: 'number', endpoint: phone },
      locale: 'en-US',
      text: `Hello ${name}, thank you for your interest in our car with ID ${carId}. How may I assist you today?`,
      actions: [
        {
          name: 'get_user_input',
          maxDigits: 1,
          timeoutMilis: 10000
        }
      ]
    }
  };

  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`
    },
    body: JSON.stringify(ttsBody)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function handleUserInput(input: string, carId: number) {
  // Here you would implement logic to handle user input and generate appropriate responses
  // This could involve integrating with an LLM or using predefined responses
  switch(input) {
    case '1':
      return `Great! The car with ID ${carId} is available for a test drive. Would you like to schedule one?`;
    case '2':
      return `The price for the car with ID ${carId} starts at $30,000. Would you like more details about financing options?`;
    default:
      return "I'm sorry, I didn't understand that. Could you please repeat your question?";
  }
}