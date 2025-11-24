'use client';

import { FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type Props = {
  onAdded?: () => void;
};

const timeSlots = [
  '7:00 – 7:15 AM',
  '7:15 – 7:30 AM',
  '7:30 – 7:45 AM',
  '7:45 – 8:00 AM',
  '12:00 – 12:15 PM',
  '12:15 – 12:30 PM',
  '12:30 – 12:45 PM',
  '12:45 – 1:00 PM',
  '4:00 – 4:15 PM',
  '4:15 – 4:30 PM',
  '4:30 – 4:45 PM',
  '4:45 – 5:00 PM',
];
const plans = [
  { value: 'once-daily', label: '$20/week — 1 walk per day' },
  { value: 'twice-daily', label: '$40/week — 2 walks per day' },
  { value: 'custom', label: 'Custom walking time' },
];
const packOptions = [
  { value: 'solo', label: 'Walk alone' },
  { value: 'friendly', label: 'Walk with other friendly dogs' },
];

export function AddBookingForm({ onAdded }: Props) {
  const [name, setName] = useState('');
  const [dogName, setDogName] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [plan, setPlan] = useState('');
  const [customTime, setCustomTime] = useState('');
  const [packPreference, setPackPreference] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!name || !plan || !packPreference) {
      setError('Name, plan, and walk setting are required.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, dogName, timeSlot, plan, customTime, phone, notes, packPreference }),
      });
      if (!res.ok) throw new Error('Failed to add booking');
      setName('');
      setDogName('');
      setTimeSlot('');
      setPlan('');
      setCustomTime('');
      setPackPreference('');
      setPhone('');
      setNotes('');
      onAdded?.();
    } catch (err) {
      setError('Could not add booking. Try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-sand-100 bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-bark-800">Add client manually</p>
        {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Input placeholder="Client name *" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input placeholder="Dog name" value={dogName} onChange={(e) => setDogName(e.target.value)} />
        <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Input placeholder="Time block (pick below)" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} />
        <select
          className="rounded-xl border border-sand-200 px-3 py-2 text-sm font-semibold text-bark-800"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          required
        >
          <option value="">Select plan *</option>
          {plans.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        {plan === 'custom' && (
          <Input placeholder="Custom timing details" value={customTime} onChange={(e) => setCustomTime(e.target.value)} />
        )}
        <select
          className="rounded-xl border border-sand-200 px-3 py-2 text-sm font-semibold text-bark-800"
          value={packPreference}
          onChange={(e) => setPackPreference(e.target.value)}
          required
        >
          <option value="">Walk setting *</option>
          {packOptions.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            type="button"
            onClick={() => setTimeSlot(slot)}
            className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
              timeSlot === slot ? 'border-bark-800 text-bark-800' : 'border-sand-200 text-bark-700 hover:border-sand-300'
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
      <Textarea
        placeholder="Notes"
        rows={2}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="text-sm"
      />
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? 'Adding...' : 'Add client'}
      </Button>
    </form>
  );
}
