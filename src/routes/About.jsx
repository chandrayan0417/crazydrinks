import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import samayImg from '../assets/samay-raina.jpg';

const About = () => {
	const headingRef = useRef(null);
	const imgRef = useRef(null);
	const paraRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

	useEffect(() => {
		gsap.from(headingRef.current, {
			opacity: 0,
			y: -60,
			scale: 0.8,
			duration: 1,
			ease: 'power3.out',
		});
		gsap.from(imgRef.current, {
			opacity: 0,
			scale: 0.7,
			x: -40,
			duration: 1,
			delay: 0.6,
			ease: 'power2.out',
		});
		paraRefs.forEach((ref, i) => {
			gsap.from(ref.current, {
				opacity: 0,
				y: 40,
				duration: 0.8,
				delay: 1 + i * 0.2,
				ease: 'power2.out',
			});
		});
	}, []);

	return (
		<section className="flex flex-col pt-20 md:pt-0 items-center justify-center min-h-[90vh] px-4 bg-white">
			<h1
				ref={headingRef}
				className="text-7xl md:text-9xl font-extrabold mb-10 mt-8 tracking-tight text-center font-[monospace] uppercase"
				style={{
					color: '#111',
					letterSpacing: '-0.03em',
				}}
			>
				About Us
			</h1>
			<div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl w-full">
				<img
					ref={imgRef}
					src={samayImg}
					alt="Samay Raina - Founder"
					className="w-64 h-64 object-cover rounded-xl shadow-lg mb-6 md:mb-0"
					style={{
						filter: 'grayscale(100%) contrast(1.1)',
						border: '2px solid #111',
					}}
				/>
				<div className="flex-1 flex flex-col gap-8">
					<p
						ref={paraRefs[0]}
						className="text-4xl md:text-5xl font-extrabold font-[monospace] tracking-tight"
						style={{ color: '#111', lineHeight: '1.15' }}
					>
						Founded & owned by{' '}
						<span style={{ borderBottom: '4px solid #111', paddingBottom: 2 }}>
							Samay Raina
						</span>
					</p>
					<p
						ref={paraRefs[1]}
						className="text-2xl md:text-3xl font-bold tracking-wide"
						style={{
							color: '#111',
							fontFamily: 'monospace',
							letterSpacing: '0.02em',
						}}
					>
						Comedy + Energy Drinks ={' '}
						<span style={{ fontSize: '2.3rem', fontWeight: '900' }}>
							UNSTOPPABLE VIBES
						</span>
					</p>
					<p
						ref={paraRefs[2]}
						className="text-xl font-paragraph md:text-2xl font-semibold tracking-wide"
						style={{ color: '#111' }}
					>
						Every sip is a punchline. Har flavor mein swag aur masti. Late night
						grind ho ya chill moment — Samay ke drinks se power up ho jao!
					</p>
					<p
						ref={paraRefs[3]}
						className="text-lg md:text-xl font-bold font-[monospace] uppercase"
						style={{ color: '#111', letterSpacing: '0.05em' }}
					>
						Join the party. Taste the laughter. <br /> Only with us. 🚀
					</p>
				</div>
			</div>
		</section>
	);
};

export default About;
