import { promises as fs } from 'fs';
import path from 'path';

export type BookingPayload = {
  name?: string;
  dogName?: string;
  timeSlot?: string;
  plan?: string;
  customTime?: string;
  packPreference?: string;
  phone?: string;
  notes?: string;
};

export type StoredBooking = BookingPayload & {
  id: string;
  createdAt: string;
  status: 'new' | 'scheduled' | 'completed';
};

const DATA_PATH = path.join(process.cwd(), 'data', 'bookings.json');

async function ensureDataFile() {
  const dir = path.dirname(DATA_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.access(DATA_PATH).catch(async () => {
    await fs.writeFile(DATA_PATH, '[]', 'utf8');
  });
}

export async function readBookings(): Promise<StoredBooking[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_PATH, 'utf8').catch(() => '[]');
  return JSON.parse(raw) as StoredBooking[];
}

export async function writeBookings(bookings: StoredBooking[]) {
  await ensureDataFile();
  await fs.writeFile(DATA_PATH, JSON.stringify(bookings, null, 2), 'utf8');
}

export async function appendBooking(payload: BookingPayload): Promise<StoredBooking> {
  const bookings = await readBookings();
  const booking: StoredBooking = {
    ...payload,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  bookings.unshift(booking);
  await writeBookings(bookings);
  return booking;
}

export async function deleteBooking(id: string): Promise<boolean> {
  const bookings = await readBookings();
  const next = bookings.filter((b) => b.id !== id);
  if (next.length === bookings.length) return false;
  await writeBookings(next);
  return true;
}
