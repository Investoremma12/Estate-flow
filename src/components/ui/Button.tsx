import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label?: string;
	children?: ReactNode;
}

export default function Button({
	label,
	children,
	className = '',
	type = 'button',
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			type={type}
			className={`inline-flex items-center justify-center rounded-md bg-[#087A5B] cursor-pointer px-4 py-2 text-sm font-medium transition-colors hover:bg-[#066A4F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
		>
			{children ?? label}
		</button>
	);
}
