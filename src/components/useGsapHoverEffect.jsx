import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const useGsapHoverEffect = () => {
	const ref = useRef(null);

	useEffect(() => {
		let boundingRect = null;

		const handleMouseMove = (e) => {
			if (!ref.current) return;
			// Get bounding rect every time to stay in sync with scroll
			boundingRect = ref.current.getBoundingClientRect();
			const mousePosX = e.clientX - boundingRect.left;
			const mousePosY = e.clientY - boundingRect.top;
			gsap.to(ref.current, {
				x: (mousePosX - boundingRect.width / 2) * 0.4,
				y: (mousePosY - boundingRect.height / 2) * 0.4,
				duration: 0.8,
				ease: 'power3.out',
			});
		};

		const handleMouseLeave = () => {
			gsap.to(ref.current, {
				x: 0,
				y: 0,
				duration: 0.8,
				ease: 'elastic.out(1,0.3)',
			});
		};

		const node = ref.current;
		if (node) {
			node.addEventListener('mousemove', handleMouseMove);
			node.addEventListener('mouseleave', handleMouseLeave);
		}
		return () => {
			if (node) {
				node.removeEventListener('mousemove', handleMouseMove);
				node.removeEventListener('mouseleave', handleMouseLeave);
			}
		};
	}, []);

	return ref;
};

export default useGsapHoverEffect;
