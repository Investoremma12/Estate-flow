import {
	Bath,
	BedDouble,
	Building2,
	Heart,
	House,
	MapPin,
	Maximize2,
	Trash2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Property from '../../data/Property';
import fallbackImage from '../../assets/images/house1.jpg';

type PropertyRecord = (typeof Property)[number];

interface PropertyCardProps {
	properties?: PropertyRecord[];
	gridClassName?: string;
	cardClassName?: string;
	variant?: 'default' | 'favorites';
	onRemoveFavorite?: (propertyId: number) => void;
}

export default function PropertyCard({
	properties = Property,
	gridClassName = 'mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3',
	cardClassName = 'w-full',
	variant = 'default',
	onRemoveFavorite,
}: PropertyCardProps) {
	const isFavorites = variant === 'favorites';

	return (
		<div className={gridClassName}>
			{properties.map((property) => (
				<article
					key={property.id}
					className={`${cardClassName} overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg`}
				>
					<div className="relative h-44 overflow-hidden p-1">
						<Link
							to={`/property/${property.id}`}
							aria-label={`View ${property.title}`}
							className="block h-full"
						>
							<img
								src={property.image}
								alt={property.title}
								className="h-full w-full rounded-md object-cover"
								onError={(event) => {
									event.currentTarget.onerror = null;
									event.currentTarget.src = fallbackImage;
								}}
							/>
						</Link>
						{isFavorites ? (
							<>
								<span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#087A5B] px-3 py-1 text-xs font-semibold text-white shadow-sm">
									<Heart className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
									Saved
								</span>
								<button
									type="button"
									onClick={() => onRemoveFavorite?.(property.id)}
									aria-label={`Remove ${property.title} from favorites`}
									className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm transition-colors hover:bg-rose-50 hover:text-rose-600"
								>
									<Trash2 className="h-4 w-4" aria-hidden="true" />
								</button>
							</>
						) : (
							<>
								<span
									className={`absolute bottom-1 left-3 rounded-br-md rounded-tl-md ${property.propertyStatus === 'For Sale' ? 'bg-[#087A5B]' : 'bg-[#6D67FA]'} px-3 py-1 text-xs font-semibold text-white`}
								>
									{property.propertyStatus}
								</span>
								<button
									type="button"
									aria-label={`Save ${property.title}`}
									className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm transition-colors hover:text-rose-500"
								>
									<Heart className="h-4 w-4" aria-hidden="true" />
								</button>
							</>
						)}
					</div>

					<div className="px-3 pb-3 pt-2">
						<div className="flex items-start justify-between gap-2">
							<div>
								<p className="text-base font-bold text-slate-900">
									${property.price}
									{property.propertyStatus === 'For Rent' && (
										<span className="text-xs font-semibold text-slate-600">
											/month
										</span>
									)}
								</p>
								<h3 className="mt-1 text-sm font-semibold text-slate-900">
									<Link
										to={`/property/${property.id}`}
										className="transition-colors hover:text-[#087A5B]"
									>
										{property.title}
									</Link>
								</h3>
							</div>
							{isFavorites && (
								<span
									className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${property.propertyStatus === 'For Sale' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}
								>
									{property.propertyStatus}
								</span>
							)}
						</div>

						<div className="mt-2 flex items-center gap-1 text-xs text-slate-600">
							<MapPin className="h-3.5 w-3.5 text-[#087A5B]" aria-hidden="true" />
							{property.location}
						</div>

						<div className="mt-3 flex items-center justify-between gap-2 text-[10px] text-slate-600">
							<span className="inline-flex items-center gap-1 whitespace-nowrap">
								<BedDouble className="h-3.5 w-3.5 text-slate-700" aria-hidden="true" />
								{property.bed} Beds
							</span>
							<span className="inline-flex items-center gap-1 whitespace-nowrap">
								<Bath className="h-3.5 w-3.5 text-slate-700" aria-hidden="true" />
								{property.bath} Baths
							</span>
							<span className="inline-flex items-center gap-1 whitespace-nowrap">
								<Maximize2 className="h-3.5 w-3.5 text-slate-700" aria-hidden="true" />
								{property.size} sqft
							</span>
							{isFavorites && (
								<span className="hidden items-center gap-1 whitespace-nowrap xl:inline-flex">
									{property.type === 'Apartment' ? (
										<Building2 className="h-3.5 w-3.5 text-slate-700" aria-hidden="true" />
									) : (
										<House className="h-3.5 w-3.5 text-slate-700" aria-hidden="true" />
									)}
									{property.type}
								</span>
							)}
						</div>

						{isFavorites && (
							<Link
								to={`/property/${property.id}`}
								className="mt-3 flex min-h-9 items-center justify-center gap-2 rounded-md border border-[#087A5B] text-xs font-semibold text-[#087A5B] transition-colors hover:bg-emerald-50"
							>
								<Heart className="h-4 w-4" aria-hidden="true" />
								View Details
								<span aria-hidden="true">→</span>
							</Link>
						)}
					</div>
				</article>
			))}
		</div>
	);
}
