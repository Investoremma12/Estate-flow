import {
	Handshake,
	Headset,
	House,
	MapPin,
	ShieldCheck,
	Smile,
	Users,
	Zap,
} from 'lucide-react';
import agentsData from './agentsData';
import Property from './Property';

export const aboutBenefits = [
	{ label: 'Trusted & Verified Listings', icon: ShieldCheck },
	{ label: 'Fast & Easy Property Search', icon: Zap },
	{ label: 'Dedicated Support', icon: Headset },
	{ label: 'A Commitment to Your Satisfaction', icon: Handshake },
];

const averageSatisfaction = Math.round(
	agentsData.reduce((total, agent) => total + agent.clientSatisfaction, 0) /
		agentsData.length,
);
const citiesCovered = new Set(
	agentsData.map((agent) => agent.location.split(',')[0]),
).size;

export const aboutImpactStats = [
	{ value: `${Property.length}+`, label: 'Properties Listed', icon: House },
	{ value: `${agentsData.length}+`, label: 'Expert Agents', icon: Users },
	{
		value: `${averageSatisfaction}%`,
		label: 'Client Satisfaction',
		icon: Smile,
	},
	{ value: `${citiesCovered}+`, label: 'Cities Covered', icon: MapPin },
];
