import React from 'react';
import './App.css';

import Landing from './components/Landing';
import About from './components/About';
import Contact from './components/Contact';
import Faq from './components/Faq';
import BestPractices from './components/BestPractices';

import { Router } from '@reach/router';

function App() {
	return (
		<div className="App">
			<Router>
				<Landing path="/" />
				<About path="/about" />
				<Contact path="/contact" />
				<Faq path="/faq" />
				<BestPractices path="/best-practices" />
			</Router>
		</div>
	);
}

export default App;
