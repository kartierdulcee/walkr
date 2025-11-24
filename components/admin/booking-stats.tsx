'use client';

import { useEffect, useMemo, useState } from 'react';

type Booking = {
  id: string;
  plan?: string;
};

export function BookingStats({ refreshToken }: { refreshToken?: number }) {
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
      setError('Could not load revenue stats. Refresh to retry.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, [refreshToken]);

  const stats = useMemo(() => {
    const weekly = bookings.reduce((sum, b) => sum + planValue(b.plan), 0);
    const monthly = weekly * 4.33; // average weeks per month
    const yearly = weekly * 52;
    return {
      clients: bookings.length,
      weekly,
      monthly,
      yearly,
    };
  }, [bookings]);

  if (loading) {
    return <p className="text-bark-700">Loading revenue…</p>;
  }

  if (error) {
    return <p className="text-red-700">{error}</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Clients" value={stats.clients} />
      <StatCard label="Weekly revenue" value={currency(stats.weekly)} />
      <StatCard label="Expected monthly" value={currency(stats.monthly)} />
      <StatCard label="Expected yearly" value={currency(stats.yearly)} />
    </div>
  );
}

function planValue(plan?: string) {
  switch (plan) {
    case 'once-daily':
      return 20;
    case 'twice-daily':
      return 40;
    default:
      return 0; // custom or unknown: assumed zero until priced
  }
}

function currency(amount: number) {
  return amount.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-sand-100 bg-white p-4 shadow-soft">
      <p className="text-sm font-semibold text-bark-700">{label}</p>
      <p className="mt-2 text-2xl font-bold text-bark-800">{value}</p>
    </div>
  );
}
