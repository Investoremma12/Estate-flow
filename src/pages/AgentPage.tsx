import {
	Building2,
	CheckCircle2,
	ChevronLeft,
	ChevronRight,
	MapPin,
	Search,
	Star,
	Users,
	X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../components/ui/Button';
import AgentCard from '../components/agentpage/AgentCard';
import SectionHeading from '../components/ui/SectionHeading';
import agentsData from '../data/agentsData';
import {
	agentBenefits,
	agentSortOptions,
	agentsPerPage,
	type AgentSortOption,
} from '../data/agentPageData';
import HeroBackground from '../assets/images/house9.jpg';
import Navbar from '../layout/Navbar';

type Agent = (typeof agentsData)[number];

interface AgentProfileDialogProps {
	agent: Agent;
	onClose: () => void;
}

function AgentProfileDialog({ agent, onClose }: AgentProfileDialogProps) {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose();
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [onClose]);

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
			onClick={(event) => {
				if (event.target === event.currentTarget) onClose();
			}}
		>
			<section
				role="dialog"
				aria-modal="true"
				aria-labelledby="agent-profile-title"
				className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
			>
				<div className="flex items-start justify-between gap-4">
					<div className="flex min-w-0 items-center gap-4">
						<img
							src={agent.image}
							alt={agent.name}
							className="h-20 w-20 shrink-0 rounded-xl object-cover"
						/>
						<div className="min-w-0">
							<h2
								id="agent-profile-title"
								className="truncate text-xl font-bold text-slate-900"
							>
								{agent.name}
							</h2>
							<p className="mt-1 text-sm text-slate-600">{agent.role}</p>
							<p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
								<MapPin
									className="h-3.5 w-3.5 text-[#087A5B]"
									aria-hidden="true"
								/>
								{agent.location}
							</p>
						</div>
					</div>
					<button
						type="button"
						onClick={onClose}
						aria-label="Close agent profile"
						className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
					>
						<X className="h-5 w-5" aria-hidden="true" />
					</button>
				</div>

				<div className="mt-5 flex items-center gap-1 text-sm text-slate-600">
					<Star
						className="h-4 w-4 fill-amber-400 text-amber-400"
						aria-hidden="true"
					/>
					<span className="font-semibold text-slate-800">{agent.rating}</span>
					<span>({agent.reviews} reviews)</span>
				</div>

				<p className="mt-4 text-sm leading-6 text-slate-600">{agent.about}</p>

				<dl className="mt-5 grid grid-cols-3 gap-3 rounded-xl bg-slate-50 p-4 text-center">
					<div>
						<dt className="text-xs text-slate-500">Experience</dt>
						<dd className="mt-1 font-semibold text-slate-900">
							{agent.yearsExperience} years
						</dd>
					</div>
					<div>
						<dt className="text-xs text-slate-500">Properties sold</dt>
						<dd className="mt-1 font-semibold text-slate-900">
							{agent.propertiesSold}+
						</dd>
					</div>
					<div>
						<dt className="text-xs text-slate-500">Client satisfaction</dt>
						<dd className="mt-1 font-semibold text-slate-900">
							{agent.clientSatisfaction}%
						</dd>
					</div>
				</dl>

				<div className="mt-5 grid gap-5 sm:grid-cols-2">
					<div>
						<h3 className="text-sm font-semibold text-slate-900">
							Specialties
						</h3>
						<div className="mt-2 flex flex-wrap gap-2">
							{agent.specialties.map((specialty) => (
								<span
									key={specialty}
									className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-800"
								>
									{specialty}
								</span>
							))}
						</div>
					</div>
					<div>
						<h3 className="text-sm font-semibold text-slate-900">
							Service areas
						</h3>
						<p className="mt-2 text-sm leading-6 text-slate-600">
							{agent.serviceAreas.join(', ')}
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}

