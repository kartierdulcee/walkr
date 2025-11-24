import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export function Hero() {
  return (
    <section className="mx-auto grid max-w-5xl items-center gap-8 px-4 pb-12 pt-6 sm:grid-cols-2 sm:px-6 lg:pt-10">
      <div className="space-y-6">
        <div className="space-y-3">
          <span className="tag">Dog walking made effortless</span>
          <h1 className="text-4xl font-bold leading-tight text-bark-800 sm:text-5xl">
            Dog Walks on Your Route
          </h1>
          <p className="text-lg text-bark-700 sm:text-xl">
            Trusted local walker. Fast booking. Stress-free walks.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild className="px-6 py-3">
            <Link href="/book">Book First Walk ($5)</Link>
          </Button>
          <Button asChild variant="outline" className="px-5 py-3">
            <a href="tel:+13133167826">Call Now</a>
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 text-sm font-semibold text-bark-700">
          {['Local', 'Reliable', 'Daily availability'].map((badge) => (
            <span key={badge} className="tag">
              {badge}
            </span>
          ))}
        </div>
      </div>
      <div className="relative">
        <div className="section-card overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80"
            alt="Local dog walker on a sunny route"
            width={900}
            height={700}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <div className="absolute -left-6 -top-6 hidden rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-bark-800 shadow-soft sm:block">
          "He knows every shady spot on Oak St." — Neighbor Jenna
        </div>
      </div>
    </section>
  );
}
