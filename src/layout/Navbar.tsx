import HeaderImage from '../assets/images/header-icon.png';

import {
	Heart,
	Search,
	Menu,
	X,
	UserRound,
	ChevronRight,
	House,
	Mail,
	Info,
	Users,
	Home,
	UserRoundPlus,
	Bookmark,
	Settings,
	ArrowRight,
} from 'lucide-react';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import { useEffect, useState } from 'react';

const NavLinks = [
	{
		links: 'Home',
		icons: House,
	},
	{
		links: 'Properties',
		icons: Home,
	},
	{
		links: 'Agents',
		icons: Users,
	},
	{
		links: 'About',
		icons: Info,
	},
	{
		links: 'Contact',
		icons: Mail,
	},
];

const MenuOptions = [
	{
		links: 'Saved Properties',
		icons: Heart,
	},
	{
		links: 'Favorites',
		icons: Bookmark,
	},
	{
		links: 'Settings',
		icons: Settings,
	},
];

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		if (!isMenuOpen) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setIsMenuOpen(false);
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isMenuOpen]);

	return (
		<nav className="relative z-20 mx-auto bg-white px-4 py-4 sm:px-6 lg:px-8">
			{/* Desktop Menu */}
			<div className="mx-auto flex max-w-7xl items-center justify-between font-poppins">
				<div className="flex items-center cursor-pointer">
					<img src={HeaderImage} className="h-8 w-10" />
					<div className="font-bold text-lg text-black/80 ">EstateFlow</div>
				</div>
				<div className="hidden lg:flex items-center gap-8">
					{NavLinks.map((Navlink, index) => (
						<p
							key={index}
							className="font-semibold text-sm hover:text-[#087A5B] cursor-pointer"
						>
							{Navlink.links}
						</p>
					))}
				</div>
				<div className="hidden lg:flex items-center gap-4">
					<Heart className="w-6 h-6 text-gray-700" />

					<div className="flex items-center gap-2">
						<Button
							label="Sign In"
							className="
							border border-slate-300
							bg-white
							text-black
							transition-all duration-200
							hover:border-emerald-600
							hover:bg-emerald-50
							hover:text-emerald-700
							hover:shadow-sm
						"
						/>
						<Button label="Sign Up" className="text-white" />
					</div>
				</div>
				<div className="flex items-center gap-4 lg:hidden">
					<button
						type="button"
						aria-label="Search"
						className="rounded-md p-1 text-slate-700 hover:bg-slate-100"
					>
						<Search className="h-6 w-6" />
					</button>
					<button
						type="button"
						aria-label="Open menu"
						aria-expanded={isMenuOpen}
						className="rounded-md p-1 text-slate-700 hover:bg-slate-100"
						onClick={() => setIsMenuOpen(true)}
					>
						<Menu className="h-6 w-6" />
					</button>
				</div>
			</div>
			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="fixed inset-0 z-30 lg:hidden">
					<button
						type="button"
						aria-label="Close menu"
						className="absolute inset-0 h-full w-full cursor-default bg-slate-950/30"
						onClick={() => setIsMenuOpen(false)}
					/>
					<aside
						aria-label="Mobile navigation"
						className="absolute right-0 top-0 flex h-dvh max-h-dvh w-[min(88vw,20rem)] max-w-full flex-col overflow-y-auto overscroll-contain bg-white px-6 pb-8 pt-5 font-poppins shadow-2xl"
					>
						<div className="flex items-center justify-between border-b border-slate-100 pb-5">
							<div className="flex items-center gap-3">
								<img src={HeaderImage} alt="" className="h-8 w-10" />
								<div className="font-bold text-lg text-black/80">
									EstateFlow
								</div>
							</div>
							<button
								type="button"
								aria-label="Close menu"
								className="rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
								onClick={() => setIsMenuOpen(false)}
							>
								<X className="h-6 w-6" />
							</button>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<button
									type="button"
									aria-label="Open account"
									className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e7f2ef] text-[#087A5B] transition-colors hover:bg-[#d9ebe5]"
								>
									<UserRound className="h-6 w-6" strokeWidth={2.5} />
								</button>
								<div className="flex flex-col gap-0.5">
									<p className="text-xs text-slate-500">Good Morning,</p>
									<p className="text-base font-bold text-slate-900">Guest</p>
								</div>
							</div>
							<button>
								<ChevronRight className="w-6 h-6" />
							</button>
						</div>
						<div className="flex flex-col gap-1 py-6">
							{NavLinks.map((navLink) => {
								const Icon = navLink.icons;

								return (
									<button
										type="button"
										key={navLink.links}
										className="flex items-center rounded-lg px-3 py-3 w-full text-left text-lg font-medium text-black/80 transition-colors hover:bg-emerald-50"
										onClick={() => setIsMenuOpen(false)}
									>
										<Icon className="mr-3 h-6 w-6" aria-hidden="true" />
										{navLink.links}
									</button>
								);
							})}
						</div>
						<div className="h-px w-full bg-[#e7f2ef]" />
						<div className="py-6">
							<SectionHeading title="My Account" className="mb-4" />
							<div className="flex flex-col gap-3">
								<Button className="w-full justify-start gap-5 bg-white px-3 py-3 text-base font-medium text-slate-900 hover:bg-slate-50">
									<UserRound
										className="h-7 w-7 text-slate-900"
										strokeWidth={1.8}
									/>
									Sign In
								</Button>
								<Button className="w-full justify-start gap-5 rounded-xl px-3 py-4 text-base font-medium text-white">
									<UserRoundPlus className="h-7 w-7" strokeWidth={1.8} />
									Sign Up
								</Button>
							</div>
						</div>
						<div className="h-px w-full bg-[#e7f2ef]" />
						<div className="pt-6">
							<SectionHeading title="More" className="mb-4" />

							<div>
								{MenuOptions.map((option) => {
									const Icon = option.icons;
									return (
										<button
											type="button"
											key={option.links}
											className="flex items-center rounded-lg px-3 py-3 w-full text-left text-lg font-medium text-black/80 transition-colors hover:bg-emerald-50"
											onClick={() => setIsMenuOpen(false)}
										>
											<Icon className="mr-3 h-6 w-6" aria-hidden="true" />
											{option.links}
										</button>
									);
								})}
							</div>
							<div className="mt-8 rounded-xl bg-[#eaf4f1] p-4">
								<div className="flex items-start gap-4">
									<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#c8e7dc] text-[#087A5B]">
										<img src={HeaderImage} alt="" className="h-8 w-10" />
									</div>
									<div className="min-w-0">
										<h3 className="text-base font-semibold leading-6 text-slate-900">
											Find your dream home
										</h3>
										<p className="mt-1 text-sm leading-5 text-slate-700">
											Create an account to save properties, get personalized
											recommendations and more.
										</p>
										<button
											type="button"
											className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#087A5B] hover:text-[#066A4F]"
										>
											Sign Up
											<ArrowRight className="h-4 w-4" />
										</button>
									</div>
								</div>
							</div>
						</div>

						<footer className="relative mt-8 min-h-36 overflow-hidden border-t border-[#e7f2ef] pt-5">
							<div className="relative z-10">
								<p className="text-sm font-semibold text-slate-900">
									EstateFlow
								</p>
								<p className="mt-1 text-xs text-slate-600">
									Better homes. Brighter futures.
								</p>
							</div>
							<div className="absolute -bottom-20 -right-20 h-32 w-32 rounded-full bg-[#087A5B]" />
						</footer>
					</aside>
				</div>
			)}
		</nav>
	);
}
