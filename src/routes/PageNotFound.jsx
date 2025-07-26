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

			return () => split.revert();
		}
	}, []);

	return (
		<div className="col-center w-full h-dvh col-center items-center bg-dark-green gap-3">
			<div className=" flex-center header-container">
				<div ref={headerRef} className="header404 overflow-hidden p-2">
					<h1 className="text-white ove 2xl:text-[8.5rem] md:text-[6.5rem] text-[3rem] font-bold uppercase leading-[9vw] tracking-[-.35vw] 2xl:mb-0 mb-">
						404
					</h1>
				</div>
			</div>

			<div className=" w-full flex justify-center  overflow-hidden">
				<span className=" md:text-2xl transition-all duration-500 font-paragraph">
					seems you are lost, come back
					<Link to="/" className=" text-white pl-2">
						Home <i className="ri-home-5-line" />
					</Link>
				</span>
			</div>
		</div>
	);
};

export default PageNotFound;
