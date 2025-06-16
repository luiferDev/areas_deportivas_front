
import './App.css';
import AreasPopulares from './UI/AreasPopulares';
import Footer from './UI/Footer';
import Header from './UI/Header';
import { NavigationMenuComponent } from './UI/NavigationMenu';

function App() {
	return (
		<>
			<NavigationMenuComponent />
			<Header />
			<AreasPopulares />
			<Footer />
		</>
	);
}

export default App;
