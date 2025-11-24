import { NextResponse } from 'next/server';

type BookingPayload = {
  name?: string;
  dogName?: string;
  timeSlot?: string;
  plan?: string;
  customTime?: string;
  phone?: string;
  notes?: string;
};

async function sendToOps(payload: BookingPayload) {
  // Placeholder for Twilio/SMS or CRM integration.
  console.log('New booking request', payload);
}

export async function POST(request: Request) {
  const payload = (await request.json()) as BookingPayload;
  await sendToOps(payload);

  return NextResponse.json({ status: 'success', message: 'Booking received.' });
}
