export function Footer() {
  return (
    <footer className="border-t border-sand-100 bg-white/80">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-6 text-sm text-bark-700 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-semibold">walkr — Local dog walking made effortless.</p>
          <p className="text-bark-700">Serving Maple & Oak Street blocks, 7 days a week.</p>
        </div>
        <div className="flex flex-col items-start gap-1 sm:items-end">
          <a className="font-semibold text-bark-800" href="tel:+13133167826">
            (313) 316-7826
          </a>
          <p className="text-bark-700">Meet at: 123 Oak St, Springfield</p>
        </div>
      </div>
    </footer>
  );
}
