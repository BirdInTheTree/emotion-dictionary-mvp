import { NextResponse } from 'next/server';
import pairs from '../../../data/pairs.json';
export async function GET() { return NextResponse.json(pairs); }
