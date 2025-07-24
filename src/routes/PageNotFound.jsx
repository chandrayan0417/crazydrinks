import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router';

const PageNotFound = () => {
	const headerRef = useRef(null);

	useEffect(() => {
		if (headerRef.current) {
			const split = new SplitText(headerRef.current, { type: 'chars' });
			gsap.from(split.chars, {
				yPercent: 200,
				stagger: 0.1,
				ease: 'power2.out',
				duration: 0.7,
			});
			gsap.to('.footer404 span', {
				rotate: 0,
				duration: 0.4,
				y: -40,
				ease: 'power4.inOut',
			});
			return () => split.revert();
		}
	}, []);

	return (
		<div className="relative w-full h-screen col-center items-center bg-dark-green">
			<div className="absolute w-full h-screen flex-center header-container">
				<div ref={headerRef} className="header404 overflow-hidden">
					<h1 className="text-white ove 2xl:text-[8.5rem] md:text-[6.5rem] text-[3rem] font-bold uppercase leading-[9vw] tracking-[-.35vw] 2xl:mb-0 mb-">
						404
					</h1>
				</div>
			</div>

			<div className="fixed bottom-20 w-full flex justify-center footer404 overflow-hidden">
				<span className="relative top-10 text-2xl transition-all duration-500 font-paragraph">
					seems you are lost, come back
					<Link to="/" className=" text-white pl-2">
						Home <i class="ri-home-5-line" />
					</Link>
				</span>
			</div>
		</div>
	);
};

export default PageNotFound;
