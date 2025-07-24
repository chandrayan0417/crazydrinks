import gsap from 'gsap';
import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from './navigation/Button';
import useGsapHoverEffect from './useGsapHoverEffect';

const Navbar = () => {
	return (
		<div className="nav-container">
			<nav className="fixed top-0 left-0 z-50 md:p-9 p-3 flex justify-between w-full">
				<NavLink to="/">
					<img src="/images/logo.svg" alt="logo" className="w-20 md:w-30" />
				</NavLink>
				<Button />
			</nav>
		</div>
	);
};

export default Navbar;
