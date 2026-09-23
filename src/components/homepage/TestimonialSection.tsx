import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

interface Testimonial {
	quote: string;
	name: string;
	role: string;
	avatar: string;
	rating: number;
}

const testimonials: Testimonial[] = [
	{
		quote:
			'EstateFlow made finding our dream home so easy! The team was incredibly helpful, responsive, and guided us through every step of the process. We could not be happier!',
		name: 'Jessica Miller',
		role: 'Home Buyer',
		avatar: 'https://i.pravatar.cc/100?img=47',
		rating: 5,
	},
	{
		quote:
			'From the first showing to closing day, everything felt effortless. Our agent anticipated questions before we even asked them.',
		name: 'David Chen',
		role: 'Home Buyer',
		avatar: 'https://i.pravatar.cc/100?img=12',
		rating: 5,
	},
	{
		quote:
			'Selling our house felt overwhelming until we worked with EstateFlow. They handled everything and got us above asking price.',
		name: 'Maria Alvarez',
		role: 'Home Seller',
		avatar: 'https://i.pravatar.cc/100?img=32',
		rating: 5,
	},
];

export default function TestimonialSection() {
	const [index, setIndex] = useState(0);
	const current = testimonials[index];

	const goPrev = () =>
		setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
	const goNext = () =>
		setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

	return (
		<section className="bg-white py-16 font-poppins sm:py-20">
			<div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-14 lg:px-8">
				<div className="w-full lg:max-w-sm">
					<SectionHeading
						title="Testimonials"
						className="mb-2 text-[10px] tracking-[0.18em]"
					/>
					<h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
						What Our Clients Say
					</h2>
					<p className="mt-3 max-w-md text-sm leading-6 text-slate-600 sm:text-[15px]">
						Do not just take our word for it. Here is what our clients have to
						say about their experience with EstateFlow.
					</p>
				</div>

				<div className="flex w-full min-w-0 max-w-2xl flex-col gap-4 sm:flex-row sm:items-center">
					<div className="min-w-0 flex-1 rounded-3xl border border-slate-200 bg-[#f5faf7] p-5 shadow-sm sm:p-7">
						<div className="flex items-start gap-3.5">
							<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#dcefe8] text-[#087A5B]">
								<Quote className="h-4 w-4 fill-current" />
							</div>
							<p className="min-w-0 text-sm leading-6 text-slate-700">
								{current.quote}
							</p>
						</div>

						<div className="mt-6 flex items-center justify-between gap-3 border-t border-[#dcefe8] pt-4">
							<div className="flex min-w-0 items-center gap-3">
								<img
									src={current.avatar}
									alt={current.name}
									className="h-11 w-11 shrink-0 rounded-full object-cover"
								/>
								<div className="min-w-0">
									<p className="truncate text-sm font-semibold text-slate-900">
										{current.name}
									</p>
									<p className="text-xs text-slate-500">{current.role}</p>
								</div>
							</div>
							<div className="flex shrink-0 gap-0.5">
								{Array.from({ length: current.rating }).map((_, starIndex) => (
									<Star
										key={starIndex}
										className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
									/>
								))}
							</div>
						</div>

						<div className="mt-5 flex gap-1.5">
							{testimonials.map((testimonial, testimonialIndex) => (
								<button
									type="button"
									key={testimonial.name}
									onClick={() => setIndex(testimonialIndex)}
									aria-label={`Go to testimonial ${testimonialIndex + 1}`}
									className={`h-1.5 rounded-full transition-all ${
										testimonialIndex === index
											? 'w-6 bg-[#087A5B]'
											: 'w-1.5 bg-[#b9d9ce]'
									}`}
								/>
							))}
						</div>
					</div>

					<div className="flex justify-end gap-2 sm:flex-col">
						<button
							type="button"
							onClick={goPrev}
							aria-label="Previous testimonial"
							className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:border-[#087A5B] hover:bg-[#eaf4f1] hover:text-[#087A5B]"
						>
							<ChevronLeft className="h-4 w-4" />
						</button>
						<button
							type="button"
							onClick={goNext}
							aria-label="Next testimonial"
							className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:border-[#087A5B] hover:bg-[#eaf4f1] hover:text-[#087A5B]"
						>
							<ChevronRight className="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
