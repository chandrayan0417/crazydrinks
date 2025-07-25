import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import React, { useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { flavors } from '../components/flavor.jsx';
import useGsapHoverEffect from '../components/useGsapHoverEffect';

const FlavorTitle = () => {
	useGSAP(() => {
		const firstTextSplit = SplitText.create('.first-text-split h1', {
			type: 'chars',
		});
		const secondTextSplit = SplitText.create('.second-text-split h1', {
			type: 'chars',
		});

		gsap.from(firstTextSplit.chars, {
			yPercent: 200,
			stagger: 0.02,
			ease: 'power1.inOut',
			scrollTrigger: {
				trigger: '.flavor-section',
				start: 'top 30%',
			},
		});

		gsap.to('.flavor-text-scroll', {
			duration: 1,
			clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
			scrollTrigger: {
				trigger: '.flavor-section',
				start: 'top 10%',
			},
		});

		gsap.from(secondTextSplit.chars, {
			yPercent: 200,
			stagger: 0.02,
			ease: 'power1.inOut',
			scrollTrigger: {
				trigger: '.flavor-section',
				start: 'top 1%',
			},
		});
	});

	return (
		<div className="general-title col-center h-full 2xl:gap-32 xl:gap-24 gap-16">
			<div className="overflow-hidden 2xl:py-0 py-3 first-text-split">
				<h1>Experience</h1>
			</div>

			<div
				style={{
					clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
				}}
				className="flavor-text-scroll"
			>
				<div
					className="bg-[#659287] pb-5 2xl:pt-0 pt-3 2xl:px-5 px-3"
					ref={useGsapHoverEffect()}
				>
					<h2 className="text-white">
						all <span className="text-[#CDC1FF]">#5</span>
					</h2>
				</div>
			</div>

			<div className="overflow-hidden text-[#739072] 2xl:py-0 py-3 second-text-split">
				<h1>insanely flavors</h1>
			</div>
		</div>
	);
};

const FlavorSlider = () => {
	const navigate = useNavigate();
	const sliderRef = useRef();
	const isTablet = useMediaQuery({
		query: '(max-width: 1024px)',
	});

	useGSAP(() => {
		const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

		if (!isTablet) {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: '.flavor-section',
					start: '2% top',
					end: `+=${scrollAmount + 1500}px`,
					scrub: true,
					pin: true,
				},
			});

			tl.to('.flavor-section', {
				x: `-${scrollAmount + 1500}px`,
				ease: 'power1.inOut',
			});
		}

		const titleTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.flavor-section',
				start: 'top top',
				end: 'bottom 80%',
				scrub: true,
			},
		});

		titleTl
			.to('.first-text-split', {
				xPercent: -30,
				ease: 'power1.inOut',
			})
			.to(
				'.flavor-text-scroll',
				{
					xPercent: -22,
					ease: 'power1.inOut',
				},
				'<',
			)
			.to(
				'.second-text-split',
				{
					xPercent: -10,
					ease: 'power1.inOut',
				},
				'<',
			);
	});

	const [imageIndexes, setImageIndexes] = useState(flavors.map(() => 0));

	const handleChangeImage = (flavorIdx, imgIdx) => {
		setImageIndexes((prev) => {
			const updated = [...prev];
			updated[flavorIdx] = imgIdx;
			return updated;
		});
	};

	return (
		<div ref={sliderRef} className="slider-wrapper">
			<div className="flavors">
				{flavors.map((flavor, flavorIdx) => (
					<div
						key={flavor.id + flavor}
						className="relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none"
						style={{
							backgroundColor: flavor.color,
						}}
					>
						{' '}
						<img
							onClick={() => navigate(`/shop/${flavor.id}`)}
							src={`/crazydrinks/images/${flavor.images[imageIndexes[flavorIdx]]}`}
							alt=""
							className="drinks cursor-pointer"
						/>
						<h1>{flavor.name}</h1>
						<h1 className="top-10">#{flavorIdx + 1}</h1>
						<div className="flex flex-col gap-2 mt-20 ml-10">
							{flavor.images.map((_, imgIdx) => (
								<div
									key={flavor.id + imgIdx}
									className={`w-10 md:w-30 h-10 md:h-30 hover:cursor-pointer z-30  rounded  ${imageIndexes[flavorIdx] === imgIdx ? 'bg-light-gray/50 ' : 'bg-white/50'}  `}
									onClick={() => handleChangeImage(flavorIdx, imgIdx)}
								>
									<img
										src={`/crazydrinks/images/${flavor.images[imgIdx]}`}
										alt={`${flavor.name} image ${imgIdx + 1}`}
										className="w-full h-full object-cover"
									/>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const FlavorSectionCombined = () => {
	return (
		<section className="flavor-section">
			<div className="h-full flex lg:flex-row flex-col items-center relative">
				<div className="lg:w-[57%] flex-none h-80 lg:h-full md:mt-20 xl:mt-0">
					<FlavorTitle />
				</div>
				<div>
					<FlavorSlider />
				</div>
			</div>
		</section>
	);
};

export default FlavorSectionCombined;
