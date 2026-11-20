import { ArrowRight, Bookmark, Heart } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/propertypage/PropertyCards';
import Property from '../data/Property';
import HeroBackground from '../assets/images/house9.jpg';
import Navbar from '../layout/Navbar';

type SortOption = 'newest' | 'price-low' | 'price-high';

export default function FavoritePage() {
	const [savedPropertyIds, setSavedPropertyIds] = useState([1, 2, 3]);
	const [sortOption, setSortOption] = useState<SortOption>('newest');
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
		setSavedPropertyIds((savedIds) =>
			savedIds.filter((savedId) => savedId !== propertyId),
		);
	};

	return (
		<>
			<Navbar />
			<section
				className="relative isolate overflow-hidden bg-cover bg-center"
				style={{ backgroundImage: `url(${HeroBackground})` }}
			>
				<div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/95 via-white/75 to-white/10" />
				<div className="mx-auto flex min-h-36 max-w-7xl items-center px-4 py-6 sm:min-h-40 sm:px-6 lg:px-8">
					<div>
						<h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
							<Heart
								className="h-9 w-9 shrink-0 text-[#087A5B]"
								strokeWidth={1.8}
								aria-hidden="true"
							/>
							My Favorites
						</h1>
						<p className="mt-1 text-sm font-medium text-slate-700 sm:text-base">
							Your saved properties, all in one place.
						</p>
					</div>
				</div>
			</section>

			<main className="min-h-[60vh] bg-[#f8faf9] px-4 py-5 font-poppins sm:px-6 sm:py-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<div className="mb-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
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
									setSortOption(event.target.value as SortOption)
								}
								className="min-h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-600"
							>
								<option value="newest">Newest First</option>
								<option value="price-low">Price: Low to High</option>
								<option value="price-high">Price: High to Low</option>
							</select>
						</label>
					</div>

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

					<section className="relative mt-6 overflow-hidden rounded-xl bg-gradient-to-r from-[#e7f5f0] via-[#eaf7f3] to-[#d9f0e8] px-5 py-6 text-center shadow-sm sm:py-7">
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
					</section>
				</div>
			</main>
		</>
	);
}
