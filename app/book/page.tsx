import { BookingForm } from '@/components/booking-form';
import { QrCard } from '@/components/qr-card';

export const metadata = {
  title: 'Book a walk | walkr',
  description: 'Send a fast booking request for a local dog walk on your route.',
};

export default function BookPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="grid gap-5 sm:grid-cols-[1.6fr_1fr]">
        <BookingForm />
        <div className="space-y-4">
          <div className="section-card p-5">
            <p className="tag">Direct contact</p>
            <h3 className="mt-2 text-xl font-semibold text-bark-800">Call or text anytime</h3>
            <p className="text-bark-700">I respond fastest between 7am and 7pm. Short-notice walks are welcome.</p>
            <a className="mt-3 block text-lg font-semibold text-bark-800" href="tel:+13133167826">
              (313) 316-7826
            </a>
          </div>
          <QrCard />
        </div>
      </div>
    </div>
  );
}
