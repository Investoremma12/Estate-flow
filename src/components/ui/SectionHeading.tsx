interface SectionHeadingProps {
	title: string;
	className?: string;
}

export default function SectionHeading({
	title,
	className = '',
}: SectionHeadingProps) {
	return (
		<h2
			className={`text-sm font-semibold uppercase tracking-wide text-[#087A5B] ${className}`}
		>
			{title}
		</h2>
	);
}
