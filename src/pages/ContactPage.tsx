import {
	ArrowRight,
	ChevronDown,
	ChevronRight,
	House,
	Mail,
	MessageCircle,
	Phone,
	Send,
	Tag,
	UserRound,
} from 'lucide-react';
import { useState } from 'react';
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../components/ui/Button';
import HeroBackground from '../assets/images/house9.jpg';
import Property from '../data/Property';
import { getCurrentAuthUser } from '../data/authStorage';
import {
	contactDetails,
	contactEmail,
	contactFaqs,
	contactInquiryTypes,
	contactQuickLinks,
	contactWhatsAppLink,
} from '../data/contactPageData';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';

interface ContactFormValues {
	name: string;
	email: string;
	phone: string;
	inquiryType: string;
	preferredDate: string;
	message: string;
}

function ContactPage() {
	const [openFaq, setOpenFaq] = useState<number | null>(null);
	const [preparedEmail, setPreparedEmail] = useState<string | null>(null);
	const [searchParams] = useSearchParams();
	const propertyId = Number(searchParams.get('propertyId'));
	const property =
		Number.isInteger(propertyId) && propertyId > 0
			? Property.find((item) => item.id === propertyId)
			: undefined;
	const currentUser = getCurrentAuthUser();

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ContactFormValues>({
		defaultValues: {
			name: currentUser?.fullName ?? '',
			email: currentUser?.email ?? '',
			phone: '',
			inquiryType: property ? 'Request a viewing' : '',
			preferredDate: '',
			message: property
				? `I'm interested in viewing ${property.title}. Please contact me to arrange a suitable time.`
				: '',
		},
	});
	const selectedInquiryType = useWatch({ control, name: 'inquiryType' });

	const onSubmit: SubmitHandler<ContactFormValues> = (values) => {
		const subject = `EstateFlow inquiry: ${values.inquiryType}${property ? ` - ${property.title}` : ''}`;
		const body = [
			`Name: ${values.name}`,
			`Email: ${values.email}`,
			`Phone: ${values.phone || 'Not provided'}`,
			`Inquiry: ${values.inquiryType}`,
			...(property
				? [
						`Property: ${property.title}`,
						`Status: ${property.propertyStatus}`,
						`Price: $${property.price}`,
						`Location: ${property.location}`,
					]
				: []),
			...(values.inquiryType === 'Request a viewing'
				? [`Preferred viewing date: ${values.preferredDate || 'Flexible'}`]
				: []),
			'',
			values.message,
		].join('\n');

		setPreparedEmail(
			`mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
		);
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
			<motion.main
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8, ease: 'easeOut' }}
				className="font-poppins"
			>
				<motion.section
					initial={{ opacity: 0, y: 22 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
					className="relative isolate overflow-hidden bg-cover bg-center"
					style={{ backgroundImage: `url(${HeroBackground})` }}
				>
					<div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/80 via-slate-950/55 to-slate-950/10" />
					<div className="mx-auto flex min-h-32 max-w-7xl items-center px-4 py-5 sm:min-h-36 sm:px-6 lg:px-8">
						<motion.div
							initial={{ opacity: 0, x: -18 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.65, delay: 0.18 }}
							className="max-w-lg"
						>
							<p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#087A5B]">
								Get in touch
							</p>
							<h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
								We’d Love to Hear From You
							</h1>
							<p className="mt-1 max-w-md text-xs leading-5 text-white sm:text-sm">
								Have a question, need assistance, or want to learn more about
								our properties? We’re here to help!
							</p>
						</motion.div>
					</div>
				</motion.section>

				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<motion.section
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.08 }}
						transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
						className="grid gap-4 py-4 lg:grid-cols-[minmax(0,1.9fr)_minmax(270px,1fr)]"
					>
						<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
							<h2 className="text-lg font-bold text-slate-900">
								Send Us a Message
							</h2>
							<p className="text-[11px] text-slate-600">
								Fill out the form below and we’ll get back to you as soon as
								possible.
							</p>

							<form
								noValidate
								onSubmit={handleSubmit(onSubmit)}
								onChange={() => setPreparedEmail(null)}
								className="mt-3 space-y-2"
							>
								{property && (
									<div className="mb-3 rounded-lg border border-emerald-100 bg-emerald-50 p-3">
										<p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-800">
											Property details
										</p>
										<p className="mt-1 text-sm font-semibold text-slate-900">
											{property.title}
										</p>
										<p className="mt-0.5 text-xs text-slate-600">
											{property.location} · {property.propertyStatus} · $
											{property.price}
											{property.propertyStatus === 'For Rent' ? '/month' : ''}
										</p>
									</div>
								)}
								<div className="grid gap-2 sm:grid-cols-2">
									<div>
										<label className="relative block">
											<span className="sr-only">Your name</span>
											<UserRound
												className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
												aria-hidden="true"
											/>
											<input
												{...register('name', {
													required: 'Please enter your name.',
												})}
												type="text"
												autoComplete="name"
												aria-invalid={Boolean(errors.name)}
												aria-describedby={
													errors.name ? 'contact-name-error' : undefined
												}
												placeholder="Your Name *"
												className={`h-9 w-full rounded-md border bg-white pl-9 pr-3 text-xs text-slate-900 outline-none placeholder:text-slate-500 focus:border-[#087A5B] focus:ring-2 focus:ring-emerald-100 ${errors.name ? 'border-rose-500' : 'border-slate-200'}`}
											/>
										</label>
										{errors.name && (
											<p
												id="contact-name-error"
												role="alert"
												className="mt-1 text-[10px] text-rose-600"
											>
												{errors.name.message}
											</p>
										)}
									</div>
									<div>
										<label className="relative block">
											<span className="sr-only">Your email</span>
											<Mail
												className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
												aria-hidden="true"
											/>
											<input
												{...register('email', {
													required: 'Please enter your email address.',
													pattern: {
														value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
														message: 'Enter a valid email address.',
													},
												})}
												type="email"
												autoComplete="email"
												aria-invalid={Boolean(errors.email)}
												aria-describedby={
													errors.email ? 'contact-email-error' : undefined
												}
												placeholder="Your Email *"
												className={`h-9 w-full rounded-md border bg-white pl-9 pr-3 text-xs text-slate-900 outline-none placeholder:text-slate-500 focus:border-[#087A5B] focus:ring-2 focus:ring-emerald-100 ${errors.email ? 'border-rose-500' : 'border-slate-200'}`}
											/>
										</label>
										{errors.email && (
											<p
												id="contact-email-error"
												role="alert"
												className="mt-1 text-[10px] text-rose-600"
											>
												{errors.email.message}
											</p>
										)}
									</div>
								</div>

								<label className="relative block">
									<span className="sr-only">Your phone number (optional)</span>
									<Phone
										className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
										aria-hidden="true"
									/>
									<input
										{...register('phone')}
										type="tel"
										autoComplete="tel"
										placeholder="Your Phone Number (Optional)"
										className="h-9 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-900 outline-none placeholder:text-slate-500 focus:border-[#087A5B] focus:ring-2 focus:ring-emerald-100"
									/>
								</label>

								<div>
									<label className="relative block">
										<span className="sr-only">Select inquiry type</span>
										<Tag
											className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
											aria-hidden="true"
										/>
										<select
											{...register('inquiryType', {
												required: 'Please select an inquiry type.',
											})}
											aria-invalid={Boolean(errors.inquiryType)}
											aria-describedby={
												errors.inquiryType ? 'contact-inquiry-error' : undefined
											}
											className={`h-9 w-full appearance-none rounded-md border bg-white pl-9 pr-9 text-xs text-slate-700 outline-none focus:border-[#087A5B] focus:ring-2 focus:ring-emerald-100 ${errors.inquiryType ? 'border-rose-500' : 'border-slate-200'}`}
										>
											<option value="">Select Inquiry Type</option>
											{contactInquiryTypes.map(({ value, label }) => (
												<option key={value} value={value}>
													{label}
												</option>
											))}
										</select>
										<ChevronDown
											className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
											aria-hidden="true"
										/>
									</label>
									{errors.inquiryType && (
										<p
											id="contact-inquiry-error"
											role="alert"
											className="mt-1 text-[10px] text-rose-600"
										>
											{errors.inquiryType.message}
										</p>
									)}
								</div>

								{selectedInquiryType === 'Request a viewing' && (
									<div>
										<label
											htmlFor="preferred-viewing-date"
											className="mb-1 block text-xs font-medium text-slate-700"
										>
											Preferred viewing date (optional)
										</label>
										<input
											{...register('preferredDate')}
											id="preferred-viewing-date"
											type="date"
											className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-[#087A5B] focus:ring-2 focus:ring-emerald-100"
										/>
									</div>
								)}

								<div>
									<label className="relative block">
										<span className="sr-only">Your message</span>
										<MessageCircle
											className="absolute left-3 top-3 h-4 w-4 text-slate-500"
											aria-hidden="true"
										/>
										<textarea
											{...register('message', {
												required: 'Please enter a message.',
											})}
											aria-invalid={Boolean(errors.message)}
											aria-describedby={
												errors.message ? 'contact-message-error' : undefined
											}
											rows={3}
											placeholder="Your Message *"
											className={`w-full resize-y rounded-md border bg-white py-2 pl-9 pr-3 text-xs text-slate-900 outline-none placeholder:text-slate-500 focus:border-[#087A5B] focus:ring-2 focus:ring-emerald-100 ${errors.message ? 'border-rose-500' : 'border-slate-200'}`}
										/>
									</label>
									{errors.message && (
										<p
											id="contact-message-error"
											role="alert"
											className="mt-1 text-[10px] text-rose-600"
										>
											{errors.message.message}
										</p>
									)}
								</div>

								<Button
									type="submit"
									className="h-9 w-full gap-2 rounded-md text-xs text-white"
								>
									<Send className="h-4 w-4" aria-hidden="true" />
									Send Message
								</Button>
								{preparedEmail ? (
									<p
										role="status"
										className="text-center text-[10px] text-slate-600"
									>
										Message prepared.{' '}
										<a
											href={preparedEmail}
											className="font-semibold text-[#087A5B] underline"
										>
											Open your email app to send it.
										</a>
									</p>
								) : (
									<p className="text-center text-[10px] text-slate-500">
										Your message will be prepared in your email app.
									</p>
								)}
							</form>
						</div>

						<aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
							<h2 className="text-lg font-bold text-slate-900">
								Contact Information
							</h2>
							<dl className="mt-2">
								{contactDetails.map(({ title, value, icon: Icon, href }) => (
									<div
										key={title}
										className="flex items-center gap-3 border-b border-slate-200 py-2 last:border-b-0"
									>
										<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e1f4ec] text-[#087A5B]">
											<Icon className="h-5 w-5" aria-hidden="true" />
										</div>
										<div className="min-w-0">
											<dt className="text-[11px] font-medium text-slate-800">
												{title}
											</dt>
											<dd className="mt-0.5 whitespace-pre-line text-[11px] leading-4 text-slate-700">
												{href ? (
													<a
														href={href}
														className="font-semibold hover:text-[#087A5B]"
													>
														{value}
													</a>
												) : (
													value
												)}
											</dd>
										</div>
									</div>
								))}
							</dl>
							<a
								href={contactWhatsAppLink}
								target="_blank"
								rel="noreferrer"
								className="mt-2 flex items-center justify-between rounded-lg bg-[#e1f4ec] px-3 py-2 text-[#07513F] transition-colors hover:bg-[#d2eee2]"
							>
								<span className="flex items-center gap-2">
									<MessageCircle className="h-5 w-5" aria-hidden="true" />
									<span>
										<span className="block text-[11px] font-semibold">
											WhatsApp
										</span>
										<span className="block text-[10px]">
											Chat with us on WhatsApp
										</span>
									</span>
								</span>
								<ChevronRight className="h-4 w-4" aria-hidden="true" />
							</a>
						</aside>
					</motion.section>

					<motion.section
						aria-label="Quick contact options"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.15 }}
						variants={{
							hidden: {},
							visible: { transition: { staggerChildren: 0.1 } },
						}}
						className="grid gap-2 pb-5 sm:grid-cols-3"
					>
						{contactQuickLinks.map(
							({ title, description, value, icon: Icon, href, external }) => (
								<motion.a
									key={title}
									href={href}
									target={external ? '_blank' : undefined}
									rel={external ? 'noreferrer' : undefined}
									variants={{
										hidden: { opacity: 0, y: 16 },
										visible: { opacity: 1, y: 0 },
									}}
									transition={{ duration: 0.5, ease: 'easeOut' }}
									className="flex items-center gap-3 rounded-xl bg-[#eaf7f2] p-3 transition-colors hover:bg-[#ddf1e9]"
								>
									<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d2eee2] text-[#07513F]">
										<Icon
											className="h-6 w-6"
											fill="currentColor"
											aria-hidden="true"
										/>
									</span>
									<span className="min-w-0">
										<span className="block text-xs font-bold text-slate-900">
											{title}
										</span>
										<span className="mt-0.5 block whitespace-pre-line text-[10px] text-slate-700">
											{description}
										</span>
										<span className="block text-[11px] font-semibold text-slate-900">
											{value}
										</span>
									</span>
								</motion.a>
							),
						)}
					</motion.section>

					<motion.section
						initial={{ opacity: 0, y: 22 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.15 }}
						transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
						className="grid gap-4 border-t border-slate-200 py-5 sm:grid-cols-[minmax(190px,0.65fr)_minmax(0,1.5fr)] sm:gap-6"
					>
						<div>
							<h2 className="text-xl font-bold leading-tight text-slate-900">
								Frequently Asked Questions
							</h2>
							<p className="mt-2 max-w-xs text-xs leading-5 text-slate-700">
								Find quick answers to common questions about EstateFlow.
							</p>
						</div>
						<div className="space-y-1.5">
							{contactFaqs.map(({ question, answer }, index) => {
								const isOpen = openFaq === index;
								const panelId = `contact-faq-answer-${index}`;

								return (
									<div
										key={question}
										className="overflow-hidden rounded-lg bg-slate-50"
									>
										<button
											type="button"
											onClick={() =>
												setOpenFaq((current) =>
													current === index ? null : index,
												)
											}
											aria-expanded={isOpen}
											aria-controls={panelId}
											className="flex min-h-9 w-full items-center justify-between gap-3 px-3 py-2 text-left text-xs font-medium text-slate-900 transition-colors hover:bg-slate-100"
										>
											{question}
											<ChevronDown
												className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
												aria-hidden="true"
											/>
										</button>
										<AnimatePresence initial={false}>
											{isOpen && (
												<motion.p
													id={panelId}
													initial={{ opacity: 0, height: 0 }}
													animate={{ opacity: 1, height: 'auto' }}
													exit={{ opacity: 0, height: 0 }}
													transition={{ duration: 0.25, ease: 'easeOut' }}
													className="overflow-hidden px-3 pb-3 text-xs leading-5 text-slate-600"
												>
													{answer}
												</motion.p>
											)}
										</AnimatePresence>
									</div>
								);
							})}
						</div>
					</motion.section>

					<motion.section
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.15 }}
						whileHover={{ y: -2 }}
						transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
						className="mb-5 flex flex-col gap-4 rounded-xl bg-gradient-to-r from-[#07513F] to-[#087A5B] px-5 py-5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8"
					>
						<div className="flex items-center gap-3">
							<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
								<House className="h-8 w-8" aria-hidden="true" />
							</div>
							<div>
								<h2 className="text-lg font-bold">
									Explore Our Properties Today
								</h2>
								<p className="text-xs text-white/85">
									Find your dream home with EstateFlow.
								</p>
							</div>
						</div>
						<Link
							to="/properties"
							className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-lg bg-white px-4 text-xs font-semibold text-slate-900 transition-colors hover:bg-emerald-50 sm:self-auto"
						>
							Browse Properties
							<ArrowRight className="h-4 w-4" aria-hidden="true" />
						</Link>
					</motion.section>
				</div>
			</motion.main>
			<motion.div
				initial={{ opacity: 0, y: 18 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.08 }}
				transition={{ duration: 0.7 }}
			>
				<Footer />
			</motion.div>
		</>
	);
}

export default ContactPage;
