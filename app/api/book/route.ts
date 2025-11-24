import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

type BookingPayload = {
  name?: string;
  dogName?: string;
  timeSlot?: string;
  plan?: string;
  customTime?: string;
  phone?: string;
  notes?: string;
};

type StoredBooking = BookingPayload & {
  id: string;
  createdAt: string;
  status: 'new' | 'scheduled' | 'completed';
};

const DATA_PATH = path.join(process.cwd(), 'data', 'bookings.json');

async function saveBooking(payload: BookingPayload) {
  const existingRaw = await fs.readFile(DATA_PATH, 'utf8').catch(() => '[]');
  const existing = JSON.parse(existingRaw) as StoredBooking[];
  const booking: StoredBooking = {
    ...payload,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  existing.unshift(booking);
  await fs.writeFile(DATA_PATH, JSON.stringify(existing, null, 2), 'utf8');
  return booking;
}

async function sendToOps(payload: BookingPayload) {
  // Placeholder for Twilio/SMS or CRM integration.
  console.log('New booking request', payload);
}

export async function POST(request: Request) {
  const payload = (await request.json()) as BookingPayload;
  const saved = await saveBooking(payload);
  await sendToOps(saved);

  return NextResponse.json({ status: 'success', message: 'Booking received.', booking: saved });
}
