import HomePage from './pages/HomePage';
import { Route, Routes } from 'react-router';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import PropertyPage from './pages/PropertyPage';

function App() {
	return (
		<div className="min-w-0 overflow-x-clip">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="signup" element={<SignUp />} />
				<Route path="signin" element={<SignIn />} />
				<Route path="properties" element={<PropertyPage />} />
			</Routes>
		</div>
	);
}

export default App;
