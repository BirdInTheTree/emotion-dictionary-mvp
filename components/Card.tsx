'use client';
import { Item } from '@/lib/types';

export default function Card({ item }: { item: Item }) {
  return (
    <article className="card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">{item.lemma}</h2>
        <span className="tag uppercase">{item.pos}</span>
      </div>
      <p className="text-lg leading-relaxed">{item.definition}</p>
      {!!item.examples?.length && (
        <div className="subtle">
          <div className="mb-1">Examples</div>
          <ul className="list-disc ml-5 space-y-1">
            {item.examples.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {item.synonyms?.slice(0,6).map(s => <span key={s} className="tag">{s}</span>)}
        {item.antonyms?.slice(0,6).map(s => <span key={s} className="tag bg-white">{s}</span>)}
      </div>
      <div className="flex flex-wrap gap-1 text-xs">
        {item.affect_tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
      <div className="text-[11px] text-gray-500">Sources: {item.sources.join(', ')} • Attribution in footer</div>
    </article>
  );
}
