import SectionHeading from '../ui/SectionHeading';
import {
	ArrowRight,
	Bath,
	BedDouble,
	Heart,
	MapPin,
	Maximize2,
} from 'lucide-react';
import Property1 from '../../assets/images/house1.jpg';
import Property2 from '../../assets/images/house2.jpg';
import Property3 from '../../assets/images/house3.jpg';
import Property4 from '../../assets/images/house4.jpg';
// import Property5 from '../../assets/images/house5.jpg';

export default function PropertySection() {
	const PropertyDetails = [
		{
			image: Property1,
			propertyStatus: 'For Sale',
			price: '480,000',
			title: 'Modern family home',
			location: 'Austin, TX',
			bed: '4 Beds',
			bath: '3 Baths',
			size: '2,500 sqft',
		},
		{
			image: Property2,
			propertyStatus: 'For Rent',
			price: '2,200',
			title: 'Luxury Apartment',
			location: 'New York, NY',
			bed: '2 Beds',
			bath: '2 Baths',
			size: '1,200 sqft',
		},
		{
			image: Property3,
			propertyStatus: 'For Sale',
			price: '750,000',
			title: 'Contemporary villa',
			location: 'Los Angeles, CA',
			bed: '5 Beds',
			bath: '4 Baths',
			size: '3,800 sqft',
		},
		{
			image: Property4,
			propertyStatus: 'For Rent',
			price: '1,800',
			title: 'Cozy Townhouse',
			location: 'Chicago, IL',
			bed: '3 Beds',
			bath: '2 Baths',
			size: '1,600 sqft',
		},
	];
	return (
		<>
			<section>
				<div className="mx-auto max-w-7xl px-4 pt-6 font-poppins sm:px-6 lg:px-8">
					{/*card text*/}
					<div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
						<div>
							<SectionHeading title="Featured Properties" className="mb-1" />
							<h1 className="text-2xl font-bold text-black mb-1">
								Handpicked Properties
							</h1>
							<p className="text-sm font-medium text-slate-600">
								Explore our most popular properties, carefully selected for you.
							</p>
						</div>
						<div>
							<button
								type="button"
								className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#087A5B] hover:text-[#066A4F]"
							>
								view all properties
								<ArrowRight className="h-4 w-4" />
							</button>
						</div>
					</div>

					<div className="mt-8">
						{/* Property cards will be rendered here */}
						<div className="-mx-4 min-w-0 overflow-x-auto px-4 pb-4 snap-x snap-mandatory sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
							<div className="flex w-max gap-4 lg:w-full">
								{PropertyDetails.map((PropertyDetail, index) => (
									<div
										key={index}
										className="w-[82vw] max-w-[20rem] shrink-0 snap-start overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg sm:w-[42vw] sm:max-w-none lg:w-0 lg:flex-1"
									>
										<div className="relative h-44 overflow-hidden p-1">
											<img
												src={PropertyDetail.image}
												alt={PropertyDetail.title}
												className="h-full w-full rounded-md object-cover"
											/>
											<span
												className={`absolute bottom-1 left-3 rounded-br-md rounded-tl-md ${PropertyDetail.propertyStatus === 'For Sale' ? 'bg-[#087A5B]' : 'bg-[#6D67FA]'} px-3 py-1 text-xs font-semibold text-white`}
											>
												{PropertyDetail.propertyStatus}
											</span>
											<button
												type="button"
												aria-label="Save modern family home"
												className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm transition-colors hover:text-rose-500"
											>
												<Heart className="h-4 w-4" />
											</button>
										</div>
										<div className="px-3 pb-3 pt-2">
											{/*  */}
											{PropertyDetail.propertyStatus === 'For Sale' ? (
												<p className="text-base font-bold text-slate-900">
													${PropertyDetail.price}
												</p>
											) : (
												<p className="text-base font-bold text-slate-900">
													${PropertyDetail.price}
													<span className="text-xs font-semibold text-slate-600">
														/month
													</span>
												</p>
											)}
											<h3 className="mt-1 text-sm font-semibold text-slate-900">
												{PropertyDetail.title}
											</h3>
											<div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
												<MapPin className="h-3.5 w-3.5 text-[#087A5B]" />
												{PropertyDetail.location}
											</div>
											<div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-[10px] text-slate-600">
												<span className="inline-flex items-center gap-1">
													<BedDouble className="h-3.5 w-3.5" />{' '}
													{PropertyDetail.bed}
												</span>
												<span className="inline-flex items-center gap-1">
													<Bath className="h-3.5 w-3.5" /> {PropertyDetail.bath}
												</span>
												<span className="inline-flex items-center gap-1">
													<Maximize2 className="h-3.5 w-3.5" />{' '}
													{PropertyDetail.size}
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
