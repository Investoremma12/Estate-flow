import HeaderImage from '../assets/images/header-icon.png';

import {
	Heart,
	Search,
	Menu,
	X,
	UserRound,
	ChevronRight,
	House,
	Mail,
	Info,
	Users,
	Home,
	UserRoundPlus,
	Bookmark,
	Settings,
	ArrowRight,
	LogOut,
	Trash2,
	AlertTriangle,
} from 'lucide-react';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
	deleteUserAccount,
	getCurrentAuthUser,
	signOutUser,
	type AuthUser,
} from '../data/authStorage';

const NavLinks = [
	{
		links: 'Home',
		icons: House,
		path: '/',
	},
	{
		links: 'Properties',
		icons: Home,
		path: '/properties',
	},
	{
		links: 'Agents',
		icons: Users,
		path: '/agent',
	},
	{
		links: 'About',
		icons: Info,
		path: '/about',
	},
	{
		links: 'Contact',
		icons: Mail,
		path: '/contact',
	},
];

const MenuOptions = [
	{
		links: 'Saved Properties',
		icons: Heart,
	},
	{
		links: 'Favorites',
		icons: Bookmark,
	},
	{
		links: 'Settings',
		icons: Settings,
	},
];

type AccountConfirmation = 'signOut' | 'deleteAccount';

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [currentUser, setCurrentUser] = useState<AuthUser | null>(() =>
		getCurrentAuthUser(),
	);
	const [confirmationAction, setConfirmationAction] =
		useState<AccountConfirmation | null>(null);
	const [confirmationError, setConfirmationError] = useState('');
	const navigate = useNavigate();

	const goToAuth = (path: '/signin' | '/signup') => {
		setIsMenuOpen(false);
		navigate(path);
	};

	const goToNavLink = (path?: string) => {
		setIsMenuOpen(false);
		if (path) navigate(path);
	};

	const goToFavorites = () => {
		setIsMenuOpen(false);
		navigate('/favorites');
	};

	const goToMenuOption = (option: string) => {
		if (option === 'Saved Properties' || option === 'Favorites') {
			goToFavorites();
			return;
		}
		setIsMenuOpen(false);
	};

	const openConfirmation = (action: AccountConfirmation) => {
		setConfirmationError('');
		setIsMenuOpen(false);
		setConfirmationAction(action);
	};

	const closeConfirmation = () => {
		setConfirmationAction(null);
		setConfirmationError('');
	};

	const confirmAccountAction = () => {
		if (!confirmationAction || !currentUser) return;

		setConfirmationError('');
		try {
			if (confirmationAction === 'deleteAccount') {
				deleteUserAccount(currentUser.email);
			} else {
				signOutUser();
			}

			const redirectTo =
				confirmationAction === 'deleteAccount' ? '/signup' : '/signin';
			setCurrentUser(null);
			closeConfirmation();
			navigate(redirectTo, { replace: true });
		} catch (error) {
			setConfirmationError(
				error instanceof Error
					? error.message
					: 'Unable to complete this action. Please try again.',
			);
		}
	};

	useEffect(() => {
		if (!isMenuOpen && !confirmationAction) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsMenuOpen(false);
				closeConfirmation();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [confirmationAction, isMenuOpen]);

	return (
		<>
			<nav className="relative z-20 mx-auto bg-white px-4 py-4 sm:px-6 lg:px-8">
			{/* Desktop Menu */}
			<div className="mx-auto flex max-w-7xl items-center justify-between font-poppins">
				<button
					className="flex items-center cursor-pointer"
					onClick={() => navigate('/')}
				>
					<img src={HeaderImage} className="h-8 w-10" />
					<div className="font-bold text-lg text-black/80 ">EstateFlow</div>
				</button>
				<div className="hidden lg:flex items-center gap-8">
					{NavLinks.map((Navlink) => (
						<button
							type="button"
							key={Navlink.links}
							className="border-0 bg-transparent p-0 font-semibold text-sm hover:text-[#087A5B] cursor-pointer"
							onClick={() => goToNavLink(Navlink.path)}
						>
							{Navlink.links}
						</button>
					))}
				</div>
				<div className="hidden lg:flex items-center gap-4">
					<button onClick={goToFavorites}>
						<Heart className="w-6 h-6 text-gray-700" />
					</button>

					{currentUser ? (
						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={() => openConfirmation('deleteAccount')}
								className="rounded-md border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
							>
								Delete Account
							</button>
							<Button
								label="Sign Out"
								onClick={() => openConfirmation('signOut')}
								className="text-white"
							/>
						</div>
					) : (
						<div className="flex items-center gap-2">
							<Button
								label="Sign In"
								onClick={() => navigate('/signin')}
								className="
							border border-slate-300
							bg-white
							text-black
							transition-all duration-200
							hover:border-emerald-600
							hover:bg-emerald-50
							hover:text-emerald-700
							hover:shadow-sm
						"
							/>
							<Button
								label="Sign Up"
								onClick={() => navigate('/signup')}
								className="text-white"
							/>
						</div>
					)}
				</div>
				<div className="flex items-center gap-4 lg:hidden">
					<button
						type="button"
						aria-label="Search"
						className="rounded-md p-1 text-slate-700 hover:bg-slate-100"
					>
						<Search className="h-6 w-6" />
					</button>
					<button
						type="button"
						aria-label="Open menu"
						aria-expanded={isMenuOpen}
						className="rounded-md p-1 text-slate-700 hover:bg-slate-100"
						onClick={() => setIsMenuOpen(true)}
					>
						<Menu className="h-6 w-6" />
					</button>
				</div>
			</div>
			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="fixed inset-0 z-30 lg:hidden">
					<button
						type="button"
						aria-label="Close menu"
						className="absolute inset-0 h-full w-full cursor-default bg-slate-950/30"
						onClick={() => setIsMenuOpen(false)}
					/>
					<aside
						aria-label="Mobile navigation"
						className="absolute right-0 top-0 flex h-dvh max-h-dvh w-[min(88vw,20rem)] max-w-full flex-col overflow-y-auto overscroll-contain bg-white px-6 pb-8 pt-5 font-poppins shadow-2xl"
					>
						<div className="flex items-center justify-between border-b border-slate-100 pb-5">
							<div className="flex items-center gap-3">
								<img src={HeaderImage} alt="" className="h-8 w-10" />
								<div className="font-bold text-lg text-black/80">
									EstateFlow
								</div>
							</div>
							<button
								type="button"
								aria-label="Close menu"
								className="rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
								onClick={() => setIsMenuOpen(false)}
							>
								<X className="h-6 w-6" />
							</button>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<button
									type="button"
									aria-label="Open account"
									className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e7f2ef] text-[#087A5B] transition-colors hover:bg-[#d9ebe5]"
								>
									<UserRound className="h-6 w-6" strokeWidth={2.5} />
								</button>
								<div className="flex flex-col gap-0.5">
									<p className="text-xs text-slate-500">Good Morning,</p>
									<p className="max-w-40 truncate text-base font-bold text-slate-900">
										{currentUser?.fullName ?? 'Guest'}
									</p>
								</div>
							</div>
							<button>
								<ChevronRight className="w-6 h-6" />
							</button>
						</div>
						<div className="flex flex-col gap-1 py-6">
							{NavLinks.map((navLink) => {
								const Icon = navLink.icons;

								return (
									<button
										type="button"
										key={navLink.links}
										className="flex items-center rounded-lg px-3 py-3 w-full text-left text-lg font-medium text-black/80 transition-colors hover:bg-emerald-50"
										onClick={() => goToNavLink(navLink.path)}
									>
										<Icon className="mr-3 h-6 w-6" aria-hidden="true" />
										{navLink.links}
									</button>
								);
							})}
						</div>
						<div className="h-px w-full bg-[#e7f2ef]" />
						<div className="py-6">
							<SectionHeading title="My Account" className="mb-4" />
							<div className="flex flex-col gap-3">
								{currentUser ? (
									<>
										<Button
											onClick={() => openConfirmation('signOut')}
											className="w-full justify-start gap-5 rounded-xl px-3 py-4 text-base font-medium text-white"
										>
											<LogOut className="h-7 w-7" strokeWidth={1.8} />
											Sign Out
										</Button>
										<button
											type="button"
											onClick={() => openConfirmation('deleteAccount')}
											className="flex w-full items-center gap-5 rounded-xl border border-red-200 bg-white px-3 py-3 text-left text-base font-medium text-red-700 transition-colors hover:bg-red-50"
										>
											<Trash2 className="h-7 w-7" strokeWidth={1.8} />
											Delete Account
										</button>
									</>
								) : (
									<>
										<Button
											onClick={() => goToAuth('/signin')}
											className="w-full justify-start gap-5 bg-white px-3 py-3 text-base font-medium text-slate-900 hover:bg-slate-50"
										>
											<UserRound
												className="h-7 w-7 text-slate-900"
												strokeWidth={1.8}
											/>
											Sign In
										</Button>
										<Button
											onClick={() => goToAuth('/signup')}
											className="w-full justify-start gap-5 rounded-xl px-3 py-4 text-base font-medium text-white"
										>
											<UserRoundPlus className="h-7 w-7" strokeWidth={1.8} />
											Sign Up
										</Button>
									</>
								)}
							</div>
						</div>
						<div className="h-px w-full bg-[#e7f2ef]" />
						<div className="pt-6">
							<SectionHeading title="More" className="mb-4" />

							<div>
								{MenuOptions.map((option) => {
									const Icon = option.icons;
									return (
										<button
											type="button"
											key={option.links}
											className="flex items-center rounded-lg px-3 py-3 w-full text-left text-lg font-medium text-black/80 transition-colors hover:bg-emerald-50"
											onClick={() => goToMenuOption(option.links)}
										>
											<Icon className="mr-3 h-6 w-6" aria-hidden="true" />
											{option.links}
										</button>
									);
								})}
							</div>
							{!currentUser && (
								<div className="mt-8 rounded-xl bg-[#eaf4f1] p-4">
									<div className="flex items-start gap-4">
										<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#c8e7dc] text-[#087A5B]">
											<img src={HeaderImage} alt="" className="h-8 w-10" />
										</div>
										<div className="min-w-0">
											<h3 className="text-base font-semibold leading-6 text-slate-900">
												Find your dream home
											</h3>
											<p className="mt-1 text-sm leading-5 text-slate-700">
												Create an account to save properties, get personalized
												recommendations and more.
											</p>
											<button
												type="button"
												onClick={() => goToAuth('/signup')}
												className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#087A5B] hover:text-[#066A4F]"
											>
												Sign Up
												<ArrowRight className="h-4 w-4" />
											</button>
										</div>
									</div>
								</div>
							)}
						</div>

						<footer className="relative mt-8 min-h-36 overflow-hidden border-t border-[#e7f2ef] pt-5">
							<div className="relative z-10">
								<p className="text-sm font-semibold text-slate-900">
									EstateFlow
								</p>
								<p className="mt-1 text-xs text-slate-600">
									Better homes. Brighter futures.
								</p>
							</div>
							<div className="absolute -bottom-20 -right-20 h-32 w-32 rounded-full bg-[#087A5B]" />
						</footer>
					</aside>
				</div>
			)}
		</nav>
		<AnimatePresence>
			{confirmationAction && currentUser && (
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
						aria-labelledby="account-confirmation-title"
						aria-describedby="account-confirmation-description"
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
							id="account-confirmation-title"
							className="mt-2 text-2xl font-semibold tracking-tight text-slate-950"
						>
							{confirmationAction === 'deleteAccount'
								? 'Are you sure you want to delete your account?'
								: 'Are you sure you want to sign out?'}
						</h2>
						<p
							id="account-confirmation-description"
							className="mt-3 text-sm leading-6 text-slate-600"
						>
							{confirmationAction === 'deleteAccount'
								? 'This permanently deletes your EstateFlow account and cannot be undone.'
								: 'You can sign back in anytime to continue your EstateFlow journey.'}
						</p>
						<p className="mt-2 text-sm font-medium text-slate-800">
							{currentUser.email}
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
