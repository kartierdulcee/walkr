import { BookingForm } from '@/components/booking-form';
import { QrCard } from '@/components/qr-card';

export const metadata = {
  title: 'Book a walk | walkr',
  description: 'Send a fast booking request for a local dog walk on your route.',
};

export default function HomePage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-soft">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sand-200 text-bark-800 text-xl">
          🐾
        </span>
        <span className="text-2xl font-bold text-bark-800">walkr</span>
      </div>

      <div className="mb-8 max-w-2xl space-y-2 text-center">
        <p className="tag mx-auto w-fit">Book a walk</p>
        <h1 className="text-3xl font-bold text-bark-800 sm:text-4xl">Schedule your dog walk</h1>
        <p className="text-bark-700">Serving Boston Eddison District, 5 days a week.</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2 text-sm font-semibold text-bark-800">
          <span className="tag">Insured walker</span>
          <span className="tag">Neighborhood routes only</span>
          <span className="tag">Perfect for busy owners</span>
        </div>
      </div>

      <div className="grid w-full max-w-5xl gap-5 lg:grid-cols-[1.6fr_1fr]">
        <BookingForm />
        <div className="space-y-4">
          <div className="section-card p-5">
            <p className="tag">Need it sooner?</p>
            <h3 className="mt-2 text-xl font-semibold text-bark-800">Call or text now</h3>
            <p className="text-bark-700">Fastest response between 7am and 7pm. Short-notice walks are welcome.</p>
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
