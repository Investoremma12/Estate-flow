import HomePage from './pages/HomePage';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import PropertyPage from './pages/PropertyPage';
import PropertyDetails from './pages/PropertyDetails';
import AgentPage from './pages/AgentPage';
import FavoritePage from './pages/FavoritePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import type { ReactNode } from 'react';
import { getCurrentAuthUser } from './data/authStorage';

function ProtectedRoute({ children }: { children: ReactNode }) {
	const location = useLocation();

	if (!getCurrentAuthUser()) {
		return <Navigate to="/signup" replace state={{ from: location }} />;
	}

	return children;
}

function App() {
	return (
		<div className="min-w-0 overflow-x-clip">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="signup" element={<SignUp />} />
				<Route path="signin" element={<SignIn />} />
				<Route
					path="properties"
					element={
						<ProtectedRoute>
							<PropertyPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="property/:id"
					element={
						<ProtectedRoute>
							<PropertyDetails />
						</ProtectedRoute>
					}
				/>
				<Route
					path="agent"
					element={
						<ProtectedRoute>
							<AgentPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="favorites"
					element={
						<ProtectedRoute>
							<FavoritePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="about"
					element={
						<ProtectedRoute>
							<AboutPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="contact"
					element={
						<ProtectedRoute>
							<ContactPage />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
