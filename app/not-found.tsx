import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="tag">404</p>
      <h1 className="mt-3 text-3xl font-bold text-bark-800">That page took the long way.</h1>
      <p className="mt-2 text-bark-700">Let’s get you back to booking a walk on your block.</p>
      <div className="mt-5 flex gap-3">
        <Button asChild>
          <Link href="/">Return home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/book">Book a walk</Link>
        </Button>
      </div>
    </div>
  );
}
