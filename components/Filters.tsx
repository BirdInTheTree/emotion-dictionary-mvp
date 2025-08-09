'use client';
import { useState } from 'react';
export type Filters = { tag?: string; pos?: string };

export default function Filters({ onChange }: { onChange: (f: Filters)=>void }) {
  const [tag, setTag] = useState('');
  const [pos, setPos] = useState('');
  return (
    <div className="card p-4 flex flex-wrap gap-4 items-end">
      <div>
        <label className="block text-sm mb-1 text-gray-600">Affect tag</label>
        <select value={tag} onChange={e=>{setTag(e.target.value); onChange({ tag: e.target.value || undefined, pos });}} className="input">
          <option value="">any</option>
          <option value="joy">joy</option>
          <option value="sadness">sadness</option>
          <option value="anger">anger</option>
          <option value="fear">fear</option>
          <option value="disgust">disgust</option>
          <option value="surprise">surprise</option>
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1 text-gray-600">Part of speech</label>
        <select value={pos} onChange={e=>{setPos(e.target.value); onChange({ tag: tag || undefined, pos: e.target.value || undefined });}} className="input">
          <option value="">any</option>
          <option value="noun">noun</option>
          <option value="verb">verb</option>
          <option value="adj">adjective</option>
          <option value="adv">adverb</option>
        </select>
      </div>
    </div>
  );
}
