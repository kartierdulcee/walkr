import Image from 'next/image';

export const metadata = {
  title: 'About | walkr',
  description: 'Meet your local dog walker and learn why a neighbor-led service beats the apps.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="section-card grid gap-6 p-6 sm:grid-cols-[1fr_1.2fr] sm:p-8">
        <div className="relative h-64 w-full overflow-hidden rounded-2xl sm:h-full">
          <Image
            src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80"
            alt="Your local dog walker"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 40vw"
          />
        </div>
        <div className="space-y-3 text-bark-800">
          <p className="tag">About</p>
          <h1 className="text-3xl font-bold">Hi, I’m Sam from Oak St.</h1>
          <p className="text-bark-700">
            I live on Oak St between Maple and Birch. I walk the same shaded routes every day with pups from the block. I
            keep keys securely and always text before arrival.
          </p>
          <p className="text-bark-700">
            I started walkr to keep things human: one walker, predictable times, and fast responses. No app matching, no
            strangers. Just a neighbor who knows your dog.
          </p>
          <div className="rounded-2xl bg-sand-100 px-4 py-3 font-semibold text-bark-800">
            Routes: Oak St loop, Maple playground path, and the creek trail on cool days.
          </div>
          <div className="flex flex-wrap gap-2 text-sm font-semibold text-bark-800">
            <span className="tag">Fully insured</span>
            <span className="tag">Daily availability</span>
            <span className="tag">Rain-ready gear</span>
          </div>
        </div>
      </div>
    </div>
  );
}
