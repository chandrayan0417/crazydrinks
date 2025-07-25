import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Lenis from 'lenis';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Footer from './components/Footer';
import MouseTrail from './components/MouseTrail';
import Navbar from './components/Navbar';
import Router from './components/Router';
import LoadingScreen from './components/LoadingScreen';

gsap.registerPlugin(ScrollTrigger);

function App() {
	const isMobile = useMediaQuery({
		query: '(max-width: 768px)',
	});

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const lenis = new Lenis({
			duration: 1.2,
			smooth: true,
			direction: 'vertical',
			lerp: 0.1,
		});

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		// Resource loading simulation (replace with real resource logic)
		const loadResources = async () => {
			// Example: preload images, fonts, API, etc.
			await new Promise((resolve) => setTimeout(resolve, 1800));
			setLoading(false);
		};
		loadResources();

		return () => {
			lenis.destroy();
		};
	}, []);

	if (loading) return <LoadingScreen />;

	return (
		<main>
			<Navbar />
			<Router />
			{!isMobile && <MouseTrail />}
			<Footer />
		</main>
	);
}

export default App;
