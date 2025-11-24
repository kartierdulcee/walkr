'use client';

import { useState } from 'react';
import { BookingsTable } from '@/components/admin/bookings-table';
import { BookingStats } from '@/components/admin/booking-stats';
import { AddBookingForm } from '@/components/admin/add-booking-form';

export function AdminPageClient() {
  const [refreshToken, setRefreshToken] = useState(Date.now());

  const triggerRefresh = () => setRefreshToken(Date.now());

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6 space-y-2">
        <p className="tag">Admin</p>
        <h1 className="text-3xl font-bold text-bark-800">Client bookings</h1>
        <p className="text-bark-700">Live list of incoming requests. This page refreshes automatically.</p>
      </div>
      <div className="mb-6">
        <BookingStats refreshToken={refreshToken} />
      </div>
      <div className="mb-6">
        <AddBookingForm onAdded={triggerRefresh} />
      </div>
      <BookingsTable refreshToken={refreshToken} onChange={triggerRefresh} />
    </div>
  );
}
