const plans = [
  {
    name: 'Week Starter',
    price: '$25',
    detail: '3 neighborhood walks',
    perks: ['Same walker', 'Water + treats', 'Text updates'],
  },
  {
    name: 'Daily Routine',
    price: '$45',
    detail: '5 weekday walks',
    perks: ['Route tracking', 'Key exchange optional', 'Rain-ready'],
  },
  {
    name: 'Double-Play',
    price: '$60',
    detail: '10 shorter walks',
    perks: ['Puppy-friendly', 'Split AM/PM', 'Paw wipe on return'],
  },
];

export function WeeklyPlans() {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="tag">Weekly plans</p>
          <h2 className="mt-2 text-2xl font-bold text-bark-800 sm:text-3xl">Pick a rhythm that fits</h2>
        </div>
        <p className="text-sm font-semibold text-bark-700">Pause or swap slots anytime</p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className="section-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-bark-800">{plan.name}</h3>
              <span className="rounded-full bg-sand-200 px-3 py-1 text-sm font-semibold text-bark-800">
                {plan.price}
              </span>
            </div>
            <p className="mt-2 text-bark-700">{plan.detail}</p>
            <ul className="mt-4 space-y-2 text-bark-700">
              {plan.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-bark-700" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
