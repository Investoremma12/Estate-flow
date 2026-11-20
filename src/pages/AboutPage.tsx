import {
	ArrowRight,
	Building2,
	Handshake,
	House,
	Play,
	Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import agentsData from '../data/agentsData';
import { aboutBenefits, aboutImpactStats } from '../data/aboutPageData';
import StoryImage from '../assets/images/house1.jpg';
import HeroBackground from '../assets/images/house9.jpg';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';

export default function AboutPage() {
	return (
		<>
			<Navbar />
			<main className="font-poppins">
				<section
					className="relative isolate overflow-hidden bg-cover bg-center"
					style={{ backgroundImage: `url(${HeroBackground})` }}
				>
					<div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/80 via-slate-950/55 to-slate-950/10" />
					<div className="mx-auto flex min-h-40 max-w-7xl items-center px-4 py-6 sm:min-h-44 sm:px-6 lg:px-8">
						<div className="max-w-lg">
							<p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#087A5B]">
								About EstateFlow
							</p>
							<h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
								Building Better Futures Through Real Estate
							</h1>
							<p className="mt-2 max-w-md text-xs leading-5 text-white sm:text-sm">
								We’re more than just a real estate platform — we’re your trusted
								partner in finding the perfect property and building the life
								you deserve.
							</p>
						</div>
					</div>
				</section>

				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<section
						id="our-story"
						className="grid gap-6 py-5 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:items-center"
					>
						<div>
							<div className="flex items-center gap-2 text-[#087A5B]">
								<House className="h-4 w-4" aria-hidden="true" />
								<p className="text-xs font-bold">Our Story</p>
							</div>
							<h2 className="mt-1 text-xl font-bold text-slate-900">
								Who We Are
							</h2>
							<p className="mt-2 text-xs leading-[1.55] text-slate-700">
								EstateFlow was founded with a simple mission: to make real
								estate simple, transparent and accessible for everyone. We
								understand that finding a home is more than just a transaction
								—it’s about finding a place to belong, grow and thrive.
							</p>
							<p className="mt-2.5 text-xs leading-[1.55] text-slate-700">
								With a team of dedicated professionals, we’re committed to
								providing exceptional service, verified listings and a seamless
								experience for buyers, sellers and renters.
							</p>
							<Link
								to="/agent"
								className="mt-3 inline-flex min-h-8 items-center gap-2 rounded-full bg-[#087A5B] px-4 text-[11px] font-semibold text-white transition-colors hover:bg-[#066A4F]"
							>
								Learn More About Us
								<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
							</Link>
						</div>

						<div
							role="img"
							aria-label="EstateFlow mission video preview featuring a modern home"
							className="relative h-48 overflow-hidden rounded-xl bg-slate-100 shadow-sm sm:h-56"
						>
							<img
								src={StoryImage}
								alt=""
								className="h-full w-full object-cover"
							/>
							<div className="absolute inset-0 bg-slate-950/10" />
							<div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg">
								<Play
									className="ml-0.5 h-5 w-5"
									fill="currentColor"
									aria-hidden="true"
								/>
							</div>
							<div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-slate-950/65 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-sm">
								<Building2 className="h-3.5 w-3.5" aria-hidden="true" />
								Our Mission in 1 Minute
							</div>
						</div>
					</section>

					<section
						aria-labelledby="benefits-title"
						className="grid gap-4 rounded-lg bg-[#eaf7f2] px-5 py-4 sm:grid-cols-[minmax(0,1.25fr)_minmax(0,2fr)] sm:items-center"
					>
						<div>
							<div className="flex items-center gap-2">
								<Building2
									className="h-5 w-5 text-[#087A5B]"
									aria-hidden="true"
								/>
								<h2
									id="benefits-title"
									className="text-base font-bold text-slate-900"
								>
									Why Choose EstateFlow?
								</h2>
							</div>
							<p className="mt-1 text-[11px] leading-4 text-slate-700">
								We go beyond listings to deliver a complete real estate
								experience.
							</p>
						</div>
						<ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-0">
							{aboutBenefits.map(({ label, icon: Icon }) => (
								<li
									key={label}
									className="flex flex-col items-center justify-center gap-1 text-center text-[10px] leading-4 text-slate-700 sm:border-l sm:border-[#c5e3d8] sm:px-3"
								>
									<Icon className="h-5 w-5 text-[#087A5B]" aria-hidden="true" />
									<span>{label}</span>
								</li>
							))}
						</ul>
					</section>

					<section
						aria-labelledby="impact-title"
						className="grid gap-4 border-b border-slate-200 py-5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,2.1fr)] sm:items-center"
					>
						<div>
							<p className="mb-1 text-[10px] font-semibold text-[#087A5B]">
								Our Impact
							</p>
							<h2
								id="impact-title"
								className="text-xl font-bold text-slate-900"
							>
								Numbers That Tell Our Story
							</h2>
							<p className="mt-1 max-w-xs text-xs leading-4 text-slate-700">
								A growing community, a proven track record, and a commitment to
								excellence.
							</p>
						</div>
						<dl className="grid grid-cols-2 sm:grid-cols-4">
							{aboutImpactStats.map(({ value, label, icon: Icon }) => (
								<div
									key={label}
									className="flex flex-col items-center justify-center border-slate-200 py-2 text-center sm:border-l"
								>
									<Icon className="h-5 w-5 text-[#087A5B]" aria-hidden="true" />
									<dt className="order-2 text-[10px] text-slate-700">
										{label}
									</dt>
									<dd className="order-1 mt-1 text-xl font-bold text-slate-900">
										{value}
									</dd>
								</div>
							))}
						</dl>
					</section>

					<section
						id="our-team"
						className="grid gap-4 py-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)_minmax(0,0.8fr)] lg:items-center"
					>
						<div>
							<div className="flex items-center gap-2 text-[#087A5B]">
								<Users className="h-4 w-4" aria-hidden="true" />
								<p className="text-xs font-bold">Our Team</p>
							</div>
							<h2 className="mt-1 text-xl font-bold text-slate-900">
								Meet Our Team
							</h2>
							<p className="mt-1 max-w-xs text-xs leading-4 text-slate-700">
								A team of real estate professionals dedicated to helping you
								achieve your goals.
							</p>
						</div>
						<div className="flex gap-2 overflow-x-auto pb-1">
							{agentsData.slice(0, 5).map((agent) => (
								<img
									key={agent.id}
									src={agent.image}
									alt={agent.name}
									loading="lazy"
									className="h-24 w-24 shrink-0 rounded-lg object-cover object-[center_30%] sm:h-28 sm:w-28"
								/>
							))}
						</div>
						<div className="flex flex-col items-center rounded-lg bg-[#eaf7f2] px-4 py-4 text-center">
							<Handshake
								className="h-7 w-7 text-[#087A5B]"
								aria-hidden="true"
							/>
							<h3 className="mt-2 text-xs font-bold text-slate-900">
								Let’s Find Your Dream Property Together
							</h3>
							<Link
								to="/properties"
								className="mt-2 inline-flex min-h-8 items-center justify-center gap-1 rounded-full bg-[#087A5B] px-4 py-1.5 text-[10px] font-medium text-white transition-colors hover:bg-[#066A4F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087A5B]"
							>
								Get Started
								<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
							</Link>
						</div>
					</section>
				</div>
			</main>
			<Footer />
		</>
	);
}
