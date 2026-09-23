import { Star, ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

interface Agent {
	id: number;
	name: string;
	role: string;
	rating: number;
	reviews: number;
	image: string;
}

const agentsData: Agent[] = [
	{
		id: 1,
		name: 'Sarah Johnson',
		role: 'Senior Real Estate Agent',
		rating: 4.9,
		reviews: 124,
		image:
			'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
	},
	{
		id: 2,
		name: 'Michael Chen',
		role: 'Real Estate Agent',
		rating: 4.8,
		reviews: 98,
		image:
			'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200',
	},
	{
		id: 3,
		name: 'Emily Rodriguez',
		role: 'Real Estate Agent',
		rating: 4.9,
		reviews: 87,
		image:
			'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200',
	},
	{
		id: 4,
		name: 'David Wilson',
		role: 'Senior Real Estate Agent',
		rating: 4.7,
		reviews: 76,
		image:
			'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200',
	},
];

export default function AgentSection() {
	return (
		<section className="bg-white py-16 sm:py-20 font-poppins">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
					<div>
						<SectionHeading
							title="Our Agents"
							className="mb-2 text-[10px] tracking-[0.18em] text-[#087A5B]"
						/>
						<h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
							Meet Our Expert Agents
						</h2>
						<p className="mt-2 max-w-xl text-sm text-slate-600 sm:text-[15px]">
							Our experienced agents are here to help you find the perfect
							property with confidence, clarity, and a personal touch.
						</p>
					</div>

					<a
						href="#all-agents"
						className="inline-flex items-center text-sm font-semibold text-[#087A5B] transition-colors hover:text-[#066A4F]"
					>
						View All Agents
						<ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
					</a>
				</div>

				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
					{agentsData.map((agent) => (
						<div
							key={agent.id}
							className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
						>
							<img
								src={agent.image}
								alt={agent.name}
								className="h-20 w-20 shrink-0 rounded-full object-cover"
							/>
							<div className="min-w-0 flex-1">
								<h3 className="truncate text-base font-bold text-slate-900">
									{agent.name}
								</h3>
								<p className="mt-1 text-xs font-medium text-slate-500">
									{agent.role}
								</p>

								<div className="mt-2 flex items-center gap-1 text-[11px] text-slate-500">
									<div className="flex items-center text-amber-400">
										<Star className="h-3.5 w-3.5 fill-current" />
										<Star className="h-3.5 w-3.5 fill-current" />
										<Star className="h-3.5 w-3.5 fill-current" />
										<Star className="h-3.5 w-3.5 fill-current" />
										<Star className="h-3.5 w-3.5 fill-current" />
									</div>
									<span className="ml-1 font-medium">
										{agent.rating} ({agent.reviews} reviews)
									</span>
								</div>

								<a
									href={`#profile-${agent.id}`}
									className="mt-3 inline-flex items-center text-xs font-semibold text-[#087A5B] transition-colors hover:text-[#066A4F]"
								>
									View Profile
									<ArrowRight className="ml-1 h-3.5 w-3.5" />
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
