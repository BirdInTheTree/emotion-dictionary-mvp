import { NextResponse } from 'next/server';
import items from '../../../data/items.json';
import { Item } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').toLowerCase();
  if (!q) return NextResponse.json([]);
  const res = (items as Item[]).filter(i =>
    i.lemma.toLowerCase().includes(q) || i.definition.toLowerCase().includes(q)
  ).slice(0, 20);
  return NextResponse.json(res);
}
