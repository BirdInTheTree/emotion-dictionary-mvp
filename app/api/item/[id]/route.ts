import { NextResponse } from 'next/server';
import items from '../../../../data/items.json';
import { Item } from '@/lib/types';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);
  const item = (items as Item[]).find(i => i.id === id || i.lemma === id);
  return item ? NextResponse.json(item) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}
