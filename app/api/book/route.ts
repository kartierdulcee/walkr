import { NextResponse } from 'next/server';
import { appendBooking } from '@/lib/bookings-store';

async function sendToOps(payload: any) {
  // Placeholder for Twilio/SMS or CRM integration.
  console.log('New booking request', payload);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const saved = await appendBooking(payload);
  await sendToOps(saved);

  return NextResponse.json({ status: 'success', message: 'Booking received.', booking: saved });
}
