import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Nav from './Nav';
import './button.css';
import useGsapHoverEffect from '../useGsapHoverEffect';

export default function Button() {
	const [isActive, setIsActive] = useState(false);

	return (
		<>
			<div
				ref={useGsapHoverEffect()}
				onClick={() => {
					setIsActive(!isActive);
				}}
				className="button"
			>
				<div className={`burger ${isActive ? 'burgerActive' : ''}`} />
			</div>
			<AnimatePresence  mode="wait">{isActive && <Nav closeNav={() => setIsActive(false)} />}</AnimatePresence>
		</>
	);
}