export default function AgentPage() {
	const [searchQuery, setSearchQuery] = useState('');
	const [sortOption, setSortOption] = useState<AgentSortOption>('popular');
	const [currentPage, setCurrentPage] = useState(1);
	const [activeAgentId, setActiveAgentId] = useState<number | null>(null);
	const query = searchQuery.trim().toLowerCase();

	const filteredAgents = agentsData.filter((agent) =>
		[
			agent.name,
			agent.role,
			agent.location,
			...agent.specialties,
			...agent.serviceAreas,
		]
			.join(' ')
			.toLowerCase()
			.includes(query),
	);
	const sortedAgents = [...filteredAgents];

	if (sortOption === 'rating') {
		sortedAgents.sort(
			(first, second) =>
				second.rating - first.rating || second.reviews - first.reviews,
		);
	} else if (sortOption === 'sales') {
		sortedAgents.sort(
			(first, second) => second.propertiesSold - first.propertiesSold,
		);
	} else if (sortOption === 'experience') {
		sortedAgents.sort(
			(first, second) => second.yearsExperience - first.yearsExperience,
		);
	}

	const totalPages = Math.ceil(sortedAgents.length / agentsPerPage);
	const visibleAgents = sortedAgents.slice(
		(currentPage - 1) * agentsPerPage,
		currentPage * agentsPerPage,
	);
	const featuredAgentId = agentsData.reduce(
		(topAgent, agent) =>
			agent.propertiesSold > topAgent.propertiesSold ? agent : topAgent,
		agentsData[0],
	)?.id;
	const activeAgent = agentsData.find((agent) => agent.id === activeAgentId);
	const averageRating = (
		agentsData.reduce((total, agent) => total + agent.rating, 0) /
		agentsData.length
	).toFixed(1);
	const totalSales = agentsData.reduce(
		(total, agent) => total + agent.propertiesSold,
		0,
	);

	return (
		<>
			<Navbar />
			<section
				className="relative isolate overflow-hidden bg-cover bg-center"
				style={{ backgroundImage: `url(${HeroBackground})` }}
			>
				<div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/80 via-slate-950/55 to-slate-950/10" />

				<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
					<div className="max-w-2xl">
						<SectionHeading
							title="Our professionals"
							className="mb-1 text-[10px] tracking-[0.18em]"
						/>
						<h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
							Meet Our Expert Agents
						</h1>
						<p className="mt-2 max-w-xl text-sm leading-6 text-slate-700">
							Work with trusted real estate professionals who can help you find
							the right property.
						</p>
					</div>

					<form
						onSubmit={(event) => event.preventDefault()}
						className="mt-5 flex max-w-5xl flex-col gap-2 rounded-xl bg-white p-2 shadow-lg sm:flex-row"
					>
						<label className="flex min-h-11 min-w-0 flex-1 items-center gap-3 rounded-lg px-3 text-slate-400">
							<Search className="h-4 w-4 shrink-0" aria-hidden="true" />
							<input
								type="search"
								value={searchQuery}
								onChange={(event) => {
									setSearchQuery(event.target.value);
									setCurrentPage(1);
								}}
								placeholder="Search agents by name, location or specialty..."
								aria-label="Search agents by name, location or specialty"
								className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
							/>
						</label>
						<Button type="submit" className="min-h-11 gap-2 px-6 text-white">
							<Search className="h-4 w-4" aria-hidden="true" />
							Search
						</Button>
					</form>
				</div>
			</section>

			<main className="min-h-screen bg-[#f8faf9] px-4 py-5 font-poppins sm:px-6 lg:px-8">
				<div className="mx-auto grid max-w-7xl items-start gap-6 lg:grid-cols-[minmax(0,1fr)_238px]">
					<section>
						<div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
							<h2 className="text-xl font-bold text-slate-900">
								Our Agents ({filteredAgents.length})
							</h2>
							<label className="flex items-center gap-2 text-xs text-slate-600">
								Sort by:
								<select
									value={sortOption}
									onChange={(event) => {
										setSortOption(event.target.value as AgentSortOption);
										setCurrentPage(1);
									}}
									className="min-h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-600"
								>
									{agentSortOptions.map(({ value, label }) => (
										<option key={value} value={value}>
											{label}
										</option>
									))}
								</select>
							</label>
						</div>

						{visibleAgents.length > 0 ? (
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
								{visibleAgents.map((agent) => (
									<AgentCard
										key={agent.id}
										agent={agent}
										isFeatured={agent.id === featuredAgentId}
										onViewProfile={setActiveAgentId}
									/>
								))}
							</div>
						) : (
							<div className="rounded-xl border border-slate-200 bg-white px-5 py-12 text-center">
								<p className="font-semibold text-slate-800">No agents found</p>
								<p className="mt-1 text-sm text-slate-500">
									Try a different name, location, or specialty.
								</p>
							</div>
						)}

						{totalPages > 1 && (
							<nav
								aria-label="Agent pages"
								className="mt-6 flex items-center justify-center gap-2 border-t border-slate-200 pt-5"
							>
								<button
									type="button"
									disabled={currentPage === 1}
									onClick={() => setCurrentPage((page) => page - 1)}
									aria-label="Previous page"
									className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:border-emerald-600 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
								>
									<ChevronLeft className="h-4 w-4" aria-hidden="true" />
								</button>
								{Array.from(
									{ length: totalPages },
									(_, index) => index + 1,
								).map((page) => (
									<button
										key={page}
										type="button"
										onClick={() => setCurrentPage(page)}
										aria-label={`Go to page ${page}`}
										aria-current={currentPage === page ? 'page' : undefined}
										className={`h-8 min-w-8 rounded-md px-2 text-xs font-medium ${
											currentPage === page
												? 'bg-[#087A5B] text-white'
												: 'border border-slate-200 bg-white text-slate-600 hover:border-emerald-600 hover:text-emerald-700'
										}`}
									>
										{page}
									</button>
								))}
								<button
									type="button"
									disabled={currentPage === totalPages}
									onClick={() => setCurrentPage((page) => page + 1)}
									aria-label="Next page"
									className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:border-emerald-600 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
								>
									<ChevronRight className="h-4 w-4" aria-hidden="true" />
								</button>
							</nav>
						)}
					</section>

					<aside className="flex flex-col gap-4">
						<section className="rounded-xl bg-gradient-to-br from-[#087A5B] to-[#07513F] p-5 text-white shadow-sm">
							<Users className="h-9 w-9" strokeWidth={1.5} aria-hidden="true" />
							<h2 className="mt-4 text-lg font-bold">Find the right agent</h2>
							<p className="mt-2 text-sm leading-5 text-white/90">
								Browse local professionals by experience, specialties, and
								client reviews.
							</p>
							<div className="mt-5 flex items-center justify-between border-t border-white/20 pt-4 text-sm">
								<span>{agentsData.length} agents</span>
								<span className="inline-flex items-center gap-1 font-semibold">
									<Star
										className="h-4 w-4 fill-amber-300 text-amber-300"
										aria-hidden="true"
									/>
									{averageRating} avg.
								</span>
							</div>
						</section>

						<section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
							<h2 className="text-base font-bold text-slate-900">
								Why Work With Us?
							</h2>
							<ul className="mt-4 space-y-3 text-sm text-slate-600">
								{agentBenefits.map((benefit) => (
									<li key={benefit} className="flex items-start gap-2">
										<CheckCircle2
											className="mt-0.5 h-4 w-4 shrink-0 text-[#087A5B]"
											aria-hidden="true"
										/>
										{benefit}
									</li>
								))}
							</ul>

							<div className="mt-5 rounded-lg bg-emerald-50 p-3">
								<p className="text-xs text-slate-500">Combined sales</p>
								<p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900">
									<Building2
										className="h-4 w-4 text-[#087A5B]"
										aria-hidden="true"
									/>
									{totalSales.toLocaleString()} properties
								</p>
							</div>
						</section>
					</aside>
				</div>
			</main>

			{activeAgent && (
				<AgentProfileDialog
					agent={activeAgent}
					onClose={() => setActiveAgentId(null)}
				/>
			)}
		</>
	);
}
