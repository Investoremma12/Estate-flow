import HomePage from './pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import PropertyPage from './pages/PropertyPage';
import PropertyDetails from './pages/PropertyDetails';
import AgentPage from './pages/AgentPage';
import FavoritePage from './pages/FavoritePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
function App() {
	return (
		<div className="min-w-0 overflow-x-clip">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="signup" element={<SignUp />} />
				<Route path="signin" element={<SignIn />} />
				<Route path="properties" element={<PropertyPage />} />
				<Route path="property/:id" element={<PropertyDetails />} />
				<Route path="agent" element={<AgentPage />} />
				<Route path="favorites" element={<FavoritePage />} />
				<Route path="about" element={<AboutPage />} />
				<Route path="contact" element={<ContactPage />} />
			</Routes>
		</div>
	);
}

export default App;
