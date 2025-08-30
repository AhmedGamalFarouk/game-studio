import Image from 'next/image';
import Link from 'next/link';

const genreColors = {
  'shooter': { text: 'text-red-400', bg: 'bg-red-900' },
  'action': { text: 'text-blue-400', bg: 'bg-blue-900' },
  'racing': { text: 'text-green-400', bg: 'bg-green-900' },
  'sports': { text: 'text-yellow-400', bg: 'bg-yellow-900' },
  'strategy': { text: 'text-indigo-400', bg: 'bg-indigo-900' },
  'rpg': { text: 'text-pink-400', bg: 'bg-pink-900' },
  'mmo': { text: 'text-teal-400', bg: 'bg-teal-900' },
  'fighting': { text: 'text-orange-400', bg: 'bg-orange-900' },
  'adventure': { text: 'text-lime-400', bg: 'bg-lime-900' },
  'puzzle': { text: 'text-cyan-400', bg: 'bg-cyan-900' },
  'default': { text: 'text-purple-400', bg: 'bg-purple-900' }, // Default color
};

export default function GameCard({ game }) {
  if (!game) {
    return null;
  }

  const genre = game.genre ? game.genre.toLowerCase() : 'default';
  const colors = genreColors[genre] || genreColors.default;

  return (
    <Link href={`/games/${game.id}`} className="block">
      <div className="bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
        <div className="relative w-full h-48">
          <Image
            src={game.thumbnail}
            alt={game.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-xl font-semibold text-white mb-2 truncate">{game.title}</h2>
          <p className="text-sm text-gray-300 mb-2 flex-grow">{game.short_description}</p>
          <div className="flex justify-between items-center mt-auto">
            <span className={`text-xs font-medium ${colors.text} ${colors.bg} px-2 py-1 rounded-full capitalize`}>
              {game.genre}
            </span>
            {game.platform && (
              <span className="text-xs text-gray-400">
                {game.platform.includes('PC (Windows)') ? 'PC' : game.platform}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
