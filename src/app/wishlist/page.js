"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemName, setEditingItemName] = useState('');

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      const response = await fetch('/api/wishlist');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWishlistItems(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newItemName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setNewItemName('');
      fetchWishlistItems(); // Refresh the list
    } catch (e) {
      setError(e.message);
    }
  };

  const handleEditItem = (item) => {
    setEditingItemId(item.id);
    setEditingItemName(item.name);
  };

  const handleUpdateItem = async (id) => {
    if (!editingItemName.trim()) return;

    try {
      const response = await fetch(`/api/wishlist/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editingItemName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setEditingItemId(null);
      setEditingItemName('');
      fetchWishlistItems(); // Refresh the list
    } catch (e) {
      setError(e.message);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await fetch(`/api/wishlist/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchWishlistItems(); // Refresh the list
    } catch (e) {
      setError(e.message);
    }
  };

  if (loading) return <p>Loading wishlist...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-[var(--background-dark)] py-8 text-[var(--foreground-primary)]">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-[var(--accent-color)] glow-text">My Wishlist</h1>

        <form onSubmit={handleAddItem} className="mb-10 flex justify-center gap-2">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Add new wishlist item..."
            className="flex-grow max-w-md p-3 border border-[var(--border-color)] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--glow-color)] bg-[var(--background-light)] text-[var(--foreground-primary)]"
          />
          <button
            type="submit"
            className="bg-[var(--background-light)] text-[var(--accent-color)] px-6 py-3 rounded-lg shadow-md hover:bg-[var(--accent-color)] hover:text-[var(--background-dark)] transition duration-300 ease-in-out transform hover:scale-105 border border-[var(--border-color)] glow-border"
          >
            Add Item
          </button>
        </form>

        {loading && <p className="text-center text-[var(--foreground-secondary)] text-lg">Loading wishlist...</p>}
        {error && <p className="text-center text-red-600 text-lg">Error: {error}</p>}

        {!loading && !error && wishlistItems.length === 0 ? (
          <p className="text-center text-[var(--foreground-secondary)] text-lg">Your wishlist is empty. Add some items!</p>
        ) : (
          <ul className="space-y-4 max-w-2xl mx-auto">
            {wishlistItems.map((item) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between bg-[var(--background-light)] shadow-lg rounded-xl p-5 transition duration-300 ease-in-out transform hover:scale-[1.02] border border-[var(--border-color)]"
              >
                {editingItemId === item.id ? (
                  <input
                    type="text"
                    value={editingItemName}
                    onChange={(e) => setEditingItemName(e.target.value)}
                    onBlur={() => handleUpdateItem(item.id)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleUpdateItem(item.id);
                      }
                    }}
                    className="flex-grow p-3 border border-[var(--border-color)] rounded-md mr-0 sm:mr-4 mb-3 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-[var(--glow-color)] text-lg bg-[var(--background-light)] text-[var(--foreground-primary)]"
                  />
                ) : (
                  <span className="text-xl font-semibold text-[var(--foreground-primary)] flex-grow text-center sm:text-left">
                    {item.name}
                  </span>
                )}
                <div className="flex space-x-3">
                  {editingItemId === item.id ? (
                    <button
                      onClick={() => handleUpdateItem(item.id)}
                      className="bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out border border-green-700"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditItem(item)}
                      className="bg-yellow-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out border border-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="bg-red-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out border border-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}