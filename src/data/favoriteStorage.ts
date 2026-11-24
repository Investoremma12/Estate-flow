import { initialFavoritePropertyIds } from './favoritePageData';

const FAVORITES_STORAGE_KEY = 'estateflow.favorites';

function isFavoriteIdList(value: unknown): value is number[] {
	return (
		Array.isArray(value) &&
		value.every((id) => typeof id === 'number' && Number.isInteger(id) && id > 0)
	);
}

export function getFavoritePropertyIds(): number[] {
	const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
	if (storedFavorites === null) return [...initialFavoritePropertyIds];

	const parsedFavorites: unknown = JSON.parse(storedFavorites);
	if (!isFavoriteIdList(parsedFavorites)) {
		throw new Error('Saved favorites are invalid. Please clear the favorites data and try again.');
	}

	return [...new Set(parsedFavorites)];
}

function saveFavoritePropertyIds(propertyIds: number[]): number[] {
	const uniqueIds = [...new Set(propertyIds)];
	localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(uniqueIds));
	return uniqueIds;
}

export function toggleFavoriteProperty(propertyId: number): number[] {
	const favoriteIds = getFavoritePropertyIds();
	const nextIds = favoriteIds.includes(propertyId)
		? favoriteIds.filter((id) => id !== propertyId)
		: [...favoriteIds, propertyId];

	return saveFavoritePropertyIds(nextIds);
}

export function removeFavoriteProperty(propertyId: number): number[] {
	const favoriteIds = getFavoritePropertyIds();
	return saveFavoritePropertyIds(favoriteIds.filter((id) => id !== propertyId));
}
