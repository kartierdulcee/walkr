'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

type FormState = {
  name: string;
  dogName: string;
  timeSlot: string;
  plan: string;
  customTime: string;
  packPreference: string;
  phone: string;
  notes: string;
};

const initialState: FormState = {
  name: '',
  dogName: '',
  timeSlot: '',
  plan: '',
  customTime: '',
  packPreference: '',
  phone: '',
  notes: '',
};

export function BookingForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');

  const handleChange = (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const timeSlots = {
    Morning: ['7:00 – 7:15 AM', '7:15 – 7:30 AM', '7:30 – 7:45 AM', '7:45 – 8:00 AM'],
    Afternoon: ['12:00 – 12:15 PM', '12:15 – 12:30 PM', '12:30 – 12:45 PM', '12:45 – 1:00 PM'],
    Evening: ['4:00 – 4:15 PM', '4:15 – 4:30 PM', '4:30 – 4:45 PM', '4:45 – 5:00 PM'],
  };
  const plans = [
    { value: 'once-daily', label: '$20/week — 1 walk per day' },
    { value: 'twice-daily', label: '$40/week — 2 walks per day' },
    { value: 'custom', label: 'Custom walking time' },
  ];
  const packOptions = [
    { value: 'solo', label: 'Walk alone' },
    { value: 'friendly', label: 'Walk with other friendly dogs (recommended)' },
  ];

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError('');
    if (!form.timeSlot) {
      setFormError('Please pick a walking time block.');
      return;
    }
    if (!form.plan) {
      setFormError('Please choose a weekly plan.');
      return;
    }
    if (!form.packPreference) {
      setFormError('Please choose if your dog walks alone or with others.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage(data?.message ?? 'Booking received.');
      setConfirmed(true);
    } catch (error) {
      console.error('Booking failed', error);
      setMessage('We hit a snag—text or call (313) 316-7826.');
      setConfirmed(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmed) {
    return (
      <div className="section-card p-6 text-center">
        <p className="tag mx-auto w-fit">Booked</p>
        <h3 className="mt-3 text-2xl font-semibold text-bark-800">{message}</h3>
        <p className="mt-2 text-bark-700">
          You will get a quick text to confirm the time. Want to adjust? Call or text (313) 316-7826.
        </p>
        <Button className="mt-5" onClick={() => setConfirmed(false)}>
          Make another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="section-card space-y-5 p-6">
      <div>
        <p className="tag">Booking</p>
        <h3 className="mt-2 text-2xl font-semibold text-bark-800">Tell me about your dog</h3>
        <p className="text-bark-700">Pick your block time and plan. Fast response during daylight hours.</p>
        <p className="mt-2 text-sm font-semibold text-bark-800">Accepted: Zelle, Cash App, Venmo, Cash.</p>
        {formError && <p className="mt-2 text-sm font-semibold text-red-600">{formError}</p>}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-bark-800" htmlFor="name">
          Your name
        </label>
        <Input id="name" required value={form.name} onChange={handleChange('name')} placeholder="Jenna" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-bark-800" htmlFor="dogName">
          Dog&apos;s name
        </label>
        <Input id="dogName" required value={form.dogName} onChange={handleChange('dogName')} placeholder="Milo" />
      </div>
      <div className="space-y-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-bark-800">Available Time Slots</p>
          <p className="text-sm text-bark-700">Choose a time that works best for your schedule.</p>
        </div>
        {Object.entries(timeSlots).map(([label, slots]) => (
          <div key={label} className="space-y-2">
            <p className="text-sm font-semibold text-bark-800">{label}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {slots.map((slot) => (
                <label
                  key={slot}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border bg-white px-3 py-3 text-sm font-semibold text-bark-800 shadow-soft transition ${
                    form.timeSlot === slot ? 'border-bark-800' : 'border-sand-100 hover:border-sand-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="timeSlot"
                    value={slot}
                    checked={form.timeSlot === slot}
                    onChange={handleChange('timeSlot')}
                    className="h-4 w-4 accent-bark-800"
                  />
                  {slot}
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-bark-800" htmlFor="customTime">
            Custom Time Request (Optional)
          </label>
          <Input
            id="customTime"
            value={form.customTime}
            onChange={handleChange('customTime')}
            placeholder="If you need a custom time, enter it here."
          />
          <p className="text-xs text-bark-700">I will text you to confirm availability.</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-bark-800">Pick your weekly plan</p>
        <div className="space-y-2">
          {plans.map((plan) => (
            <label
              key={plan.value}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border bg-white px-3 py-3 text-sm font-semibold text-bark-800 shadow-soft transition ${
                form.plan === plan.value ? 'border-bark-800' : 'border-sand-100 hover:border-sand-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="plan"
                  value={plan.value}
                  checked={form.plan === plan.value}
                  onChange={handleChange('plan')}
                  className="h-4 w-4 accent-bark-800"
                />
                <span>{plan.label}</span>
              </div>
            </label>
          ))}
        </div>
        {form.plan === 'custom' && (
          <div className="space-y-2">
            <label className="text-sm font-semibold text-bark-800" htmlFor="customTime">
              Tell me your custom time or frequency
            </label>
            <Input
              id="customTime"
              value={form.customTime}
              onChange={handleChange('customTime')}
              placeholder="Evenings, weekends, or specific timing"
            />
          </div>
        )}
      </div>
      <div className="space-y-2">
        <p className="text-sm font-semibold text-bark-800">Can your dog walk with others?</p>
        <div className="space-y-2">
          {packOptions.map((opt) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border bg-white px-3 py-3 text-sm font-semibold text-bark-800 shadow-soft transition ${
                form.packPreference === opt.value ? 'border-bark-800' : 'border-sand-100 hover:border-sand-200'
              }`}
            >
              <input
                type="radio"
                name="packPreference"
                value={opt.value}
                checked={form.packPreference === opt.value}
                onChange={handleChange('packPreference')}
                className="h-4 w-4 accent-bark-800"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-bark-800" htmlFor="phone">
          Phone number
        </label>
        <Input
          id="phone"
          required
          inputMode="tel"
          value={form.phone}
          onChange={handleChange('phone')}
          placeholder="(313) 316-7826"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-bark-800" htmlFor="notes">
          Notes
        </label>
        <Textarea
          id="notes"
          rows={4}
          value={form.notes}
          onChange={handleChange('notes')}
          placeholder="Gate code, dog&apos;s pace, favorite route"
          className="leading-relaxed"
        />
        <p className="text-xs font-semibold text-bark-700/80">Add keys, harness type, reactivity, or meetup spot.</p>
      </div>
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? 'Sending...' : 'Book your walk now'}
      </Button>
      <p className="text-center text-sm font-semibold text-bark-800">You’ll receive a confirmation text within 2–3 minutes.</p>
    </form>
  );
}
