export function WhyLocal() {
  const reasons = [
    {
      title: 'Knows every route',
      copy: 'Shade, quiet blocks, and grassy spots your pup prefers.',
    },
    {
      title: 'Fast response',
      copy: 'I’m 4 minutes away. Short-notice walks are doable.',
    },
    {
      title: 'Consistent care',
      copy: 'Same leash, same pace. No random app matchups.',
    },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 pb-14 sm:px-6">
      <div className="section-card grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
        <div>
          <p className="tag">Why local walking</p>
          <h2 className="mt-2 text-2xl font-bold text-bark-800 sm:text-3xl">Better than the big apps</h2>
          <p className="mt-2 text-bark-700">
            Direct contact, predictable pricing, and one walker who knows your dog. No surge fees, no surprises.
          </p>
        </div>
        <div className="space-y-4">
          {reasons.map((reason) => (
            <div key={reason.title} className="rounded-2xl border border-sand-100 bg-white px-4 py-4 shadow-soft">
              <h3 className="text-lg font-semibold text-bark-800">{reason.title}</h3>
              <p className="text-bark-700">{reason.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
