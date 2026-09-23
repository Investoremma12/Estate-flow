import { House, Heart, UserRound, ShieldCheck } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const stats = [
	{
		value: '10K+',
		label: 'Properties Listed',
		icon: House,
	},
	{
		value: '5K+',
		label: 'Happy Clients',
		icon: Heart,
	},
	{
		value: '50+',
		label: 'Expert Agents',
		icon: UserRound,
	},
	{
		value: '99%',
		label: 'Satisfaction Rate',
		icon: ShieldCheck,
	},
];

export default function AboutSection() {
	return (
		<section className="relative overflow-hidden bg-[#f5faf7] py-16 sm:py-20 font-poppins">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(8,122,91,0.08),_transparent_30%)]" />
			<div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-4 sm:px-6 lg:flex-row lg:gap-14 lg:px-8">
				{/* Image + floating card */}
				<div className="relative w-full max-w-[34rem] shrink-0">
					<div className="relative overflow-hidden rounded-[1.6rem] border border-white/60 bg-white p-2 shadow-[0_24px_64px_rgba(15,23,42,0.08)]">
						<img
							src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85"
							alt="Modern living room"
							className="h-[22rem] w-full rounded-[1.2rem] object-cover sm:h-[25rem]"
						/>
						<div className="absolute inset-0 rounded-[1.2rem] bg-gradient-to-t from-slate-950/20 to-transparent" />
						<div className="absolute left-5 top-5 inline-flex items-center rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
							Trusted homes
						</div>
					</div>

					{/* Floating trust card */}
					<div className="absolute -bottom-6 right-3 w-40 rounded-2xl bg-[#004D3A] p-4 text-white shadow-[0_22px_48px_rgba(0,77,58,0.35)] sm:right-[-12px] sm:w-44 sm:p-5">
						<div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100/20">
							<House size={18} strokeWidth={2} className="text-emerald-200" />
						</div>

						<p className="text-sm font-semibold leading-5">
							Trusted by
							<br />
							thousands of happy
							<br />
							homeowners
						</p>

						<div className="mt-3 h-0.5 w-14 rounded-full bg-emerald-300" />
					</div>
				</div>

				{/* Content */}
				<div className="w-full">
					<div className="max-w-xl">
						<SectionHeading
							title="Why Choose EstateFlow"
							className="mb-2 text-[10px]"
						/>

						<h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
							More Than Just Properties
						</h2>

						<p className="mt-3 text-sm leading-6 text-slate-600 sm:text-[15px]">
							We're committed to making your real estate journey as smooth and
							successful as possible. With our expert team, advanced tools, and
							dedicated support, we help you find the right property, at the
							right price, at the right time.
						</p>
					</div>

					<div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
						{stats.map((stat, index) => {
							const Icon = stat.icon;

							return (
								<div
									key={stat.label}
									className={`rounded-2xl border border-[#dfeae6] bg-white p-4 shadow-sm ${
										index > 0 ? 'sm:ml-1' : ''
									}`}
								>
									<div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F5F1]">
										<Icon
											size={16}
											strokeWidth={1.8}
											className="text-[#087A5B]"
										/>
									</div>

									<p className="text-xl font-bold text-slate-900">
										{stat.value}
									</p>

									<p className="mt-1 text-[11px] leading-4 text-slate-500">
										{stat.label}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
