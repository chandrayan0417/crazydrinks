import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { menuSlide, scale, slide } from './anim';
import './nav.css';

const navItems = [
	{ title: 'Home', href: '/' },
	{ title: 'Shop', href: '/shop' },
	{ title: 'About', href: '/about' },
	{ title: 'Cart', href: '/cart' },
];

function NavLink({ data, isActive, setSelectedIndicator, closeNav }) {
	const { title, href, index } = data;

	return (
		<motion.div
			className=" relative flex items-center hover:text-neutral-200"
			onMouseEnter={() => setSelectedIndicator(href)}
			onMouseLeave={() => setSelectedIndicator(null)}
			custom={index}
			variants={slide}
			initial="initial"
			animate="enter"
			exit="exit"
		>
			<motion.div
				variants={scale}
				animate={isActive ? 'open' : 'closed'}
				className="w-4 h-4 absolute bg-white mt-4 rounded-full -left-7"
			/>
			<RouterLink
				to={href}
				className={isActive ? 'active' : ''}
				style={{ textDecoration: 'none', color: 'inherit' }}
				onClick={() => {
					closeNav();
					window.scrollTo(0, 0);
				}}
			>
				{title}
			</RouterLink>
		</motion.div>
	);
}

export default function Nav({ closeNav }) {
	const location = useLocation();
	const pathname = location.pathname;
	const [selectedIndicator, setSelectedIndicator] = useState(pathname);

	return (
		<motion.div
			variants={menuSlide}
			initial="initial"
			animate="enter"
			exit="exit"
			className="menu backdrop-blur-3xl"
		>
			<div className="body">
				<div
					onMouseLeave={() => setSelectedIndicator(pathname)}
					className="nav"
				>
					{navItems.map((data, index) => (
						<NavLink
							key={index}
							data={{ ...data, index }}
							isActive={selectedIndicator === data.href}
							setSelectedIndicator={setSelectedIndicator}
							closeNav={closeNav}
						/>
					))}
				</div>
				<div className="footer">
					<a className="flinks " href="#">
						YouTube
					</a>
					<a className="flinks" href="#">
						Instagram
					</a>
					<a className="flinks" href="#">
						Amazon
					</a>
					<a className="flinks" href="#">
						Flipkart
					</a>
				</div>
			</div>
		</motion.div>
	);
}
