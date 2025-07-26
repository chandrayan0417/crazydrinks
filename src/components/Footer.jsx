import React, { useState } from 'react';

const Footer = () => {
	const [email, setEmail] = useState('');

	return (
		<div className="w-full h-70 md:h-150 bg-[#C0C9EE] text-black ">
			<div className="w-full h-2/5 md:h-3/7  md:flex border-t">
				<div className="md:w-1/2 h-full  border-r col-center gap-3 md:gap-8">
					<h1 className="text-2xl md:text-5xl">Subscribe for newsletter</h1>
					<div className="w-[80%] md:w-[50%] h-14 bg-white text-black rounded-full border overflow-hidden">
						<input
							className="w-[80%] h-full outline-0 border-r px-5 text-xl"
							type="email"
							name="Email"
							value={email}
							placeholder="Email"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<button
							className="w-[20%] h-full bg-amber-100 rounded-r-full hover:cursor-pointer"
							type="button"
						>
							<i className="ri-arrow-right-long-line text-3xl" />
						</button>
					</div>
				</div>
				<div className="md:w-1/2 h-full hidden md:flex justify-center items-center flex-col gap-8">
					<h1 className="text-5xl">Socials</h1>
					<div className="flex text-4xl gap-7">
						<i className="ri-youtube-fill border rounded-full p-3 hover:cursor-pointer" />
						<i className="ri-instagram-fill rounded-full p-3 border hover:cursor-pointer" />
					</div>
				</div>
			</div>
			<div className="h-2/5 lg:h-3/7  w-full border-t flex text-6xl items-center md:text-9xl lg:text-[200px] amarante-regular flex justify-between px-3 md:px-10 overflow-hidden">
				<h1>CRAZY</h1> <h1>DRINKS</h1>
			</div>
			<div className="h-1/7 w-full  border-t justify-between flex text-sm md:text-3xl items-center px-5">
				<h1>Crazy Drinks Co.</h1>
				<h1>© 2025 | ALL RIGHTS RESERVED</h1>
				<a
					href="https://github.com/chandrayan0417/"
					target="_blank"
					rel="noopener"
				>
					@chandrayan0417
				</a>
			</div>
		</div>
	);
};

export default Footer;
