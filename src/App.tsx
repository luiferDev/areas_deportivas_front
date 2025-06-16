
import './App.css';
import AreasPopulares from './UI/AreasPopulares';
import Header from './UI/Header';
import { NavigationMenuComponent } from './UI/NavigationMenu';

function App() {
	return (
		<>
			<NavigationMenuComponent />
			<Header />
			<AreasPopulares />
		</>
	);
}

export default App;
