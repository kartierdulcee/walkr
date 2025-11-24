import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata: Metadata = {
  title: 'walkr | Dog walking made effortless',
  description: 'Local, reliable dog walking with fast booking and daily availability in your neighborhood.',
  keywords: ['dog walking', 'local walker', 'pet care', 'daily walks', 'book dog walker'],
  openGraph: {
    title: 'walkr | Dog walking made effortless',
    description: 'Trusted local walker. Fast booking. Stress-free walks.',
    url: 'https://walkr.example.com',
    siteName: 'walkr',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="min-h-screen bg-transparent antialiased">
        <main className="flex min-h-screen flex-col bg-transparent">
          <div className="flex-1">{children}</div>
        </main>
        <div className="snow-container" aria-hidden="true">
          <div className="snow" />
        </div>
      </body>
    </html>
  );
}
