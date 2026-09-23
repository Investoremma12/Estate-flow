import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const locations = [
	{
		name: 'New York',
		image:
			'https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=240&h=240&q=80',
	},
	{
		name: 'Los Angeles',
		image:
			'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&fit=crop&w=240&h=240&q=80',
	},
	{
		name: 'Chicago',
		image:
			'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=240&h=240&q=80',
	},
	{
		name: 'Miami',
		image:
			'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=240&h=240&q=80',
	},
	{
		name: 'Austin',
		image:
			'https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&w=240&h=240&q=80',
	},
	{
		name: 'San Francisco',
		image:
			'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=240&h=240&q=80',
	},
];

export default function LocationSection() {
	return (
		<section className="mt-12 overflow-hidden bg-[#eff8f5] py-10 sm:mt-16 sm:py-12">
			<div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 font-poppins sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-8">
				<div className="shrink-0 lg:w-72">
					<SectionHeading
						title="Popular Locations"
						className="mb-2 text-[10px] tracking-[0.16em]"
					/>
					<h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
						Explore Top Locations
					</h2>
					<p className="mt-2 max-w-sm text-sm leading-5 text-slate-600">
						Find properties in the most desirable areas, from vibrant cities to
						peaceful suburbs.
					</p>
				</div>

				<div className="min-w-0 flex-1">
					<div className="mb-4 flex justify-end">
						<button
							type="button"
							className="inline-flex items-center gap-1 text-xs font-semibold text-[#087A5B] transition-colors hover:text-[#066A4F]"
						>
							View All Locations
							<ArrowRight className="h-3.5 w-3.5" />
						</button>
					</div>
					<div className="-mx-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:overflow-visible lg:px-0">
						<div className="flex w-max gap-6 lg:w-full lg:justify-between lg:gap-3">
							{locations.map((location) => (
								<button
									type="button"
									key={location.name}
									className="group flex w-20 shrink-0 flex-col items-center gap-2 text-center"
								>
									<img
										src={location.image}
										alt={`${location.name} skyline`}
										className="h-16 w-16 rounded-full object-cover ring-2 ring-white transition-transform group-hover:scale-105 sm:h-20 sm:w-20"
									/>
									<span className="text-xs font-semibold text-slate-800">
										{location.name}
									</span>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
