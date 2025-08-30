import { NextResponse } from 'next/server';
import { getWishlistItems, addWishlistItem } from '../../../data/wishlistData';

export async function GET() {
  return NextResponse.json(getWishlistItems());
}

export async function POST(request) {
  const { name } = await request.json();
  const newItem = addWishlistItem(name);
  return NextResponse.json(newItem, { status: 201 });
}