import Navbar from '../layout/Navbar';
import HeroBackground from '../assets/images/house9.jpg';
import Button from '../components/ui/Button';
import { ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import filterIcon from '../assets/icons/filter.svg';
import PropertyCard from '../components/propertypage/PropertyCards';
import Property from '../data/Property';
import { useState } from 'react';
import {
	propertiesPerPage,
	propertyFilterSections,
	propertyPriceRanges,
	propertySortOptions,
	propertyTypes,
} from '../data/propertyPageData';

export default function PropertyPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(Property.length / propertiesPerPage);
	const visibleProperties = Property.slice(
		(currentPage - 1) * propertiesPerPage,
		currentPage * propertiesPerPage,
	);

	return (
		<>
			<Navbar />
			{/*hero section*/}
			<section
				className="relative isolate min-h-[22rem] overflow-hidden bg-cover bg-center bg-no-repeat sm:min-h-[27rem]"
				style={{ backgroundImage: `url(${HeroBackground})` }}
			>
				<div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/80 via-slate-950/55 to-slate-950/10" />
				<div className="mx-auto flex min-h-[22rem] max-w-7xl flex-col justify-center px-6 py-12 sm:min-h-[27rem] sm:px-8 lg:px-12">
					<div className="max-w-xl text-white">
						<SectionHeading
							title="our properties"
							className="text-emerald-300"
						/>
						<h1 className="max-w-lg text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
							Find Your Perfect Property
						</h1>
						<p className="mt-5 max-w-md text-sm leading-6 text-slate-100 sm:text-base">
							Search through our wide selction of home, apartment and land to
							find the fits your lifestyle and budget
						</p>
					</div>

					<form className="mt-10 grid max-w-5xl gap-2 rounded-xl bg-white/95 p-2 shadow-2xl backdrop-blur-sm md:grid-cols-[minmax(0,1.7fr)_minmax(9rem,0.8fr)_minmax(9rem,0.8fr)_auto] md:gap-2">
						<label className="flex min-h-12 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-slate-400">
							<Search className="h-4 w-4 shrink-0" aria-hidden="true" />
							<input
								type="search"
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
					</form>
				</div>
			</section>
			<div className="flex flex-col items-stretch font-poppins lg:flex-row">
				{/*side bar*/}
				<aside className="w-full shrink-0 border-b border-slate-200 bg-white px-4 py-5 sm:px-6 lg:w-64 lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
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
				</aside>
				<main className="min-h-96 flex-1 bg-slate-50 p-6 lg:p-8">
					<div className="flex items-center justify-between gap-2">
						<p className="font-semibold text-lg tracking-wide text-black/90">
							{Property.length} Properties found
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
					</div>
					{/*cards*/}
					<PropertyCard properties={visibleProperties} />

					<div className="mt-8 flex flex-wrap items-center justify-center gap-2 border-t border-slate-200 pt-6">
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
					</div>
				</main>
			</div>
		</>
	);
}
