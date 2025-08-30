"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import GameCard from '@/components/GameCard';

export default function HomeContent() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        async function fetchGames() {
            try {
                setLoading(true);
                setError(null);

                const category = searchParams.get("category");
                let apiUrl = "/api/games";
                if (category) {
                    apiUrl = `/api/games?category=${encodeURIComponent(category)}`;
                }

                const response = await fetch(apiUrl);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to fetch games");
                }

                const data = await response.json();
                if (Array.isArray(data)) {
                    setGames(data);
                } else if (data && Array.isArray(data.games)) {
                    setGames(data.games);
                } else {
                    console.error("API response is not an array or does not contain a 'games' array:", data);
                    setGames([]);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchGames();
    }, [searchParams]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading games...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <p className="text-center text-sm text-gray-500 mb-4">Rendering Type: Client-side Rendering (CSR)</p>
            <h1 className="text-4xl font-extrabold mb-8 text-center text-purple-400">
                {searchParams.get("category") ? `Games in ${searchParams.get("category")} Category` : 'All Games'}
            </h1>

            {games.length === 0 ? (
                <p className="text-center text-gray-300 text-lg">No games found {searchParams.get("category") ? `for ${searchParams.get("category")}` : ''}. Please try again later.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {games.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            )}
        </div>
    );
}