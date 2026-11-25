import {
	ArrowUp,
	Home,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const quickLinks = [
	{ label: 'Home', to: '/' },
	{ label: 'Properties', to: '/properties' },
	{ label: 'Agents', to: '/agent' },
	{ label: 'About', to: '/about' },
	{ label: 'Contact', to: '/contact' },
];
const supportLinks = [
	{ label: 'Help Center', to: '/contact' },
	{ label: 'FAQs', to: '/contact' },
];

export default function Footer() {
	const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

	return (
		<footer className="relative overflow-hidden bg-[#0B1220] py-12 font-poppins sm:py-14">
			<div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full border-[28px] border-emerald-300/10" />

			<div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr] lg:gap-12 lg:px-8">
				<div className="max-w-xs">
					<div className="mb-3 flex items-center gap-3">
						<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-[#0F2E22]">
							<Home className="h-4 w-4" strokeWidth={2.5} />
						</div>
						<span className="text-lg font-bold text-white">EstateFlow</span>
					</div>
					<p className="text-sm leading-6 text-emerald-50/70">
						Better homes. Brighter futures. We make the search for your next
						home feel simple, personal, and rewarding.
					</p>
				</div>

				<div>
					<p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
						Quick Links
					</p>
					<ul className="space-y-2.5">
						{quickLinks.map(({ label, to }) => (
							<li key={label}>
								<Link
									to={to}
									className="text-sm text-emerald-50/70 transition-colors hover:text-white"
								>
									{label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					<p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
						Support
					</p>
					<ul className="space-y-2.5">
						{supportLinks.map(({ label, to }) => (
							<li key={label}>
								<Link
									to={to}
									className="text-sm text-emerald-50/70 transition-colors hover:text-white"
								>
									{label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					<p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
						Follow Us
					</p>
					<p className="text-sm text-emerald-50/70">
						Social profiles coming soon.
					</p>
				</div>
			</div>

			<div className="relative mx-auto my-8 max-w-7xl border-t border-white/10 px-4 sm:px-6 lg:px-8" />

			<div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
				<p className="text-xs text-emerald-50/50">
					© 2025 EstateFlow. All rights reserved.
				</p>
				<button
					type="button"
					onClick={scrollToTop}
					aria-label="Scroll to top"
					className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-emerald-500 hover:text-[#0F2E22]"
				>
					<ArrowUp className="h-4 w-4" />
				</button>
			</div>
		</footer>
	);
}
