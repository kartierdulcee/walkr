'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Home' },
  { href: '/book', label: 'Book' },
  { href: '/about', label: 'About' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-sand-100">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-bark-800">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sand-200 text-bark-800">🐾</span>
          walkr
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-full px-3 py-2 text-sm font-medium text-bark-800 transition hover:bg-sand-100',
                pathname === link.href && 'bg-sand-200',
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild variant="primary" className="hidden text-sm sm:inline-flex">
            <Link href="/book">Book now</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
