import { useEffect, useState } from 'react';
import {
	AlertTriangle,
	ArrowRight,
	Heart,
	LogOut,
	Mail,
	Search,
	ShieldCheck,
	Trash2,
	UserRound,
	X,
} from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../components/ui/Button';
import HeroBackground from '../assets/images/house9.jpg';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import {
	deleteUserAccount,
	getCurrentAuthUser,
	signOutUser,
	updateAuthUserProfile,
	type AuthUser,
} from '../data/authStorage';

type AccountConfirmation = 'signOut' | 'deleteAccount';

export default function ProfilePage() {
	const [user, setUser] = useState<AuthUser | null>(getCurrentAuthUser);
	const [fullName, setFullName] = useState(user?.fullName ?? '');
	const [feedback, setFeedback] = useState('');
	const [feedbackType, setFeedbackType] = useState<'success' | 'error'>('success');
	const [confirmationAction, setConfirmationAction] =
		useState<AccountConfirmation | null>(null);
	const [confirmationError, setConfirmationError] = useState('');
	const navigate = useNavigate();

	const closeConfirmation = () => {
		setConfirmationAction(null);
		setConfirmationError('');
	};

	useEffect(() => {
		if (!confirmationAction) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setConfirmationAction(null);
				setConfirmationError('');
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [confirmationAction]);

	if (!user) return <Navigate to="/signin" replace />;

	const initials = user.fullName
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0])
		.join('')
		.toUpperCase();

	const saveProfile = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFeedback('');

		try {
			const updatedUser = updateAuthUserProfile(user.email, fullName);
			setUser(updatedUser);
			setFullName(updatedUser.fullName);
			setFeedbackType('success');
			setFeedback('Your profile has been updated.');
		} catch (error) {
			setFeedbackType('error');
			setFeedback(
				error instanceof Error
					? error.message
					: 'Unable to update your profile. Please try again.',
			);
		}
	};

	const confirmAccountAction = () => {
		if (!confirmationAction || !user) return;

		setConfirmationError('');
		try {
			if (confirmationAction === 'deleteAccount') {
				deleteUserAccount(user.email);
			} else {
				signOutUser();
			}

			navigate(
				confirmationAction === 'deleteAccount' ? '/signup' : '/signin',
				{ replace: true },
			);
		} catch (error) {
			setConfirmationError(
				error instanceof Error
					? error.message
					: 'Unable to complete this action. Please try again.',
			);
		}
	};

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: -16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
			>
				<Navbar />
			</motion.div>
			<main className="font-poppins">
				<motion.section
					initial={{ opacity: 0, y: 22 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
					className="relative isolate overflow-hidden bg-cover bg-center"
					style={{ backgroundImage: `url(${HeroBackground})` }}
				>
					<div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/85 via-slate-950/65 to-slate-950/20" />
					<div className="mx-auto flex min-h-44 max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
						<motion.div
							initial={{ opacity: 0, x: -18 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.7, delay: 0.16 }}
						>
							<p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
								Account
							</p>
							<h1 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
								My Profile
							</h1>
							<p className="mt-2 max-w-lg text-sm leading-6 text-slate-100">
								Manage your personal details and get back to the properties you
								love.
							</p>
						</motion.div>
					</div>
				</motion.section>

				<div className="min-h-[55vh] bg-[#f8faf9] px-4 py-8 sm:px-6 lg:px-8">
					<div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
						<motion.section
							aria-labelledby="profile-details-title"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.12 }}
							className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
						>
							<div className="flex items-center gap-4 border-b border-slate-100 pb-6">
								<div
									aria-hidden="true"
									className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-[#087A5B]"
								>
									{initials || <UserRound className="h-7 w-7" />}
								</div>
								<div className="min-w-0">
									<p className="text-xs font-semibold uppercase tracking-wide text-[#087A5B]">
										Your account
									</p>
									<h2 className="mt-1 truncate text-xl font-bold text-slate-900">
										{user.fullName}
									</h2>
									<p className="truncate text-sm text-slate-500">{user.email}</p>
								</div>
							</div>

							<form onSubmit={saveProfile} className="mt-6">
								<h2
									id="profile-details-title"
									className="text-lg font-bold text-slate-900"
								>
									Personal details
								</h2>
								<p className="mt-1 text-sm text-slate-600">
									Keep your account information up to date.
								</p>

								<label
									htmlFor="profile-name"
									className="mt-5 block text-sm font-medium text-slate-700"
								>
									Full name
								</label>
								<input
									id="profile-name"
									type="text"
									value={fullName}
									onChange={(event) => setFullName(event.target.value)}
									autoComplete="name"
									maxLength={80}
									required
									className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-900 outline-none transition focus:border-[#087A5B] focus:ring-2 focus:ring-emerald-100"
								/>

								<label
									htmlFor="profile-email"
									className="mt-4 block text-sm font-medium text-slate-700"
								>
									Email address
								</label>
								<div className="relative mt-2">
									<Mail
										className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
										aria-hidden="true"
									/>
									<input
										id="profile-email"
										type="email"
										value={user.email}
										readOnly
										className="min-h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-600 outline-none"
									/>
								</div>
								<p className="mt-1 text-xs text-slate-500">
									This email is used to sign in and can’t be changed here.
								</p>

								{feedback && (
									<p
										role={feedbackType === 'error' ? 'alert' : 'status'}
										className={`mt-4 text-sm ${feedbackType === 'error' ? 'text-red-600' : 'text-emerald-700'}`}
									>
										{feedback}
									</p>
								)}

								<Button
									type="submit"
									disabled={fullName.trim() === user.fullName}
									className="mt-6 min-h-11 px-5 text-white disabled:bg-slate-300"
								>
									Save Changes
								</Button>
							</form>
						</motion.section>

						<motion.aside
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.22 }}
							className="flex flex-col gap-4"
						>
							<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<h2 className="text-base font-bold text-slate-900">
									Quick links
								</h2>
								<Link
									to="/favorites"
									className="mt-3 flex min-h-14 items-center justify-between rounded-xl border border-slate-100 px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-[#087A5B]"
								>
									<span className="flex items-center gap-3">
										<Heart className="h-5 w-5" aria-hidden="true" />
										My Favorites
									</span>
									<ArrowRight className="h-4 w-4" aria-hidden="true" />
								</Link>
								<Link
									to="/properties"
									className="mt-2 flex min-h-14 items-center justify-between rounded-xl border border-slate-100 px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-[#087A5B]"
								>
									<span className="flex items-center gap-3">
										<Search className="h-5 w-5" aria-hidden="true" />
										Browse Properties
									</span>
									<ArrowRight className="h-4 w-4" aria-hidden="true" />
								</Link>
							</section>

							<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<h2 className="text-base font-bold text-slate-900">
									Account actions
								</h2>
								<p className="mt-1 text-xs leading-5 text-slate-600">
									Manage your session or permanently remove this local account.
								</p>
								<button
									type="button"
									onClick={() => {
										setConfirmationError('');
										setConfirmationAction('signOut');
									}}
									className="mt-4 flex min-h-11 w-full items-center gap-3 rounded-lg bg-[#087A5B] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#066A4F]"
								>
									<LogOut className="h-4 w-4" aria-hidden="true" />
									Sign Out
								</button>
								<button
									type="button"
									onClick={() => {
										setConfirmationError('');
										setConfirmationAction('deleteAccount');
									}}
									className="mt-2 flex min-h-11 w-full items-center gap-3 rounded-lg border border-red-200 bg-white px-4 text-left text-sm font-semibold text-red-700 transition-colors hover:bg-red-50"
								>
									<Trash2 className="h-4 w-4" aria-hidden="true" />
									Delete Account
								</button>
							</section>

							<section className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-5">
								<div className="flex items-start gap-3">
									<ShieldCheck
										className="mt-0.5 h-5 w-5 shrink-0 text-[#087A5B]"
										aria-hidden="true"
									/>
									<div>
										<h2 className="text-sm font-bold text-slate-900">
											Your account, your device
										</h2>
										<p className="mt-1 text-xs leading-5 text-slate-600">
											This demo stores account details in this browser. They
											won’t sync to other devices.
										</p>
									</div>
								</div>
							</section>
						</motion.aside>
					</div>
				</div>
			</main>
			<motion.div
				initial={{ opacity: 0, y: 18 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.08 }}
				transition={{ duration: 0.7 }}
			>
				<Footer />
			</motion.div>
			<AnimatePresence>
				{confirmationAction && user && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.22 }}
						className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 px-5 py-8 backdrop-blur-sm"
						onClick={(event) => {
							if (event.target === event.currentTarget) closeConfirmation();
						}}
					>
						<motion.div
							initial={{ opacity: 0, y: 22, scale: 0.96 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 12, scale: 0.97 }}
							transition={{ type: 'spring', stiffness: 280, damping: 26 }}
							role="alertdialog"
							aria-modal="true"
							aria-labelledby="profile-confirmation-title"
							aria-describedby="profile-confirmation-description"
							className="relative w-full max-w-md rounded-3xl border border-white/70 bg-white p-7 shadow-2xl shadow-slate-950/25 sm:p-8"
						>
							<button
								type="button"
								aria-label="Close confirmation"
								onClick={closeConfirmation}
								className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
							>
								<X size={18} />
							</button>
							<div
								className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${
									confirmationAction === 'deleteAccount'
										? 'bg-red-50 text-red-600'
										: 'bg-emerald-50 text-emerald-700'
								}`}
							>
								{confirmationAction === 'deleteAccount' ? (
									<AlertTriangle size={23} />
								) : (
									<LogOut size={22} />
								)}
							</div>
							<p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
								{confirmationAction === 'deleteAccount'
									? 'Account deletion'
									: 'Sign out'}
							</p>
							<h2
								id="profile-confirmation-title"
								className="mt-2 text-2xl font-semibold tracking-tight text-slate-950"
							>
								{confirmationAction === 'deleteAccount'
									? 'Are you sure you want to delete your account?'
									: 'Are you sure you want to sign out?'}
							</h2>
							<p
								id="profile-confirmation-description"
								className="mt-3 text-sm leading-6 text-slate-600"
							>
								{confirmationAction === 'deleteAccount'
									? 'This permanently deletes your EstateFlow account and cannot be undone.'
									: 'You can sign back in anytime to continue your EstateFlow journey.'}
							</p>
							<p className="mt-2 text-sm font-medium text-slate-800">
								{user.email}
							</p>
							{confirmationError && (
								<p className="mt-4 text-sm text-red-600" role="alert">
									{confirmationError}
								</p>
							)}
							<div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
								<button
									type="button"
									autoFocus
									onClick={closeConfirmation}
									className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
								>
									Cancel
								</button>
								<button
									type="button"
									onClick={confirmAccountAction}
									className={`rounded-xl px-5 py-3 text-sm font-semibold text-white transition-colors ${
										confirmationAction === 'deleteAccount'
											? 'bg-red-600 hover:bg-red-700'
											: 'bg-emerald-800 hover:bg-emerald-900'
									}`}
								>
									{confirmationAction === 'deleteAccount'
										? 'Delete Account'
										: 'Sign Out'}
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
