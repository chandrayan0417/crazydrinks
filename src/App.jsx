import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect } from 'react';
import MouseTrail from './components/MouseTrail';
import Navbar from './components/Navbar';
import Router from './components/Router';

gsap.registerPlugin(ScrollTrigger);
function App() {
	return (
		<main>
			<Navbar />
			<Router />
			<MouseTrail />
		</main>
	);
}

export default App;
