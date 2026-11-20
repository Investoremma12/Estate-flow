export const agentSortOptions = [
	{ value: 'popular', label: 'Most Popular' },
	{ value: 'rating', label: 'Highest Rated' },
	{ value: 'sales', label: 'Most Sales' },
	{ value: 'experience', label: 'Most Experience' },
] as const;

export type AgentSortOption = (typeof agentSortOptions)[number]['value'];

export const agentsPerPage = 6;

export const agentBenefits = [
	'Local market knowledge',
	'Specialists across property types',
	'Experience backed by client reviews',
];
