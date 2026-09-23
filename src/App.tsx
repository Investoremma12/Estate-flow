import HomePage from './pages/HomePage';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

function App() {
	return (
		<div className="min-w-0 overflow-x-clip">
			<Navbar />
			<HomePage />
			<Footer />
		</div>
	);
}

export default App;
