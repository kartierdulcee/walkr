import { NextResponse } from 'next/server';
import { appendBooking, deleteBooking, readBookings } from '@/lib/bookings-store';

export async function GET() {
  const bookings = await readBookings();
  return NextResponse.json({ bookings });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const saved = await appendBooking(payload);
  return NextResponse.json({ booking: saved });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  const deleted = await deleteBooking(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ status: 'deleted' });
}
