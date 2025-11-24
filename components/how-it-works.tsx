const steps = [
  {
    title: 'Pick your slot',
    description: 'Share your preferred time window and your dog’s pace.',
  },
  {
    title: 'We walk your block',
    description: 'On-foot arrival, no car rides. Leash up and go.',
  },
  {
    title: 'Daily photo update',
    description: 'A quick text with route highlights and water breaks.',
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="section-card p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="tag">How it works</p>
            <h2 className="mt-2 text-2xl font-bold text-bark-800 sm:text-3xl">Simple, predictable steps</h2>
          </div>
          <p className="text-sm font-semibold text-bark-700">Same walker every time</p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {steps.map((step, idx) => (
            <div key={step.title} className="rounded-2xl border border-sand-100 bg-white px-4 py-5 shadow-soft">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand-100 text-bark-800 font-semibold">
                {idx + 1}
              </div>
              <h3 className="mt-3 text-xl font-semibold text-bark-800">{step.title}</h3>
              <p className="mt-2 text-bark-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
