import SectionHeading from '../ui/SectionHeading';
import { ArrowRight } from 'lucide-react';
import PropertyCard from '../propertypage/PropertyCards';
import PropertyDetails from '../../data/Property';
import { useNavigate } from 'react-router-dom';

export default function PropertySection() {
	const navigate = useNavigate();

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
								onClick={() => navigate('/properties')}
								className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#087A5B] hover:text-[#066A4F]"
							>
								view all properties
								<ArrowRight className="h-4 w-4" />
							</button>
						</div>
					</div>

					<div className="mt-8">
						<div className="-mx-4 min-w-0 overflow-x-auto px-4 pb-4 snap-x snap-mandatory sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
							<PropertyCard
								properties={PropertyDetails.slice(0, 4)}
								gridClassName="flex w-max gap-4"
								cardClassName="w-[82vw] max-w-[20rem] shrink-0 snap-start sm:w-[42vw] sm:max-w-none lg:w-[calc((100vw-8rem)/4)] lg:max-w-[20rem]"
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
