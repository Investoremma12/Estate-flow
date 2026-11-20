import { Bath, BedDouble, Heart, MapPin, Maximize2 } from 'lucide-react';
import Property from '../../data/Property';
import fallbackImage from '../../assets/images/house1.jpg';
import { Link } from 'react-router-dom'

type Property = (typeof Property)[number];

interface PropertyCardProps {
	properties?: Property[];
	gridClassName?: string;
	cardClassName?: string;
}

export default function PropertyCard({
	properties = Property,
	gridClassName = 'mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3',
	cardClassName = 'w-full',
}: PropertyCardProps) {
	return (
		<>
			<div>
				<div className={gridClassName}>
					{properties.map((PropertyDetail) => (
						<Link to={`/property/${PropertyDetail.id}`}>
						<div
							key={PropertyDetail.id}
							className={`${cardClassName} overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg`}
						>
							<div className="relative h-44 overflow-hidden p-1">
								<img
									src={PropertyDetail.image}
									alt={PropertyDetail.title}
									className="h-full w-full rounded-md object-cover"
									onError={(event) => {
										event.currentTarget.onerror = null;
										event.currentTarget.src = fallbackImage;
									}}
								/>
								<span
									className={`absolute bottom-1 left-3 rounded-br-md rounded-tl-md ${PropertyDetail.propertyStatus === 'For Sale' ? 'bg-[#087A5B]' : 'bg-[#6D67FA]'} px-3 py-1 text-xs font-semibold text-white`}
								>
									{PropertyDetail.propertyStatus}
								</span>
								<button
									type="button"
									aria-label={`Save ${PropertyDetail.title}`}
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
										<BedDouble className="h-3.5 w-3.5" /> {PropertyDetail.bed}
									</span>
									<span className="inline-flex items-center gap-1">
										<Bath className="h-3.5 w-3.5" /> {PropertyDetail.bath}
									</span>
									<span className="inline-flex items-center gap-1">
										<Maximize2 className="h-3.5 w-3.5" /> {PropertyDetail.size}
									</span>
								</div>
							</div>
						</div></Link>
					))}
				</div>
			</div>
		</>
	);
}
