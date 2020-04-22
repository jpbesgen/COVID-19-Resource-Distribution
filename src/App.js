import React from 'react';
import './App.css';

import Landing from './components/Landing';
import Hospitals from './components/Hospitals';
import Makerspace from './components/Makerspace';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact';
import Faq from './components/Faq';
import BestPractices from './components/BestPractices';

import { Router } from '@reach/router';

function App() {
	return (
		<div style={{ backgroundColor: 'white' }}>
			<Router>
				<Landing path="/" />
				<Hospitals path="/hospitals" />
				<Makerspace path="/makerspace" />
				<Login path="/login" />
				<About path="/about" />
				<Contact path="/contact" />
				<Faq path="/faq" />
				<BestPractices path="/best-practices" />
			</Router>
		</div>
	);
}

export default App;
