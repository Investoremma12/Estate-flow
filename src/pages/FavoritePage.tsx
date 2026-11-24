import { ArrowRight, Bookmark, Heart } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PropertyCard from '../components/propertypage/PropertyCards';
import Property from '../data/Property';
import HeroBackground from '../assets/images/house9.jpg';
import {
	getFavoritePropertyIds,
	removeFavoriteProperty,
} from '../data/favoriteStorage';
import {
	favoriteSortOptions,
	type FavoriteSortOption,
} from '../data/favoritePageData';
import Navbar from '../layout/Navbar';

export default function FavoritePage() {
	const [savedPropertyIds, setSavedPropertyIds] = useState(getFavoritePropertyIds);
	const [sortOption, setSortOption] =
		useState<FavoriteSortOption>('newest');
	const savedProperties = useMemo(() => {
		const properties = Property.filter((property) =>
			savedPropertyIds.includes(property.id),
		);

		if (sortOption === 'price-low') {
			return properties.sort(
				(first, second) =>
					Number(first.price.replaceAll(',', '')) -
					Number(second.price.replaceAll(',', '')),
			);
		}

		if (sortOption === 'price-high') {
			return properties.sort(
				(first, second) =>
					Number(second.price.replaceAll(',', '')) -
					Number(first.price.replaceAll(',', '')),
			);
		}

		return properties;
	}, [savedPropertyIds, sortOption]);

	const removeFavorite = (propertyId: number) => {
		setSavedPropertyIds(removeFavoriteProperty(propertyId));
	};

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: -16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
			>
				<Navbar />
			</motion.div>
			<motion.section
				initial={{ opacity: 0, y: 22 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
				className="relative isolate overflow-hidden bg-cover bg-center"
				style={{ backgroundImage: `url(${HeroBackground})` }}
			>
				<div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/80 via-slate-950/55 to-slate-950/10" />
				<div className="mx-auto flex min-h-36 max-w-7xl items-center px-4 py-6 sm:min-h-40 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, x: -18 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.65, delay: 0.18 }}
					>
						<h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
							<Heart
								className="h-9 w-9 shrink-0 text-[#087A5B]"
								strokeWidth={1.8}
								aria-hidden="true"
							/>
							My Favorites
						</h1>
						<p className="mt-1 text-sm font-medium text-white sm:text-base">
							Your saved properties, all in one place.
						</p>
					</motion.div>
				</div>
			</motion.section>

			<motion.main
				initial={{ opacity: 0, y: 18 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
				className="min-h-[60vh] bg-[#f8faf9] px-4 py-5 font-poppins sm:px-6 sm:py-6 lg:px-8"
			>
				<div className="mx-auto max-w-7xl">
					<motion.div
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.25 }}
						className="mb-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"
					>
						<h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
							<Bookmark
								className="h-5 w-5 text-slate-800"
								strokeWidth={2}
								aria-hidden="true"
							/>
							{savedProperties.length} Saved{' '}
							{savedProperties.length === 1 ? 'Property' : 'Properties'}
						</h2>
						<label className="flex items-center gap-2 text-xs font-medium text-slate-700">
							Sort by:
							<select
								value={sortOption}
								onChange={(event) =>
									setSortOption(event.target.value as FavoriteSortOption)
								}
								className="min-h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-600"
							>
								{favoriteSortOptions.map(({ value, label }) => (
									<option key={value} value={value}>
										{label}
									</option>
								))}
							</select>
						</label>
					</motion.div>

					<AnimatePresence mode="wait" initial={false}>
						<motion.div
							key={savedProperties.map((property) => property.id).join('-') || 'empty'}
							initial={{ opacity: 0, y: 18 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -12 }}
							transition={{ duration: 0.4, ease: 'easeOut' }}
						>
							{savedProperties.length > 0 ? (
								<PropertyCard
									properties={savedProperties}
									variant="favorites"
									onRemoveFavorite={removeFavorite}
									gridClassName="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
								/>
							) : (
								<section className="rounded-xl border border-slate-200 bg-white px-5 py-12 text-center shadow-sm">
									<Heart
										className="mx-auto h-10 w-10 text-[#087A5B]"
										aria-hidden="true"
									/>
									<h2 className="mt-3 text-lg font-bold text-slate-900">
										No saved properties yet
									</h2>
									<p className="mt-1 text-sm text-slate-600">
										Save properties you love and they’ll show up here.
									</p>
									<Link
										to="/properties"
										className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#087A5B] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#066a4f]"
									>
										Browse Properties
										<ArrowRight className="h-4 w-4" aria-hidden="true" />
									</Link>
								</section>
							)}
						</motion.div>
					</AnimatePresence>

					<motion.section
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
						className="relative mt-6 overflow-hidden rounded-xl bg-gradient-to-r from-[#e7f5f0] via-[#eaf7f3] to-[#d9f0e8] px-5 py-6 text-center shadow-sm sm:py-7"
					>
						<img
							src={HeroBackground}
							alt=""
							aria-hidden="true"
							className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 object-cover opacity-20 [mask-image:linear-gradient(to_right,black,transparent)]"
						/>
						<div className="relative">
							<h2 className="text-lg font-bold text-slate-900 sm:text-xl">
								Discover More Properties
							</h2>
							<p className="mt-1 text-xs text-slate-700 sm:text-sm">
								Explore our wide range of properties and find your dream home.
							</p>
							<Link
								to="/properties"
								className="mt-3 inline-flex min-h-9 items-center justify-center gap-2 rounded-full bg-[#087A5B] px-5 text-xs font-semibold text-white transition-colors hover:bg-[#066a4f]"
							>
								Browse Properties
								<ArrowRight className="h-4 w-4" aria-hidden="true" />
							</Link>
						</div>
					</motion.section>
				</div>
			</motion.main>
		</>
	);
}
