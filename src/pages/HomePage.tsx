import HeroSection from '../components/homepage/HeroSection';
import PropertySection from '../components/homepage/PropertySection';
import LocationSection from '../components/homepage/LocationSection';
import AboutSection from '../components/homepage/AboutSection';
import AgentSection from '../components/homepage/AgentSection';
import TestimonialSection from '../components/homepage/TestimonialSection';
import Cta from '../components/homepage/Cta';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { motion } from 'framer-motion';

export default function HomePage() {
	const sections = [
		{ key: 'properties', content: <PropertySection /> },
		{ key: 'locations', content: <LocationSection /> },
		{ key: 'about', content: <AboutSection /> },
		{ key: 'agents', content: <AgentSection /> },
		{ key: 'testimonials', content: <TestimonialSection /> },
		{ key: 'cta', content: <Cta /> },
	];

	return (
		<motion.main
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
		>
			<motion.div
				initial={{ opacity: 0, y: -24 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
			>
				<Navbar />
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: 36 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 1.2,
					delay: 0.18,
					ease: [0.22, 1, 0.36, 1],
				}}
			>
				<HeroSection />
			</motion.div>
			{sections.map(({ key, content }, index) => (
				<motion.div
					key={key}
					initial={{ opacity: 0, y: 48 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.14 }}
					transition={{
						duration: 1.15,
						delay: 0.08 + index * 0.06,
						ease: [0.22, 1, 0.36, 1],
					}}
				>
					{content}
				</motion.div>
			))}
			<motion.div
				initial={{ opacity: 0, y: 36 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.1 }}
				transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
			>
				<Footer />
			</motion.div>
		</motion.main>
	);
}
