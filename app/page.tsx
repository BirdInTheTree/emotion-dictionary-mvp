'use client';
import { useEffect, useMemo, useState } from 'react';
import Card from '@/components/Card';
import Filters, { Filters as F } from '@/components/Filters';
import { Item } from '@/lib/types';
import { bumpStreak, getStreak } from '@/lib/streak';

export default function Page() {
  const [item, setItem] = useState<Item | null>(null);
  const [filters, setFilters] = useState<F>({});
  const [loading, setLoading] = useState(false);
  const streak = useMemo(getStreak, []);

  async function fetchRandom(f: F = filters) {
    setLoading(true);
    const qs = new URLSearchParams();
    if (f.tag) qs.set('tag', f.tag);
    if (f.pos) qs.set('pos', f.pos);
    const res = await fetch(`/api/item/random?${qs.toString()}`);
    const data = await res.json();
    setItem(data);
    setLoading(false);
    bumpStreak();
  }

  useEffect(() => { fetchRandom(); }, []);
  useEffect(() => { fetchRandom(filters); }, [filters]);

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <Filters onChange={setFilters} />
        <div className="card px-4 py-3 text-sm">Streak: <b>{streak.days}</b> days</div>
      </div>
      {item && <Card item={item} />}
      <div className="flex gap-3">
        <button className="btn" onClick={() => fetchRandom()} disabled={loading}>
          {loading ? 'Loading…' : 'Show another'}
        </button>
        <input
          placeholder="Search…"
          className="input"
          onKeyDown={async (e) => {
            if (e.key === 'Enter') {
              const q = (e.target as HTMLInputElement).value.trim();
              if (!q) return;
              const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
              const arr = await res.json();
              if (arr?.length) setItem(arr[0]);
            }
          }}
        />
      </div>
      <section id="pairs" className="pt-6">
        <div className="subtle mb-2">Difference pairs (20)</div>
        <a className="btn-ghost" href="/api/pairs" target="_blank" rel="noreferrer">View JSON</a>
      </section>
    </main>
  );
}
