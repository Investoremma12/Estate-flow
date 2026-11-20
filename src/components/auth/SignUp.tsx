import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import HeaderImage from '../../assets/images/header-icon.png';

import {
	Home,
	User,
	Mail,
	Lock,
	Eye,
	EyeOff,
	CheckCircle2,
	ArrowRight,
	MapPin,
	Star,
	ShieldCheck,
} from 'lucide-react';

interface SignUpFormData {
	fullName: string;
	email: string;
	password: string;
	confirmPassword: string;
	agreeToTerms: boolean;
}

const benefits = [
	'Access to 10K+ verified properties',
	'Connect with trusted agents',
	'Get personalized recommendations',
	'Enjoy a smooth and secure experience',
];

export default function SignUp() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SignUpFormData>();

	const password = watch('password');

	const onSubmit = (data: SignUpFormData) => {
		console.log(data);
	};

	return (
		<div className="min-h-screen bg-[#f8f8f6] lg:flex font-poppins">
			<div className="relative hidden min-h-screen overflow-hidden bg-[#17211c] lg:flex lg:w-[52%] xl:w-[55%]">
				{/* Background image */}
				<div
					className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-[1.02]"
					style={{
						backgroundImage:
							"url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90')",
					}}
				/>

				{/* Cinematic overlays */}
				<div className="absolute inset-0 bg-[#0c1510]/45" />

				<div className="absolute inset-0 bg-gradient-to-b from-[#07100b]/85 via-[#07100b]/15 to-[#07100b]/90" />

				<div className="absolute inset-0 bg-gradient-to-r from-[#07100b]/60 via-transparent to-transparent" />

				{/* Subtle grain */}
				<div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%22.5%22/%3E%3C/svg%3E')]" />

				{/* Decorative vertical line */}
				<div className="absolute left-10 top-0 h-full w-px bg-white/10 xl:left-14" />

				{/* Content */}
				<div className="relative z-10 flex w-full flex-col justify-between px-12 py-10 xl:px-16 xl:py-12">
					{/* Top navigation / Logo */}
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

					{/* Main content */}
					<div className="max-w-xl pb-8 pt-20 xl:pb-12">
						{/* Eyebrow */}
						<div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 backdrop-blur-md">
							<ShieldCheck
								size={14}
								className="text-emerald-300"
								strokeWidth={2}
							/>

							<span className="text-xs font-medium text-white/80">
								A smarter way to find your next home
							</span>
						</div>

						{/* Heading */}
						<h1 className="max-w-lg text-5xl font-semibold leading-[1.04] tracking-[-0.035em] text-white xl:text-6xl">
							Find a place
							<br />
							<span className="font-serif italic font-normal text-emerald-300">
								worth calling home.
							</span>
						</h1>

						<p className="mt-6 max-w-md text-[15px] leading-7 text-white/65 xl:text-base">
							Discover carefully selected properties, trusted professionals, and
							a simpler way to move into the home you've always wanted.
						</p>

						{/* Benefits */}
						<div className="mt-8 grid max-w-lg grid-cols-2 gap-x-8 gap-y-4">
							{benefits.map((benefit) => (
								<div key={benefit} className="flex items-start gap-2.5">
									<div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-400/15">
										<CheckCircle2 size={12} className="text-emerald-300" />
									</div>

									<span className="text-xs leading-5 text-white/70">
										{benefit}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Bottom area */}
					<div className="flex items-end justify-between gap-8">
						{/* Property card */}
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

						{/* Stats */}
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

				{/* Bottom decorative glow */}
				<div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

				<div className="pointer-events-none absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />
			</div>

			{/* =========================================================
			    RIGHT — SIGN UP FORM
			========================================================= */}
			<div className="flex min-h-screen flex-1 flex-col justify-center bg-[#fafaf8] px-6 py-10 sm:px-10 md:px-16 lg:px-12 xl:px-20">
				{/* Top sign-in link */}
				<div className="mb-10 flex justify-end">
					<p className="text-sm text-neutral-500">
						Already have an account?{' '}
						<Link
							to="/signin"
							className="ml-1 inline-flex items-center gap-1 font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
						>
							Sign In
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
							Get started
						</p>

						<h2 className="text-3xl font-semibold tracking-[-0.025em] text-neutral-950 sm:text-4xl">
							Create your account
						</h2>

						<p className="mt-2.5 text-sm leading-6 text-neutral-500">
							Join EstateFlow and start discovering properties that feel right
							for you.
						</p>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
						{/* Full Name */}
						<div>
							<label className="mb-2 block text-xs font-semibold text-neutral-700">
								Full Name <span className="text-red-500">*</span>
							</label>

							<div className="relative">
								<User
									size={16}
									className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
								/>

								<input
									type="text"
									placeholder="Enter your full name"
									className="h-12 w-full rounded-xl border border-neutral-200 bg-white pl-11 pr-4 text-sm text-neutral-900 shadow-sm outline-none transition-all placeholder:text-neutral-400 hover:border-neutral-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
									{...register('fullName', {
										required: 'Full name is required',
									})}
								/>
							</div>

							{errors.fullName && (
								<p className="mt-1.5 text-xs text-red-500">
									{errors.fullName.message}
								</p>
							)}
						</div>

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
							<label className="mb-2 block text-xs font-semibold text-neutral-700">
								Password <span className="text-red-500">*</span>
							</label>

							<div className="relative">
								<Lock
									size={16}
									className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
								/>

								<input
									type={showPassword ? 'text' : 'password'}
									placeholder="Create a password"
									className="h-12 w-full rounded-xl border border-neutral-200 bg-white pl-11 pr-11 text-sm text-neutral-900 shadow-sm outline-none transition-all placeholder:text-neutral-400 hover:border-neutral-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
									{...register('password', {
										required: 'Password is required',
										minLength: {
											value: 8,
											message: 'Password must be at least 8 characters',
										},
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

						{/* Confirm Password */}
						<div>
							<label className="mb-2 block text-xs font-semibold text-neutral-700">
								Confirm Password <span className="text-red-500">*</span>
							</label>

							<div className="relative">
								<Lock
									size={16}
									className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
								/>

								<input
									type={showConfirmPassword ? 'text' : 'password'}
									placeholder="Confirm your password"
									className="h-12 w-full rounded-xl border border-neutral-200 bg-white pl-11 pr-11 text-sm text-neutral-900 shadow-sm outline-none transition-all placeholder:text-neutral-400 hover:border-neutral-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
									{...register('confirmPassword', {
										required: 'Please confirm your password',
										validate: (value) =>
											value === password || 'Passwords do not match',
									})}
								/>

								<button
									type="button"
									onClick={() => setShowConfirmPassword((v) => !v)}
									className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-700"
									aria-label={
										showConfirmPassword ? 'Hide password' : 'Show password'
									}
								>
									{showConfirmPassword ? (
										<EyeOff size={16} />
									) : (
										<Eye size={16} />
									)}
								</button>
							</div>

							{errors.confirmPassword && (
								<p className="mt-1.5 text-xs text-red-500">
									{errors.confirmPassword.message}
								</p>
							)}
						</div>

						{/* Terms */}
						<div>
							<label className="flex items-start gap-3 text-xs leading-5 text-neutral-500">
								<input
									type="checkbox"
									className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-emerald-700 focus:ring-emerald-600"
									{...register('agreeToTerms', {
										required: 'You must agree to the terms to continue',
									})}
								/>

								<span>
									I agree to the{' '}
									<a
										href="#"
										className="font-medium text-emerald-700 underline underline-offset-2"
									>
										Terms of Service
									</a>{' '}
									and{' '}
									<a
										href="#"
										className="font-medium text-emerald-700 underline underline-offset-2"
									>
										Privacy Policy
									</a>
									.
								</span>
							</label>

							{errors.agreeToTerms && (
								<p className="mt-1.5 text-xs text-red-500">
									{errors.agreeToTerms.message}
								</p>
							)}
						</div>

						{/* Submit */}
						<button
							type="submit"
							className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition-all hover:-translate-y-0.5 hover:bg-emerald-900 hover:shadow-xl hover:shadow-emerald-900/15 active:translate-y-0"
						>
							Create Account
							<ArrowRight
								size={16}
								className="transition-transform duration-200 group-hover:translate-x-0.5"
							/>
						</button>

						{/* Divider */}
						<div className="flex items-center gap-4 py-1">
							<div className="h-px flex-1 bg-neutral-200" />

							<span className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
								Or
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

						<p className="pt-2 text-center text-[11px] leading-5 text-neutral-400">
							By signing up, you agree to our{' '}
							<a
								href="#"
								className="text-emerald-700 underline underline-offset-2"
							>
								Terms of Service
							</a>{' '}
							and{' '}
							<a
								href="#"
								className="text-emerald-700 underline underline-offset-2"
							>
								Privacy Policy
							</a>
							.
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}
