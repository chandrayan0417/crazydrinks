import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from 'gsap/all';
import { useMediaQuery } from 'react-responsive';
import useGsapHoverEffect from '../components/useGsapHoverEffect';

const HeroSection = () => {
	const buttonRef = useGsapHoverEffect();
	const isMobile = useMediaQuery({
		query: '(max-width: 768px)',
	});

	useGSAP(() => {
		const titleSplit = SplitText.create('.hero-title', { type: 'chars' });
		const timeline = gsap.timeline({
			delay: 1,
		});

		timeline
			.to('.hero-content', {
				opacity: 1,
				y: 0,
				ease: 'power1.inOut',
			})
			.to(
				'.hero-text-scroll',
				{
					duration: 0.5,
					clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
					ease: 'circ.out',
				},
				'-=0.5',
			)
			.from(
				titleSplit.chars,
				{
					yPercent: 200,
					stagger: 0.02,
					ease: 'power2.out',
				},
				'-=0.5',
			);

		const heroTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: '.hero-container',
				start: '1% top',
				end: 'bottom top',
				scrub: true,
			},
		});
		heroTimeline.to('.hero-container', {
			rotate: 7,
			scale: 0.9,
			yPercent: 30,
			ease: 'power1.inOut',
		});
	});

	return (
		<section className="bg-main-bg">
			<div className="hero-container">
				{isMobile ? (
					<video
						src="/videos/hero-md.mp4"
						autoPlay
						loop
						muted
						playsInline
						className="absolute inset-0 w-full h-full object-cover opacity-70"
					/>
				) : (
					<video
						src="/videos/hero-lg.mp4"
						autoPlay
						loop
						muted
						playsInline
						className="absolute inset-0 w-full h-full object-cover opacity-70"
					/>
				)}
				<div className="hero-content opacity-0">
					<div className="overflow-hidden">
						<h1 className="hero-title">0% Sugar. 100% Focus.</h1>
					</div>
					<div
						className="hero-text-scroll"
						style={{
							clipPath: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)',
						}}
					>
						<div className="hero-subtitle">
							<h1>Taste the Madness.</h1>
						</div>
					</div>
					<h2>
						Break free from the ordinary and rediscover your playful spirit with
						every insanely tasty sip. Life’s too short for boring drinks—grab a
						can and let the madness begin!
					</h2>
					<div className="hero-button" ref={buttonRef}>
						<p>Join the Madness</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
