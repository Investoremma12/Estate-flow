import HeroBackground from '../../assets/images/house9.jpg';
import Button from '../ui/Button';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
	const navigate = useNavigate();

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

				<div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center">
					<Button
						type="button"
						onClick={() => navigate('/properties')}
						className="group w-fit gap-2 rounded-lg px-5 py-3 text-white shadow-lg shadow-emerald-950/20"
					>
						Explore properties
						<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Button>
					<div className="flex items-center gap-3 text-white/85">
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
							<ShieldCheck className="h-5 w-5 text-emerald-200" />
						</div>
						<div>
							<p className="text-sm font-semibold">Find your next home with confidence</p>
							<p className="mt-0.5 text-xs text-white/65">
								Curated properties. Trusted local experts.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
