'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type Booking = {
  id: string;
  name?: string;
  dogName?: string;
  timeSlot?: string;
  plan?: string;
  customTime?: string;
  packPreference?: string;
  phone?: string;
  notes?: string;
  createdAt: string;
  status?: 'new' | 'scheduled' | 'completed';
};

type Props = {
  refreshToken?: number;
  onChange?: () => void;
};

export function BookingsTable({ refreshToken, onChange }: Props) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    try {
      const res = await fetch('/api/bookings', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load bookings');
      const data = await res.json();
      setBookings(data.bookings ?? []);
      setError('');
    } catch (err) {
      setError('Could not load bookings. Refresh to retry.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, [refreshToken]);

  async function handleDelete(id: string) {
    try {
      const res = await fetch('/api/bookings', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Failed to delete booking');
      await load();
      onChange?.();
    } catch (err) {
      setError('Could not remove booking. Try again.');
    }
  }

  if (loading) {
    return <p className="text-bark-700">Loading bookings…</p>;
  }

  if (error) {
    return <p className="text-red-700">{error}</p>;
  }

  if (!bookings.length) {
    return <p className="text-bark-700">No bookings yet.</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-sand-100 bg-white shadow-soft">
      <div className="grid grid-cols-[1.5fr_1fr_1fr_1.2fr_1fr_0.8fr] gap-3 border-b border-sand-100 bg-sand-50 px-4 py-3 text-sm font-semibold text-bark-800">
        <span>Client</span>
        <span>Dog</span>
        <span>Time</span>
        <span>Plan</span>
        <span className="text-right">Created</span>
        <span className="text-right">Actions</span>
      </div>
      <div className="divide-y divide-sand-100">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="grid grid-cols-[1.5fr_1fr_1fr_1.2fr_1fr_0.8fr] gap-3 px-4 py-3 text-sm text-bark-800"
          >
            <div className="space-y-1">
              <div className="font-semibold">{booking.name || 'Unknown'}</div>
              {booking.phone && <div className="text-bark-700">{booking.phone}</div>}
              {booking.notes && <div className="text-xs text-bark-700/80 line-clamp-2">{booking.notes}</div>}
            </div>
            <div className="font-semibold">{booking.dogName || '—'}</div>
            <div className="space-y-1">
              <div>{booking.timeSlot || '—'}</div>
              {booking.customTime && <div className="text-xs text-bark-700/80">{booking.customTime}</div>}
            </div>
            <div className="space-y-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-sand-100 px-3 py-1 text-xs font-semibold text-bark-800">
                {planLabel(booking.plan)}
              </span>
              {booking.packPreference && (
                <span className="inline-flex w-fit items-center rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-bark-700 ring-1 ring-sand-200">
                  {booking.packPreference === 'friendly' ? 'With friendly dogs' : 'Walk alone'}
                </span>
              )}
              {booking.status && (
                <span
                  className={cn(
                    'inline-flex w-fit items-center rounded-full px-2 py-0.5 text-xs font-semibold',
                    statusColor(booking.status),
                  )}
                >
                  {booking.status}
                </span>
              )}
            </div>
            <div className="text-right text-bark-700">
              {new Date(booking.createdAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}
            </div>
            <div className="flex items-center justify-end">
              <button
                onClick={() => handleDelete(booking.id)}
                className="text-sm font-semibold text-red-700 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function planLabel(plan?: string) {
  switch (plan) {
    case 'once-daily':
      return '$20/week — 1 walk per day';
    case 'twice-daily':
      return '$40/week — 2 walks per day';
    case 'custom':
      return 'Custom walking time';
    default:
      return '—';
  }
}

function statusColor(status: Booking['status']) {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-sand-100 text-bark-800';
  }
}
