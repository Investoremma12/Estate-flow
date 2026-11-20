export const propertyFilterSections = [
	{
		title: 'Listing Type',
		options: ['For Sale', 'For Rent'],
	},
	{
		title: 'Property Type',
		options: ['House', 'Apartment', 'Villa', 'Land'],
	},
	{
		title: 'Price Range',
		options: [
			'Under $300,000',
			'$300,000 - $500,000',
			'$500,000 - $1,000,000',
			'$1,000,000+',
		],
	},
	{
		title: 'Bedrooms',
		options: ['Any', '1+', '2+', '3+', '4+'],
	},
];

export const propertyTypes = ['House', 'Apartment', 'Villa'] as const;

export const propertyPriceRanges = [
	'Under $300k',
	'$300k - $600k',
	'Over $600k',
] as const;

export const propertySortOptions = [
	'Recommended First',
	'Lowest Price First',
	'Highest Price First',
] as const;

export const propertiesPerPage = 12;
