'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function GameDetails() {
    const { gameId } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (gameId) {
            const fetchGame = async () => {
                try {
                    const response = await fetch(`/api/games?id=${gameId}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setGame(data);
                } catch (e) {
                    setError(e.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchGame();
        }
    }, [gameId]);

    if (loading) {
        return <div>Loading game details...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!game) {
        return <div>Game not found.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <p className="text-center text-sm text-gray-500 mb-4">Rendering Type: Client-side Rendering (CSR)</p>
            <h1 className="text-4xl font-bold mb-4">{game.title}</h1>
            <img src={game.thumbnail} alt={game.title} className="w-full h-64 object-cover rounded-lg mb-4" />
            <p className="text-lg mb-2"><strong>Genre:</strong> {game.genre}</p>
            <p className="text-lg mb-2"><strong>Platform:</strong> {game.platform}</p>
            <p className="text-lg mb-2"><strong>Publisher:</strong> {game.publisher}</p>
            <p className="text-lg mb-2"><strong>Developer:</strong> {game.developer}</p>
            <p className="text-lg mb-2"><strong>Release Date:</strong> {game.release_date}</p>
            <p className="text-lg mb-4"><strong>Rating:</strong> {game.rating}%</p>
            <p className="text-base">{game.short_description}</p>
            <a href={game.game_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-4 inline-block">
                Play Now
            </a>
        </div>
    );
}
