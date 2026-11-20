import {
	Bath,
	BedDouble,
	ChevronRight,
	Heart,
	Home,
	MapPin,
	Maximize2,
} from 'lucide-react';  
import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Property from '../data/Property';
import Navbar from '../layout/Navbar';

export default function PropertyDetails() {
	const { id } = useParams();
	const [isFavorite, setIsFavorite] = useState(false);
	const property = Property.find((item) => item.id === Number(id));

	if (!property) {
		return <Navigate to="/properties" replace />;
	}

	const locationUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`;
	const toggleFavorite = () => setIsFavorite((favorite) => !favorite);

	return (
		<>
			<Navbar />
			<main className="min-h-screen bg-[#f7f9f8] px-4 pb-14 pt-5 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-[1296px]">
					<nav
						aria-label="Breadcrumb"
						className="mb-4 flex items-center gap-2 text-xs text-slate-500 sm:text-sm"
					>
						<Link to="/" aria-label="Home" className="hover:text-emerald-700">
							<Home className="h-4 w-4" aria-hidden="true" />
						</Link>
						<ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
						<Link to="/properties" className="hover:text-emerald-700">
							Properties
						</Link>
						<ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
						<span aria-current="page" className="truncate text-slate-700">
							{property.title}
						</span>
					</nav>

					<div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.8fr)_minmax(19rem,0.95fr)]">
						<div className="min-w-0">
							<div className="relative aspect-[1.65/1] overflow-hidden rounded-xl bg-slate-200 shadow-sm">
								<img
									src={property.image}
									alt={property.title}
									className="h-full w-full object-cover"
								/>
								<span className="absolute left-3 top-3 rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold text-white sm:left-4 sm:top-4 sm:px-4 sm:py-1.5 sm:text-sm">
									{property.propertyStatus}
								</span>
								<button
									type="button"
									onClick={toggleFavorite}
									aria-label={
										isFavorite
											? 'Remove from favorites'
											: 'Add to favorites'
									}
									aria-pressed={isFavorite}
									className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-md transition-colors hover:text-emerald-700 sm:right-4 sm:top-4 sm:h-10 sm:w-10"
								>
									<Heart
										className={`h-5 w-5 ${isFavorite ? 'fill-emerald-700 text-emerald-700' : ''}`}
										aria-hidden="true"
									/>
								</button>
							</div>

							<section className="mt-6 rounded-xl bg-white p-5 shadow-sm sm:p-6">
								<h2 className="text-lg font-semibold text-slate-900">
									Property details
								</h2>
								<p className="mt-2 text-sm leading-6 text-slate-600">
									{property.title} is a {property.type.toLowerCase()} listed{' '}
									{property.propertyStatus.toLowerCase()} in {property.location}.
								</p>
								<dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-slate-100 pt-5 sm:grid-cols-3">
									<div>
										<dt className="text-xs text-slate-500">Bedrooms</dt>
										<dd className="mt-1 font-medium text-slate-800">
											{property.bed}
										</dd>
									</div>
									<div>
										<dt className="text-xs text-slate-500">Bathrooms</dt>
										<dd className="mt-1 font-medium text-slate-800">
											{property.bath}
										</dd>
									</div>
									<div>
										<dt className="text-xs text-slate-500">Area</dt>
										<dd className="mt-1 font-medium text-slate-800">
											{property.size} sqft
										</dd>
									</div>
								</dl>
							</section>
						</div>

						<aside className="flex min-w-0 flex-col gap-4">
							<section className="rounded-xl bg-white p-5 shadow-sm sm:p-6">
								<p className="text-3xl font-bold leading-tight text-slate-900">
									${property.price}
									{property.propertyStatus === 'For Rent' && (
										<span className="ml-1 text-sm font-medium text-slate-500">
											/month
										</span>
									)}
								</p>
								<h1 className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">
									{property.title}
								</h1>
								<p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
									<MapPin
										className="h-4 w-4 shrink-0 text-emerald-700"
										aria-hidden="true"
									/>
									{property.location}
								</p>

								<ul className="mt-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-3 border-b border-slate-200 pb-5 text-xs text-slate-700">
									<li className="flex items-center gap-1.5">
										<BedDouble className="h-4 w-4" aria-hidden="true" />
										{property.bed} Beds
									</li>
									<li className="flex items-center gap-1.5">
										<Bath className="h-4 w-4" aria-hidden="true" />
										{property.bath} Baths
									</li>
									<li className="flex items-center gap-1.5">
										<Maximize2 className="h-4 w-4" aria-hidden="true" />
										{property.size} sqft
									</li>
									<li className="flex items-center gap-1.5">
										<Home className="h-4 w-4" aria-hidden="true" />
										{property.type}
									</li>
								</ul>

								<button
									type="button"
									onClick={toggleFavorite}
									aria-pressed={isFavorite}
									className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-emerald-700 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-50"
								>
									<Heart
										className={`h-4 w-4 ${isFavorite ? 'fill-emerald-700' : ''}`}
										aria-hidden="true"
									/>
									{isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
								</button>
							</section>

							<section className="rounded-xl bg-white p-5 shadow-sm sm:p-6">
								<h2 className="text-lg font-semibold text-slate-900">
									Property location
								</h2>
								<a
									href={locationUrl}
									target="_blank"
									rel="noreferrer"
									className="mt-4 flex min-h-28 items-center gap-4 rounded-lg bg-[#edf5f1] p-4 text-slate-800 transition-colors hover:bg-[#e3f0e9]"
								>
									<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-emerald-800">
										<MapPin className="h-5 w-5" aria-hidden="true" />
									</span>
									<span>
										<span className="block text-xs text-slate-500">
											Location
										</span>
										<span className="mt-1 block font-medium">
											{property.location}
										</span>
										<span className="mt-1 block text-xs text-emerald-800">
											View on map
										</span>
									</span>
								</a>
							</section>
						</aside>
					</div>
				</div>
			</main>
		</>
	);
}
