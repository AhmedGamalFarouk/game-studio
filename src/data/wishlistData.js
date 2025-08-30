let wishlistItems = [
  { id: 1, name: 'The Witcher 3: Wild Hunt' },
  { id: 2, name: 'Cyberpunk 2077' },
  { id: 3, name: 'Red Dead Redemption 2' },
];

export const getWishlistItems = () => wishlistItems;

export const addWishlistItem = (name) => {
  const newItem = { id: wishlistItems.length > 0 ? Math.max(...wishlistItems.map(item => item.id)) + 1 : 1, name };
  wishlistItems.push(newItem);
  return newItem;
};

export const updateWishlistItem = (id, name) => {
  const itemIndex = wishlistItems.findIndex(item => item.id === parseInt(id));
  if (itemIndex === -1) {
    return null;
  }
  wishlistItems[itemIndex].name = name;
  return wishlistItems[itemIndex];
};

export const deleteWishlistItem = (id) => {
  const initialLength = wishlistItems.length;
  wishlistItems = wishlistItems.filter(item => item.id !== parseInt(id));
  return wishlistItems.length < initialLength;
};