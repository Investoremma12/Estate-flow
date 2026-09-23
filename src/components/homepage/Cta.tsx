import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function Cta() {
	return (
		<section
			className="relative overflow-hidden bg-[#0F2E22] py-8 font-poppins"
			style={{
				background:
					'linear-gradient(90deg, #0F2E22 0%, #163D2C 45%, #1F4A35 100%)',
			}}
		>
			{/* Background house image, faded on the right */}
			<div
				className="pointer-events-none absolute inset-y-0 right-0 w-2/3 bg-cover bg-center opacity-25 sm:w-1/2"
				style={{
					backgroundImage:
						"url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800')",
					maskImage: 'linear-gradient(to right, transparent, black 40%)',
					WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)',
				}}
			/>

			<div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-8">
				<div className="max-w-2xl">
					<p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
						Ready to find your dream home?
					</p>
					<h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
						Start Your Real Estate Journey Today
					</h2>
					<p className="mt-2 max-w-xl text-sm leading-5 text-emerald-100/80">
						Browse thousands of properties, connect with expert agents, and make
						your dream a reality.
					</p>
				</div>

				<Button
					type="button"
					className="relative z-10 w-fit shrink-0 gap-2 rounded-lg bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-900 hover:bg-white"
				>
					Explore Properties
					<ArrowRight className="h-4 w-4" />
				</Button>
			</div>
		</section>
	);
}
