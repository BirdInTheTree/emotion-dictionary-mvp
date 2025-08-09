import { NextResponse } from 'next/server';
import items from '../../../../data/items.json';
import { Item } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');
  const pos = searchParams.get('pos');
  let pool = (items as Item[]);
  if (tag) pool = pool.filter(i => i.affect_tags.includes(tag));
  if (pos) pool = pool.filter(i => i.pos === pos);
  if (!pool.length) return NextResponse.json({ error: 'No items' }, { status: 404 });
  const pick = pool[Math.floor(Math.random() * pool.length)];
  return NextResponse.json(pick);
}
