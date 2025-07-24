import React, { useEffect, useRef, useState } from 'react';

const CursorWithTrail = () => {
	const dotRef = useRef(null);
	const requestRef = useRef(null);
	const mousePos = useRef({ x: 0, y: 0 });
	const dotPos = useRef({ x: 0, y: 0 });
	const [dotVisible, setDotVisible] = useState(true);

	const svgRef = useRef(null);
	const pointsRef = useRef([]);
	const mouseTrailRef = useRef({ x: 0, y: 0 });
	const segments = 25;

	useEffect(() => {
		const selectorsToHide =
			'a, button, input, textarea, select, [data-hide-cursor]';

		const handleMouseMove = (e) => {
			mousePos.current = { x: e.clientX, y: e.clientY };
			mouseTrailRef.current = { x: e.clientX, y: e.clientY };

			if (pointsRef.current.length === 0) {
				pointsRef.current = Array.from({ length: segments }, () => ({
					x: e.clientX,
					y: e.clientY,
				}));
			}
		};

		const handlePointerMove = (e) => {
			if (e.target.closest(selectorsToHide)) {
				setDotVisible(false);
			} else {
				setDotVisible(true);
			}
		};

		const animateDot = () => {
			dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.2;
			dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.2;

			if (dotRef.current) {
				dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
			}
			requestRef.current = requestAnimationFrame(animateDot);
		};

		const svg = svgRef.current;
		const path = svg.querySelector('path');

		const animateTrail = () => {
			if (pointsRef.current.length > 0) {
				let px = mouseTrailRef.current.x;
				let py = mouseTrailRef.current.y;
				pointsRef.current.forEach((p, i) => {
					p.x = px;
					p.y = py;
					const n = pointsRef.current[i + 1];
					if (n) {
						px = px - (p.x - n.x) * 0.6;
						py = py - (p.y - n.y) * 0.6;
					}
				});
				const pathData = `M ${pointsRef.current.map((p) => `${p.x} ${p.y}`).join(' L ')}`;
				path.setAttribute('d', pathData);
			} else {
				path.setAttribute('d', '');
			}
		};

		const tick = () => {
			animateDot();
			animateTrail();
			requestRef.current = requestAnimationFrame(tick);
		};

		const resize = () => {
			const ww = window.innerWidth;
			const wh = window.innerHeight;
			svg.style.width = ww + 'px';
			svg.style.height = wh + 'px';
			svg.setAttribute('viewBox', `0 0 ${ww} ${wh}`);
		};

		document.body.style.cursor = 'none';

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('pointermove', handlePointerMove);
		window.addEventListener('resize', resize);

		resize(); // Initial resize
		tick(); // Start animation loop

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('resize', resize);
			document.body.style.cursor = '';
			cancelAnimationFrame(requestRef.current);
		};
	}, []);

	return (
		<>
			{dotVisible && (
				<div
					ref={dotRef}
					style={{
						position: 'fixed',
						left: 0,
						top: 0,
						width: 10,
						height: 10,
						borderRadius: '50%',
						background: '#314f1a',
						pointerEvents: 'none',
						zIndex: 9999,
						boxSizing: 'border-box',
						transition: 'opacity 0.2s ease',
					}}
				/>
			)}

			<svg
				ref={svgRef}
				className="trail"
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					zIndex: 1000,
					pointerEvents: 'none',
					width: '100vw',
					height: '100vh',
				}}
			>
				<path
					stroke="#B6F500"
					strokeWidth={5}
					strokeLinecap="round"
					strokeLinejoin="round"
					fill="none"
				/>
			</svg>
		</>
	);
};

export default CursorWithTrail;
