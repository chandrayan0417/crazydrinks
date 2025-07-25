import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import useGsapHoverEffect from '../components/useGsapHoverEffect';

const MessageSection = () => {
	useGSAP(() => {
		const firstMsgSplit = SplitText.create('.first-message', {
			type: 'words',
		});
		const secMsgSplit = SplitText.create('.second-message', {
			type: 'words',
		});
		const paragraphSplit = SplitText.create('.message-content p', {
			type: 'words, lines',
			linesClass: 'paragraph-line',
		});

		gsap.to(firstMsgSplit.words, {
			color: '#faeade',
			ease: 'power1.in',
			stagger: 1,
			scrollTrigger: {
				trigger: '.message-content',
				start: 'top center',
				end: '30% center',
				scrub: true,
			},
		});
		gsap.to(secMsgSplit.words, {
			color: '#faeade',
			ease: 'power1.in',
			stagger: 1,
			scrollTrigger: {
				trigger: '.second-message',
				start: 'top center',
				end: 'bottom center',
				scrub: true,
			},
		});

		const revealTl = gsap.timeline({
			delay: 1,
			scrollTrigger: {
				trigger: '.msg-text-scroll',
				start: 'top 60%',
			},
		});
		revealTl.to('.msg-text-scroll', {
			duration: 1,
			clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
			ease: 'circ.inOut',
		});

		const paragraphTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.message-content p',
				start: 'top 80%',
			},
		});
		paragraphTl.from(
			paragraphSplit.words,
			{
				yPercent: 300,
				rotate: 3,
				ease: 'power1.inOut',
				duration: 1,
				stagger: 0.01,
			},
			'-=0.5',
		);
	});

	return (
		<section className="message-content relative">
			<div className="container mx-auto flex-center py-28 relative">
				<div className="w-full h-full">
					<div className="msg-wrapper">
						<h1 className="first-message">Unleash your crazy side and</h1>

						<div
							style={{
								clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
							}}
							className="msg-text-scroll"
						>
							<div
								ref={useGsapHoverEffect()}
								className="bg-mid-green md:pb-5 pb-3 px-5"
							>
								<h2>
									Power <span className="text-[#FF204E]">Up</span>
								</h2>
							</div>
						</div>

						<h1 className="second-message">
							your day with every sip of Crazy Drink!
						</h1>
					</div>

					<div className="flex-center md:mt-20 mt-10">
						<div className="max-w-md px-8 flex-center overflow-hidden">
							<p>
								Crank up your crazy vibes and fuel every moment with Crazy Drink
								— one sip, and you’re back to epic nostalgia and unstoppable
								fun.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MessageSection;
