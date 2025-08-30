import { NextResponse } from 'next/server';
import { updateWishlistItem, deleteWishlistItem } from '../../../../data/wishlistData';


export async function PUT(request, { params }) {
  const { id } = params;
  const { name } = await request.json();
  const updatedItem = updateWishlistItem(id, name);

  if (!updatedItem) {
    return NextResponse.json({ message: 'Item not found' }, { status: 404 });
  }

  return NextResponse.json(updatedItem);
}

export async function DELETE(request, { params }) {
  const { id } = params;
  const deleted = deleteWishlistItem(id);

  if (!deleted) {
    return NextResponse.json({ message: 'Item not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Item deleted' }, { status: 200 });
}