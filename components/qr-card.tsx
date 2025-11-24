'use client';

import QRCode from 'react-qr-code';

export function QrCard() {
  const link = typeof window !== 'undefined' ? `${window.location.origin}/book` : '/book';

  return (
    <div className="section-card p-5">
      <p className="tag">Scan to book</p>
      <h3 className="mt-2 text-xl font-semibold text-bark-800">Share with a neighbor</h3>
      <p className="text-bark-700">QR code links straight to the booking form.</p>
      <div className="mt-4 inline-block rounded-2xl bg-white p-3 shadow-soft">
        <QRCode value={link} bgColor="#ffffff" fgColor="#4f2f16" size={140} style={{ height: 'auto', maxWidth: '100%', width: '100%' }} />
      </div>
    </div>
  );
}
