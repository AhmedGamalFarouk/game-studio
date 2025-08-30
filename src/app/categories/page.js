import Link from 'next/link';

export const dynamic = 'force-dynamic'; // Ensure Server-side Rendering (SSR)

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/games`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Failed to fetch games: ${res.status} ${res.statusText}`);
      return [];
    }

    const games = await res.json();
    const categories = [...new Set(games.map((game) => game.genre))].filter(Boolean); // Filter out any null/undefined genres
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto p-4">
      <p className="text-center text-sm text-gray-500 mb-4">Rendering Type: Server-side Rendering (SSR)</p>
      <h1 className="text-4xl font-extrabold mb-8 text-center text-purple-400">Explore Game Categories</h1>

      {categories.length === 0 ? (
        <p className="text-center text-gray-300 text-lg">No categories found. Please try again later.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category} href={`/games?category=${encodeURIComponent(category)}`} className="block">
              <div className="bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white capitalize">{category}</h2>
                  <p className="text-gray-300 mt-2">Discover games in the {category} genre.</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
