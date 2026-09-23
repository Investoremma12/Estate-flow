import HeroSection from '../components/homepage/HeroSection';
import PropertySection from '../components/homepage/PropertySection';
import LocationSection from '../components/homepage/LocationSection';
import AboutSection from '../components/homepage/AboutSection';
import AgentSection from '../components/homepage/AgentSection';
import TestimonialSection from '../components/homepage/TestimonialSection';
import Cta from '../components/homepage/Cta';

export default function HomePage() {
	return (
		<>
			<HeroSection />
			<PropertySection />
			<LocationSection />
			<AboutSection />
			<AgentSection />
			<TestimonialSection />
			<Cta />
		</>
	);
}
