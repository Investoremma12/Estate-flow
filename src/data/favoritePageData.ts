export const initialFavoritePropertyIds = [1, 2, 3];

export const favoriteSortOptions = [
	{ value: 'newest', label: 'Newest First' },
	{ value: 'price-low', label: 'Price: Low to High' },
	{ value: 'price-high', label: 'Price: High to Low' },
] as const;

export type FavoriteSortOption =
	(typeof favoriteSortOptions)[number]['value'];
