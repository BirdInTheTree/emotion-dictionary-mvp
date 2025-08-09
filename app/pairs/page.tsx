'use client';
import { useEffect, useState } from 'react';
import type { Pair } from '@/lib/types';

function PairCard({ p }: { p: Pair }) {
  return (
    <article className="card p-5 space-y-2">
      <div className="text-sm text-gray-500">{p.left} vs {p.right}</div>
      <h2 className="text-xl font-semibold tracking-tight">{p.left} vs {p.right}</h2>
      <p className="leading-relaxed">{p.rule}</p>
      {p.script?.length ? (
        <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
          {p.script.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      ) : null}
      <div className="flex gap-2">
        <button
          className="btn-ghost"
          onClick={() => navigator.clipboard.writeText(`${p.left} vs ${p.right} — ${p.rule}`)}
          title="Copy rule"
        >
          Copy rule
        </button>
        <a className="btn-ghost" href={`/api/pairs/${p.id}`} target="_blank" rel="noreferrer">JSON</a>
      </div>
    </article>
  );
}

export default function PairsPage() {
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    fetch('/api/pairs').then(r => r.json()).then(setPairs);
  }, []);

  const filtered = pairs.filter(p => {
    const t = `${p.left} ${p.right} ${p.rule}`.toLowerCase();
    return t.includes(q.toLowerCase());
  });

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="h1">Difference pairs</h1>
        <a className="btn-ghost" href="/">Back to Free</a>
      </div>

      <div className="card p-4">
        <input
          className="input"
          placeholder="Search pairs… (e.g., fear, envy)"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {filtered.map(p => <PairCard key={p.id} p={p} />)}
      </div>
    </main>
  );
}
