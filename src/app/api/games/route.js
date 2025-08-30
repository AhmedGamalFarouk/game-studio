export async function GET(request) {
    const { searchParams, pathname } = new URL(request.url);
    const BASE_URL = 'https://www.freetogame.com/api';
    let apiUrl = `${BASE_URL}/games`;

    const id = searchParams.get('id');
    const platform = searchParams.get('platform');
    const category = searchParams.get('category');
    const sortBy = searchParams.get('sort-by');
    const tag = searchParams.get('tag');

    if (id) {
        apiUrl = `${BASE_URL}/game?id=${id}`;
    } else if (tag) {
        apiUrl = `${BASE_URL}/filter?tag=${tag}`;
        if (platform) {
            apiUrl += `&platform=${platform}`;
        }
        if (sortBy) {
            apiUrl += `&sort-by=${sortBy}`;
        }
    } else {
        const queryParts = [];
        if (platform) {
            queryParts.push(`platform=${platform}`);
        } else {
            // Default to PC platform if no platform is specified
            queryParts.push(`platform=pc`);
        }
        if (category) {
            queryParts.push(`category=${category}`);
        }
        if (sortBy) {
            queryParts.push(`sort-by=${sortBy}`);
        } else {
            // Default to sorting by release-date if no sort-by is specified
            queryParts.push(`sort-by=release-date`);
        }

        if (queryParts.length > 0) {
            apiUrl += `?${queryParts.join('&')}`;
        }
    }

    try {
        const response = await fetch(apiUrl);

        const contentType = response.headers.get('content-type');

        const responseText = await response.text();

        if (!response.ok) {
            console.error(`API responded with non-OK status ${response.status}. Response text: ${responseText}`);
            throw new Error(`API responded with status ${response.status}: ${responseText}`);
        }

        if (!contentType || !contentType.includes('application/json')) {
            console.error(`Expected JSON response, but received ${contentType || 'no content type'}. Raw response: ${responseText}`);
            throw new Error(`Expected JSON response, but received ${contentType || 'no content type'}. Response: ${responseText}`);
        }

        if (!responseText) {
            throw new Error("API returned an empty response body.");
        }

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (jsonError) {
            console.error(`Failed to parse JSON from response: ${responseText}`, jsonError);
            throw new Error(`Failed to parse JSON from API response. Original error: ${jsonError.message}. Raw response: ${responseText.substring(0, 200)}...`);
        }

        // Function to generate a random rating between 70 and 99
        const generateRandomRating = () => Math.floor(Math.random() * (99 - 70 + 1)) + 70;

        let gamesWithRatings;
        if (Array.isArray(result)) {
            gamesWithRatings = result.map(game => ({
                ...game,
                rating: generateRandomRating(),
            }));
        } else if (result && typeof result === 'object' && id) {
            // If fetching a single game by ID, add rating to that game
            gamesWithRatings = {
                ...result,
                rating: generateRandomRating(),
            };
        } else {
            gamesWithRatings = result; // If not an array or single game, return as is
        }

        return new Response(JSON.stringify(gamesWithRatings), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error in GET function:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
