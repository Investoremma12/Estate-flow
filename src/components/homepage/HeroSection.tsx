import HeroBackground from '../../assets/images/house9.jpg';
import Button from '../ui/Button';
import { Search } from 'lucide-react';

export default function HeroSection() {
	return (
		<section
			className="relative isolate min-h-[28rem] overflow-hidden bg-cover bg-center bg-no-repeat sm:min-h-[34rem]"
			style={{ backgroundImage: `url(${HeroBackground})` }}
		>
			<div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/80 via-slate-950/55 to-slate-950/10" />
			<div className="mx-auto flex min-h-[28rem] max-w-7xl flex-col justify-center px-6 py-16 sm:min-h-[34rem] sm:px-8 lg:px-12">
				<div className="max-w-xl text-white">
					<p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200 sm:text-sm">
						Your dream home awaits
					</p>
					<h1 className="max-w-lg text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
						Find a place you'll love to call{' '}
						<span className="text-emerald-300">home</span>
					</h1>
					<p className="mt-5 max-w-md text-sm leading-6 text-slate-100 sm:text-base">
						Discover the perfect property with EstateFlow. Whether you're
						buying, selling, or renting, we make the journey simple, secure, and
						stress-free.
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
						<option>House</option>
						<option>Apartment</option>
						<option>Villa</option>
					</select>
					<select
						aria-label="Price range"
						defaultValue=""
						className="min-h-12 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-600"
					>
						<option value="" disabled>
							Price Range
						</option>
						<option>Under $300k</option>
						<option>$300k - $600k</option>
						<option>Over $600k</option>
					</select>
					<Button type="submit" label="Search" className=" text-white" />
				</form>
			</div>
		</section>
	);
}
