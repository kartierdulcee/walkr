import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'bookings.json');

export async function GET() {
  const raw = await fs.readFile(DATA_PATH, 'utf8').catch(() => '[]');
  const bookings = JSON.parse(raw);
  return NextResponse.json({ bookings });
}
