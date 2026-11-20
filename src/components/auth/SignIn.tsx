import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import HeaderImage from '../../assets/images/header-icon.png';
import {
	Home,
	Mail,
	Lock,
	Eye,
	EyeOff,
	ArrowRight,
	ShieldCheck,
	MapPin,
	Star,
	CheckCircle2,
} from 'lucide-react';

interface SignInFormData {
	email: string;
	password: string;
	rememberMe: boolean;
}

export default function SignIn() {
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormData>();

	const onSubmit = (data: SignInFormData) => {
		console.log(data);
	};

	return (
		<div className="min-h-screen bg-[#f8f8f6] lg:flex font-poppins">
			{/* =========================================================
			    LEFT — PREMIUM VISUAL PANEL
			========================================================= */}
			<div className="relative hidden min-h-screen overflow-hidden bg-[#17211c] lg:flex lg:w-[52%] xl:w-[55%]">
				{/* Main background image */}
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{
						backgroundImage:
							"url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90')",
					}}
				/>

				{/* Cinematic overlays */}
				<div className="absolute inset-0 bg-[#07100b]/45" />

				<div className="absolute inset-0 bg-gradient-to-b from-[#07100b]/85 via-[#07100b]/15 to-[#07100b]/90" />

				<div className="absolute inset-0 bg-gradient-to-r from-[#07100b]/65 via-transparent to-transparent" />

				{/* Grain */}
				<div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%22.5%22/%3E%3C/svg%3E')]" />

				{/* Decorative line */}
				<div className="absolute left-10 top-0 h-full w-px bg-white/10 xl:left-14" />

				<div className="relative z-10 flex w-full flex-col justify-between px-12 py-10 xl:px-16 xl:py-12">
					{/* Logo */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-md">
								<img src={HeaderImage} className="h-8 w-10" />
							</div>

							<div>
								<p className="text-lg font-semibold tracking-tight text-white">
									EstateFlow
								</p>

								<p className="text-[10px] uppercase tracking-[0.25em] text-white/50">
									Real Estate
								</p>
							</div>
						</div>

						<div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
							<div className="flex items-center gap-2">
								<div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />

								<span className="text-[11px] font-medium text-white/80">
									Trusted platform
								</span>
							</div>
						</div>
					</div>

					{/* Main message */}
					<div className="max-w-xl pb-10 pt-20">
						<div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 backdrop-blur-md">
							<ShieldCheck size={14} className="text-emerald-300" />

							<span className="text-xs font-medium text-white/80">
								Welcome back to EstateFlow
							</span>
						</div>

						<h1 className="max-w-lg text-5xl font-semibold leading-[1.04] tracking-[-0.035em] text-white xl:text-6xl">
							Your next chapter
							<br />
							<span className="font-serif italic font-normal text-emerald-300">
								starts here.
							</span>
						</h1>

						<p className="mt-6 max-w-md text-[15px] leading-7 text-white/65 xl:text-base">
							Sign in to continue exploring verified properties, connect with
							trusted agents, and manage your real-estate journey.
						</p>

						{/* Trust points */}
						<div className="mt-8 space-y-4">
							<div className="flex items-center gap-3">
								<div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/10">
									<CheckCircle2 size={15} className="text-emerald-300" />
								</div>

								<div>
									<p className="text-xs font-medium text-white">
										10,000+ verified properties
									</p>

									<p className="mt-0.5 text-[10px] text-white/45">
										Carefully selected listings
									</p>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/10">
									<CheckCircle2 size={15} className="text-emerald-300" />
								</div>

								<div>
									<p className="text-xs font-medium text-white">
										Trusted professionals
									</p>

									<p className="mt-0.5 text-[10px] text-white/45">
										Connect with verified agents
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Bottom property card */}
					<div className="flex items-end justify-between gap-8">
						<div className="w-[290px] rounded-2xl border border-white/15 bg-black/25 p-3 shadow-2xl backdrop-blur-xl">
							<div className="relative h-32 overflow-hidden rounded-xl">
								<img
									src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=85"
									alt="Luxury modern home"
									className="h-full w-full object-cover"
								/>

								<div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-neutral-800">
									Featured
								</div>
							</div>

							<div className="px-1 pt-3">
								<div className="flex items-center justify-between">
									<p className="text-sm font-semibold text-white">
										Modern Residence
									</p>

									<div className="flex items-center gap-1 text-[10px] text-amber-300">
										<Star size={11} fill="currentColor" />
										4.9
									</div>
								</div>

								<div className="mt-1 flex items-center gap-1.5 text-[10px] text-white/50">
									<MapPin size={11} />
									<span>Lekki Phase 1, Lagos</span>
								</div>
							</div>
						</div>

						<div className="hidden pb-1 text-right xl:block">
							<p className="text-3xl font-semibold tracking-tight text-white">
								10K+
							</p>

							<p className="mt-1 text-[11px] text-white/50">
								Verified properties
							</p>
						</div>
					</div>
				</div>

				{/* Decorative glow */}
				<div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

				<div className="pointer-events-none absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />
			</div>

			{/* =========================================================
			    RIGHT — SIGN IN FORM
			========================================================= */}
			<div className="flex min-h-screen flex-1 flex-col justify-center bg-[#fafaf8] px-6 py-10 sm:px-10 md:px-16 lg:px-12 xl:px-20">
				{/* Sign up link */}
				<div className="mb-10 flex justify-end">
					<p className="text-sm text-neutral-500">
						Don't have an account?{' '}
						<Link
							to="/signup"
							className="ml-1 inline-flex items-center gap-1 font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
						>
							Create Account
							<ArrowRight size={14} />
						</Link>
					</p>
				</div>

				<div className="mx-auto w-full max-w-[430px]">
					{/* Mobile logo */}
					<div className="mb-10 flex items-center gap-3 lg:hidden">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-800">
							<Home size={19} className="text-white" />
						</div>

						<div>
							<p className="font-semibold tracking-tight text-neutral-900">
								EstateFlow
							</p>

							<p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">
								Real Estate
							</p>
						</div>
					</div>

					{/* Heading */}
					<div className="mb-8">
						<p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
							Welcome back
						</p>

						<h2 className="text-3xl font-semibold tracking-[-0.025em] text-neutral-950 sm:text-4xl">
							Sign in to your account
						</h2>

						<p className="mt-2.5 text-sm leading-6 text-neutral-500">
							Continue your journey and discover your next perfect property.
						</p>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
						{/* Email */}
						<div>
							<label className="mb-2 block text-xs font-semibold text-neutral-700">
								Email Address <span className="text-red-500">*</span>
							</label>

							<div className="relative">
								<Mail
									size={16}
									className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
								/>

								<input
									type="email"
									placeholder="you@example.com"
									className="h-12 w-full rounded-xl border border-neutral-200 bg-white pl-11 pr-4 text-sm text-neutral-900 shadow-sm outline-none transition-all placeholder:text-neutral-400 hover:border-neutral-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
									{...register('email', {
										required: 'Email is required',
										pattern: {
											value: /^\S+@\S+\.\S+$/,
											message: 'Enter a valid email address',
										},
									})}
								/>
							</div>

							{errors.email && (
								<p className="mt-1.5 text-xs text-red-500">
									{errors.email.message}
								</p>
							)}
						</div>

						{/* Password */}
						<div>
							<div className="mb-2 flex items-center justify-between">
								<label className="block text-xs font-semibold text-neutral-700">
									Password <span className="text-red-500">*</span>
								</label>

								<Link
									to="/forgot-password"
									className="text-xs font-medium text-emerald-700 transition-colors hover:text-emerald-800"
								>
									Forgot password?
								</Link>
							</div>

							<div className="relative">
								<Lock
									size={16}
									className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
								/>

								<input
									type={showPassword ? 'text' : 'password'}
									placeholder="Enter your password"
									className="h-12 w-full rounded-xl border border-neutral-200 bg-white pl-11 pr-11 text-sm text-neutral-900 shadow-sm outline-none transition-all placeholder:text-neutral-400 hover:border-neutral-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
									{...register('password', {
										required: 'Password is required',
									})}
								/>

								<button
									type="button"
									onClick={() => setShowPassword((v) => !v)}
									className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-700"
									aria-label={showPassword ? 'Hide password' : 'Show password'}
								>
									{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
								</button>
							</div>

							{errors.password && (
								<p className="mt-1.5 text-xs text-red-500">
									{errors.password.message}
								</p>
							)}
						</div>

						{/* Remember me */}
						<div className="flex items-center">
							<label className="flex cursor-pointer items-center gap-2.5 text-xs text-neutral-500">
								<input
									type="checkbox"
									className="h-4 w-4 rounded border-neutral-300 text-emerald-700 focus:ring-emerald-600"
									{...register('rememberMe')}
								/>

								<span>Keep me signed in</span>
							</label>
						</div>

						{/* Submit */}
						<button
							type="submit"
							className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition-all hover:-translate-y-0.5 hover:bg-emerald-900 hover:shadow-xl hover:shadow-emerald-900/15 active:translate-y-0"
						>
							Sign In
							<ArrowRight
								size={16}
								className="transition-transform duration-200 group-hover:translate-x-0.5"
							/>
						</button>

						{/* Divider */}
						<div className="flex items-center gap-4 py-1">
							<div className="h-px flex-1 bg-neutral-200" />

							<span className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
								Or continue with
							</span>

							<div className="h-px flex-1 bg-neutral-200" />
						</div>

						{/* Google */}
						<button
							type="button"
							className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white text-sm font-semibold text-neutral-700 shadow-sm transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:shadow"
						>
							<img
								src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
								alt="Google"
								className="h-4 w-4"
							/>
							Continue with Google
						</button>

						{/* Security note */}
						<div className="flex items-center justify-center gap-2 pt-3 text-[11px] text-neutral-400">
							<ShieldCheck size={13} />

							<span>Your information is encrypted and secure</span>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
