import { redis } from '@/lib/redis';
import { NextRequest, NextResponse } from 'next/server';

// GET: Fetch likes count using a custom key
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');
    const cid = `blogs:likes:${key}`
  
    if (!key) {
      return NextResponse.json({ error: 'Missing key parameter' }, { status: 400 });
    }
  
    const likes = (await redis.get<number>(cid)) || 0;
    return NextResponse.json({ key, likes });
  }
  
  // POST: Update likes count (+1 or -1)
  export async function POST(req: NextRequest) {
    const { key, action } = await req.json();
    const cid = `blogs:likes:${key}`
  
    if (!key || !['increment', 'decrement'].includes(action)) {
      return NextResponse.json({ error: 'Invalid key or action' }, { status: 400 });
    }
  
    const likes = await redis.get<number>(cid) || 0;
    const newLikes = action === 'increment' ? likes + 1 : likes - 1;
  
    await redis.set(cid, newLikes);
  
    return NextResponse.json({ key, likes: newLikes });
  }