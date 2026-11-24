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
import { motion } from 'framer-motion';
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
			<motion.div
				initial={{ opacity: 0, y: -12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
			>
				<Navbar />
			</motion.div>
			<motion.main
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.9, ease: 'easeOut' }}
				className="min-h-screen bg-[#f7f9f8] px-4 pb-14 pt-5 sm:px-6 lg:px-8"
			>
				<div className="mx-auto max-w-[1296px]">
					<motion.nav
						aria-label="Breadcrumb"
						initial={{ opacity: 0, x: -14 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.65, delay: 0.12, ease: 'easeOut' }}
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
					</motion.nav>

					<motion.div
						initial="hidden"
						animate="visible"
						variants={{
							hidden: {},
							visible: {
								transition: {
									staggerChildren: 0.16,
									delayChildren: 0.18,
								},
							},
						}}
						className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.8fr)_minmax(19rem,0.95fr)]"
					>
						<motion.div
							variants={{
								hidden: { opacity: 0, y: 22 },
								visible: {
									opacity: 1,
									y: 0,
									transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
								},
							}}
							className="min-w-0"
						>
							<motion.div
								whileHover={{ y: -3 }}
								transition={{ duration: 0.35, ease: 'easeOut' }}
								className="relative aspect-[1.65/1] overflow-hidden rounded-xl bg-slate-200 shadow-sm"
							>
								<motion.img
									src={property.image}
									alt={property.title}
									className="h-full w-full object-cover"
									whileHover={{ scale: 1.035 }}
									transition={{ duration: 0.7, ease: 'easeOut' }}
								/>
								<motion.span
									initial={{ opacity: 0, scale: 0.85 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.45, delay: 0.55 }}
									className="absolute left-3 top-3 rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold text-white sm:left-4 sm:top-4 sm:px-4 sm:py-1.5 sm:text-sm"
								>
									{property.propertyStatus}
								</motion.span>
								<motion.button
									type="button"
									onClick={toggleFavorite}
									whileHover={{ scale: 1.08 }}
									whileTap={{ scale: 0.9 }}
									aria-label={
										isFavorite
											? 'Remove from favorites'
											: 'Add to favorites'
									}
									aria-pressed={isFavorite}
									className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-md transition-colors hover:text-emerald-700 sm:right-4 sm:top-4 sm:h-10 sm:w-10"
								>
									<motion.div
										animate={{ scale: isFavorite ? 1.12 : 1 }}
										transition={{ type: 'spring', stiffness: 350, damping: 16 }}
									>
										<Heart
											className={`h-5 w-5 ${isFavorite ? 'fill-emerald-700 text-emerald-700' : ''}`}
											aria-hidden="true"
										/>
									</motion.div>
								</motion.button>
							</motion.div>

							<motion.section
								initial={{ opacity: 0, y: 22 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
								className="mt-6 rounded-xl bg-white p-5 shadow-sm sm:p-6"
							>
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
							</motion.section>
						</motion.div>

						<motion.aside
							variants={{
								hidden: { opacity: 0, x: 22 },
								visible: {
									opacity: 1,
									x: 0,
									transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
								},
							}}
							className="flex min-w-0 flex-col gap-4"
						>
							<motion.section
								whileHover={{ y: -3 }}
								transition={{ duration: 0.3, ease: 'easeOut' }}
								className="rounded-xl bg-white p-5 shadow-sm sm:p-6"
							>
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

								<motion.button
									type="button"
									onClick={toggleFavorite}
									whileHover={{ scale: 1.015 }}
									whileTap={{ scale: 0.985 }}
									aria-pressed={isFavorite}
									className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-emerald-700 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-50"
								>
									<motion.div
										animate={{ scale: isFavorite ? 1.12 : 1 }}
										transition={{ type: 'spring', stiffness: 350, damping: 16 }}
									>
										<Heart
											className={`h-4 w-4 ${isFavorite ? 'fill-emerald-700' : ''}`}
											aria-hidden="true"
										/>
									</motion.div>
									{isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
								</motion.button>
							</motion.section>

							<motion.section
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									duration: 0.7,
									delay: 0.12,
									ease: [0.22, 1, 0.36, 1],
								}}
								className="rounded-xl bg-white p-5 shadow-sm sm:p-6"
							>
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
							</motion.section>
						</motion.aside>
					</motion.div>
				</div>
			</motion.main>
		</>
	);
}
