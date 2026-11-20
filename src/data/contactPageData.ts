import { Clock3, Mail, MapPin, Phone } from 'lucide-react';

export const contactEmail = 'info@estateflow.com';
export const contactPhone = '+234 801 234 5678';
export const contactPhoneLink = 'tel:+2348012345678';
export const contactEmailLink = `mailto:${contactEmail}`;
export const contactWhatsAppLink = 'https://wa.me/2348012345678';
export const contactOfficeMapLink =
	'https://maps.google.com/?q=123+Real+Estate+Avenue+Lagos+Nigeria';

export const contactDetails = [
	{
		title: 'Phone Number',
		value: contactPhone,
		icon: Phone,
		href: contactPhoneLink,
		external: false,
	},
	{
		title: 'Email Address',
		value: contactEmail,
		icon: Mail,
		href: contactEmailLink,
		external: false,
	},
	{
		title: 'Our Office',
		value: '123 Real Estate Avenue, Lagos, Nigeria',
		icon: MapPin,
	},
	{
		title: 'Business Hours',
		value: 'Mon – Sat: 8:00 AM – 8:00 PM\nSun: 10:00 AM – 5:00 PM',
		icon: Clock3,
	},
];

export const contactQuickLinks = [
	{
		title: 'Call Us',
		description: 'Speak with our team directly',
		value: contactPhone,
		icon: Phone,
		href: contactPhoneLink,
	},
	{
		title: 'Email Us',
		description: 'Send us an email anytime',
		value: contactEmail,
		icon: Mail,
		href: contactEmailLink,
	},
	{
		title: 'Visit Our Office',
		description: '123 Real Estate Avenue,',
		value: 'Lagos, Nigeria',
		icon: MapPin,
		href: contactOfficeMapLink,
		external: true,
	},
];

export const contactInquiryTypes = [
	{ value: 'Buying a property', label: 'Buying a property' },
	{ value: 'Selling a property', label: 'Selling a property' },
	{ value: 'Renting a property', label: 'Renting a property' },
	{ value: 'General question', label: 'General question' },
];

export const contactFaqs = [
	{
		question: 'How do I schedule a property viewing?',
		answer:
			'Open a property listing and contact the assigned agent to arrange a viewing time that works for you.',
	},
	{
		question: 'What documents do I need to buy a property?',
		answer:
			'Requirements vary by location and transaction. An EstateFlow agent can help you understand what to prepare for the property you have in mind.',
	},
	{
		question: 'Do you offer rental services?',
		answer:
			'Yes. Browse our rental listings and reach out to the agent on the listing for details about availability and next steps.',
	},
];
