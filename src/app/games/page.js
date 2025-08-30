import GameCard from '@/components/GameCard'; 
import { Suspense } from 'react';

async function getGames(category) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/games`;
  if (category) {
    url += `?category=${encodeURIComponent(category)}`;
  }
  try {
    const res = await fetch(url, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Failed to fetch games: ${res.status} ${res.statusText}`);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
}

export default async function GamesPage({ searchParams }) {
  const category = searchParams.category;
  const games = await getGames(category);

  return (
    <div className="container mx-auto p-4">
      <p className="text-center text-sm text-gray-500 mb-4">Rendering Type: Client-side Rendering (CSR)</p>
      <h1 className="text-4xl font-extrabold mb-8 text-center text-purple-400">
        {category ? `Games in ${category} Category` : 'All Games'}
      </h1>

      {games.length === 0 ? (
        <p className="text-center text-gray-300 text-lg">No games found {category ? `for ${category}` : ''}. Please try again later.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Suspense fallback={<div>Loading games...</div>}>
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </Suspense>
        </div>
      )}
    </div>
  );
}
