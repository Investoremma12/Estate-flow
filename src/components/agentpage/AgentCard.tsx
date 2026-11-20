import { ArrowRight, Mail, MapPin, MessageCircle, Phone, Star } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';
import agentsData from '../../data/agentsData';

type Agent = (typeof agentsData)[number];

interface AgentCardProps {
	agent: Agent;
	isFeatured: boolean;
	onViewProfile: (agentId: number) => void;
}

export default function AgentCard({
	agent,
	isFeatured,
	onViewProfile,
}: AgentCardProps) {
	const [showContactDetails, setShowContactDetails] = useState(false);

	return (
		<article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
			<div className="relative h-32 overflow-hidden bg-slate-100">
				<img
					src={agent.image}
					alt={agent.name}
					loading="lazy"
					className="h-full w-full object-cover object-[center_30%]"
				/>
				{isFeatured && (
					<span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-[#087A5B] px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
						<Star className="h-3 w-3 fill-current" aria-hidden="true" />
						Top Agent
					</span>
				)}
			</div>

			<div className="p-3">
				<h3 className="truncate text-base font-bold text-slate-900">
					{agent.name}
				</h3>
				<p className="mt-0.5 truncate text-xs text-slate-500">{agent.role}</p>

				<div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-600">
					<span className="inline-flex items-center gap-1">
						<Star
							className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
							aria-hidden="true"
						/>
						{agent.rating} ({agent.reviews} reviews)
					</span>
					<span className="hidden h-3 border-l border-slate-300 sm:block" />
					<span>{agent.propertiesSold}+ Sales</span>
				</div>

				<p className="mt-1.5 flex items-center gap-1 text-[11px] text-slate-500">
					<MapPin className="h-3 w-3 text-[#087A5B]" aria-hidden="true" />
					{agent.location}
				</p>

				<div className="mt-3 grid grid-cols-2 gap-2">
					<Button
						type="button"
						onClick={() => onViewProfile(agent.id)}
						className="h-9 w-full gap-1 rounded-md px-2 text-xs text-white"
					>
						View Profile
						<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
					</Button>
					<button
						type="button"
						onClick={() => setShowContactDetails((show) => !show)}
						aria-expanded={showContactDetails}
						aria-controls={`agent-contact-${agent.id}`}
						className="inline-flex h-9 w-full items-center justify-center rounded-md border border-[#087A5B] bg-white px-2 text-xs font-medium text-[#087A5B] transition-colors hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087A5B]"
					>
						Contact
					</button>
				</div>

				{showContactDetails && (
					<div
						id={`agent-contact-${agent.id}`}
						className="mt-3 space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-600"
					>
						<a
							href={`tel:${agent.phone.replace(/[^\d+]/g, '')}`}
							className="flex items-center gap-2 hover:text-[#087A5B]"
						>
							<Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
							{agent.phone}
						</a>
						<a
							href={`mailto:${agent.email}`}
							className="flex items-center gap-2 break-all hover:text-[#087A5B]"
						>
							<Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
							{agent.email}
						</a>
						<a
							href={`https://wa.me/${agent.whatsapp.replace(/\D/g, '')}`}
							target="_blank"
							rel="noreferrer"
							className="flex items-center gap-2 hover:text-[#087A5B]"
						>
							<MessageCircle
								className="h-3.5 w-3.5 shrink-0"
								aria-hidden="true"
							/>
							WhatsApp
						</a>
					</div>
				)}
			</div>
		</article>
	);
}
