'use client';
import { useRef, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import type { Pair } from '@/lib/types';

type Size = 'square' | 'portrait';
const SIZES: Record<Size, { w: number; h: number }> = {
  square: { w: 1080, h: 1080 },
  portrait: { w: 1080, h: 1350 },
};

export default function ShareCard({ p }: { p: Pair }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>('portrait');
  const [cta, setCta] = useState('Learn 20 more pairs at emotion-dictionary-mvp.vercel.app');

  async function download() {
    if (!ref.current) return;
    const dataUrl = await htmlToImage.toPng(ref.current, { cacheBust: true, pixelRatio: 2 });
    const link = document.createElement('a');
    link.download = `${p.left}-vs-${p.right}-${size}.png`;
    link.href = dataUrl;
    link.click();
  }

  const box = SIZES[size];

  return (
    <div className="space-y-3">
      <div className="card p-4 flex flex-wrap gap-3 items-center">
        <label className="text-sm text-gray-600">Format</label>
        <select className="input w-auto" value={size} onChange={e => setSize(e.target.value as Size)}>
          <option value="portrait">1080×1350 (portrait)</option>
          <option value="square">1080×1080 (square)</option>
        </select>
        <input
          className="input flex-1"
          placeholder="CTA footer"
          value={cta}
          onChange={e => setCta(e.target.value)}
        />
        <button className="btn" onClick={download}>Download PNG</button>
      </div>

      <div
        ref={ref}
        style={{ width: box.w, height: box.h }}
        className="bg-white text-ink rounded-2xl border border-border shadow-soft p-16 flex flex-col justify-between"
      >
        <div className="text-sm text-gray-500">Emotion Dictionary</div>

        <div className="space-y-6">
          <div className="font-semibold tracking-tight" style={{ fontSize: 72 }}>
            {p.left} <span className="text-gray-400">vs</span> {p.right}
          </div>
          <div className="leading-snug" style={{ fontSize: 36 }}>{p.rule}</div>

          {p.script?.length ? (
            <ul className="text-gray-600 list-disc pl-8 space-y-2" style={{ fontSize: 28 }}>
              {p.script.slice(0, 3).map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          ) : null}
        </div>

        <div className="text-gray-500" style={{ fontSize: 22 }}>
          {cta}
        </div>
      </div>
    </div>
  );
}
