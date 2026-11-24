import Navbar from '../layout/Navbar';
import HeroBackground from '../assets/images/house9.jpg';
import Button from '../components/ui/Button';
import { ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import filterIcon from '../assets/icons/filter.svg';
import PropertyCard from '../components/propertypage/PropertyCards';
import Property from '../data/Property';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
	propertiesPerPage,
	propertyFilterSections,
	propertyPriceRanges,
	propertySortOptions,
	propertyTypes,
} from '../data/propertyPageData';

export default function PropertyPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');
	const [appliedSearchQuery, setAppliedSearchQuery] = useState('');
	const normalizedQuery = appliedSearchQuery.trim().toLowerCase();
	const filteredProperties = Property.filter((property) => {
		const searchableText = [
			property.title,
			property.location,
			property.type,
			property.propertyStatus,
			property.price,
		]
			.join(' ')
			.toLowerCase();
		const normalizedSearchableText = searchableText.replace(/[\s,$]/g, '');
		const normalizedCompactQuery = normalizedQuery.replace(/[\s,$]/g, '');

		return (
			searchableText.includes(normalizedQuery) ||
			normalizedSearchableText.includes(normalizedCompactQuery)
		);
	});
	const totalPages = Math.max(
		1,
		Math.ceil(filteredProperties.length / propertiesPerPage),
	);
	const visibleProperties = filteredProperties.slice(
		(currentPage - 1) * propertiesPerPage,
		currentPage * propertiesPerPage,
	);

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: -16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
			>
				<Navbar />
			</motion.div>
			{/*hero section*/}
			<motion.section
				initial={{ opacity: 0, y: 24 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
				className="relative isolate min-h-[22rem] overflow-hidden bg-cover bg-center bg-no-repeat sm:min-h-[27rem]"
				style={{ backgroundImage: `url(${HeroBackground})` }}
			>
				<div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/80 via-slate-950/55 to-slate-950/10" />
				<div className="mx-auto flex min-h-[22rem] max-w-7xl flex-col justify-center px-6 py-12 sm:min-h-[27rem] sm:px-8 lg:px-12">
					<motion.div
						initial={{ opacity: 0, x: -24 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
						className="max-w-xl text-white"
					>
						<SectionHeading
							title="our properties"
							className="text-emerald-300"
						/>
						<h1 className="max-w-lg text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
							Find Your Perfect Property
						</h1>
						<p className="mt-5 max-w-md text-sm leading-6 text-slate-100 sm:text-base">
							Search our collection of homes, apartments, and land to find a
							property that fits your lifestyle and budget.
						</p>
					</motion.div>

					<motion.form
						initial={{ opacity: 0, y: 18 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
						onSubmit={(event) => {
							event.preventDefault();
							setAppliedSearchQuery(searchQuery);
							setCurrentPage(1);
						}}
						className="mt-10 grid max-w-5xl gap-2 rounded-xl bg-white/95 p-2 shadow-2xl backdrop-blur-sm md:grid-cols-[minmax(0,1.7fr)_minmax(9rem,0.8fr)_minmax(9rem,0.8fr)_auto] md:gap-2"
					>
						<label className="flex min-h-12 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-slate-400">
							<Search className="h-4 w-4 shrink-0" aria-hidden="true" />
							<input
								type="search"
								value={searchQuery}
								onChange={(event) => setSearchQuery(event.target.value)}
								placeholder="Search by location, property type or keyword..."
								aria-label="Search by location, property type or keyword"
								className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
							/>
						</label>
						<select
							aria-label="Property type"
							defaultValue=""
							className="min-h-12 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-600"
						>
							<option value="" disabled>
								Property Type
							</option>
							{propertyTypes.map((propertyType) => (
								<option key={propertyType}>{propertyType}</option>
							))}
						</select>
						<select
							aria-label="Price range"
							defaultValue=""
							className="min-h-12 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-600"
						>
							<option value="" disabled>
								Price Range
							</option>
							{propertyPriceRanges.map((priceRange) => (
								<option key={priceRange}>{priceRange}</option>
							))}
						</select>
						<Button type="submit" label="Search" className=" text-white" />
					</motion.form>
				</div>
			</motion.section>
			<div className="flex flex-col items-stretch font-poppins lg:flex-row">
				{/*side bar*/}
				<motion.aside
					initial={{ opacity: 0, x: -24 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, amount: 0.08 }}
					transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
					className="w-full shrink-0 border-b border-slate-200 bg-white px-4 py-5 sm:px-6 lg:w-64 lg:border-b-0 lg:border-r lg:px-5 lg:py-6"
				>
					<div className="flex items-center justify-between border-b border-slate-100 pb-4">
						<div className="flex items-center gap-3">
							<img
								src={filterIcon}
								alt=""
								aria-hidden="true"
								className="h-8 w-8 object-contain"
							/>
							<span className="text-sm font-semibold text-slate-800">
								Filters
							</span>
						</div>

						<button
							type="button"
							onClick={() => {
								setSearchQuery('');
								setAppliedSearchQuery('');
								setCurrentPage(1);
							}}
							className="text-xs font-medium text-emerald-700 hover:text-emerald-900"
						>
							Clear All
						</button>
					</div>

					<div>
						{propertyFilterSections.map((section) => (
							<div
								key={section.title}
								className="border-b border-slate-100 py-4 last:border-b-0"
							>
								<button
									type="button"
									className="flex w-full items-center justify-between text-left"
								>
									<span className="text-xs font-semibold text-slate-700">
										{section.title}
									</span>
									<ChevronDown
										className="h-3.5 w-3.5 text-slate-500"
										aria-hidden="true"
									/>
								</button>
								<div className="mt-3 space-y-2">
									{section.options.map((option, index) => (
										<label
											key={option}
											className="flex cursor-pointer items-center gap-2 text-xs text-slate-500"
										>
											<input
												type="checkbox"
												defaultChecked={index === 0}
												className="h-3.5 w-3.5 rounded border-slate-300 accent-emerald-700"
											/>
											<span>{option}</span>
										</label>
									))}
								</div>
							</div>
						))}
					</div>
				</motion.aside>
				<motion.main
					initial={{ opacity: 0, y: 22 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.04 }}
					transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
					className="min-h-96 flex-1 bg-slate-50 p-6 lg:p-8"
				>
					<motion.div
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.25 }}
						className="flex items-center justify-between gap-2"
					>
						<p className="font-semibold text-lg tracking-wide text-black/90">
							{filteredProperties.length}{' '}
							{filteredProperties.length === 1 ? 'Property' : 'Properties'} found
						</p>
						<div className="flex items-center gap-2">
							<p className="text-sm text-slate-700">Sort by:</p>
							<select
								aria-label="Newest First"
								defaultValue=""
								className="min-h-10 rounded-lg border cursor-pointer border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-600"
							>
								<option value="" disabled>
									Newest First
								</option>
								{propertySortOptions.map((sortOption) => (
									<option key={sortOption}>{sortOption}</option>
								))}
							</select>
						</div>
					</motion.div>
					{/*cards*/}
					<AnimatePresence mode="wait" initial={false}>
						<motion.div
							key={`${appliedSearchQuery}-${currentPage}`}
							initial={{ opacity: 0, y: 18 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -12 }}
							transition={{ duration: 0.35, ease: 'easeOut' }}
						>
							{visibleProperties.length > 0 ? (
								<PropertyCard properties={visibleProperties} />
							) : (
								<div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
									<Search className="mx-auto h-8 w-8 text-slate-400" aria-hidden="true" />
									<h2 className="mt-3 text-lg font-semibold text-slate-900">
										No matching properties
									</h2>
									<p className="mt-1 text-sm text-slate-500">
										Try a different keyword, location, property type, or price.
									</p>
									<button
										type="button"
										onClick={() => {
											setSearchQuery('');
											setAppliedSearchQuery('');
											setCurrentPage(1);
										}}
										className="mt-4 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
									>
										Clear search
									</button>
								</div>
							)}
						</motion.div>
					</AnimatePresence>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.55, delay: 0.35 }}
						className="mt-8 flex flex-wrap items-center justify-center gap-2 border-t border-slate-200 pt-6"
					>
						<button
							type="button"
							disabled={currentPage === 1}
							onClick={() => setCurrentPage((page) => page - 1)}
							aria-label="Previous page"
							className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition-colors hover:border-emerald-600 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
						>
							<ChevronLeft className="h-4 w-4" />
						</button>
						{Array.from({ length: totalPages }, (_, index) => index + 1).map(
							(page) => (
								<button
									key={page}
									type="button"
									onClick={() => setCurrentPage(page)}
									aria-label={`Go to page ${page}`}
									aria-current={currentPage === page ? 'page' : undefined}
									className={`h-8 min-w-8 rounded-md px-2 text-xs font-medium transition-colors ${currentPage === page ? 'bg-[#087A5B] text-white' : 'border border-slate-200 bg-white text-slate-600 hover:border-emerald-600 hover:text-emerald-700'}`}
								>
									{page}
								</button>
							),
						)}
						<button
							type="button"
							disabled={currentPage === totalPages}
							onClick={() => setCurrentPage((page) => page + 1)}
							aria-label="Next page"
							className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition-colors hover:border-emerald-600 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
						>
							<ChevronRight className="h-4 w-4" />
						</button>
					</motion.div>
				</motion.main>
			</div>
		</>
	);
}
