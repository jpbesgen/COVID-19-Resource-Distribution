import React from 'react';
import './App.css';

import Landing from './components/Landing';
import Hospitals from './components/Hospitals';
import Makerspace from './components/Makerspace';
import Submit from './components/Submit';
import Login from './components/Login';
import About from './components/About';
import BestPractices from './components/BestPractices';

import { Router } from '@reach/router';

function App() {
	return (
		<div style={{ backgroundColor: 'white' }}>
			<Router>
				<Landing path="/" />
				<Hospitals path="/hospitals" />
				<Makerspace path="/makerspace" />
				<Submit path="/submit" />
				<Login path="/login" />
				<About path="/about" />
				<BestPractices path="/best-practices" />
			</Router>
		</div>
	);
}

export default App;
