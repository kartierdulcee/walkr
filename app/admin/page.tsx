import { BookingsTable } from '@/components/admin/bookings-table';

export const metadata = {
  title: 'Admin | walkr',
  description: 'Live view of client bookings.',
};

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6 space-y-2">
        <p className="tag">Admin</p>
        <h1 className="text-3xl font-bold text-bark-800">Client bookings</h1>
        <p className="text-bark-700">Live list of incoming requests. This page refreshes automatically.</p>
      </div>
      <BookingsTable />
    </div>
  );
}
