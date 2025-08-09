import { NextResponse } from 'next/server';
import pairs from '../../../../data/pairs.json';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const p = (pairs as any[]).find(x => x.id === params.id);
  return p ? NextResponse.json(p) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}
