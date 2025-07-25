import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartContext } from '../components/Context';
import { flavors } from '../components/flavor';

const DELIVERY_FEES = 42;

const Shop = () => {
	const [cart, setCart] = useContext(cartContext);
	const navigate = useNavigate();

	const addToCartHandler = (id) => {
		const currentItem = flavors.find((item) => item.id === id);
		const alreadyInCart = cart.find((cartItem) => cartItem.id === id);
		if (alreadyInCart) {
			return;
		}
		const updateCart = [...cart, currentItem];
		setCart(updateCart);
		localStorage.setItem('cart', JSON.stringify(updateCart));
	};

	const buyNowHandler = (flavor) => {
		// Only this item, quantity 1
		const orderItem = { ...flavor, quantity: 1 };
		const subTotal = orderItem.price;
		const total = subTotal + DELIVERY_FEES;
		navigate('/checkout', {
			state: {
				cart: [orderItem],
				deliveryFee: DELIVERY_FEES,
				total,
			},
		});
	};

	const [currentIndexes, setCurrentIndexes] = useState(
		Array(flavors.length).fill(0),
	);
	const intervals = useRef({});

	const handleMouseEnter = (idx, imagesLength) => {
		if (intervals.current[idx]) return;
		intervals.current[idx] = setInterval(() => {
			setCurrentIndexes((prev) => {
				const newArr = [...prev];
				newArr[idx] = (newArr[idx] + 1) % imagesLength;
				return newArr;
			});
		}, 800);
	};

	const handleMouseLeave = (idx) => {
		clearInterval(intervals.current[idx]);
		intervals.current[idx] = null;
		setCurrentIndexes((prev) => {
			const newArr = [...prev];
			newArr[idx] = 0;
			return newArr;
		});
	};

	return (
		<section className="h-auto w-dvw bg-white p-10 md:px-15 lg:px-75 py-15 md:py-30 col-center">
			<h1 className="text-black text-7xl mb-10">Shop</h1>
			<div className="flex flex-wrap gap-8 w-auto justify-center lg:items-start">
				{flavors.map((flavor, idx) => {
					const alreadyInCart = cart.find(
						(cartItem) => cartItem.id === flavor.id,
					);
					return (
						<div
							key={flavor.id + idx}
							className="shadow-lg rounded-lg p-6 flex flex-col items-center w-80"
							style={{ borderTop: `12px solid ${flavor.color}` }}
							onMouseEnter={() => handleMouseEnter(idx, flavor.images.length)}
							onMouseLeave={() => handleMouseLeave(idx)}
						>
							<img
								src={`/crazydrinks/images/${flavor.images[currentIndexes[idx]]}`}
								alt={flavor.name}
								className="w-56 h-56 object-cover rounded mb-4 transition-opacity duration-500 ease-in-out"
								style={{ opacity: 1 }}
							/>
							<div className="text-black font-paragraph w-full text-center">
								<h2 className="text-2xl font-bold mb-2">{flavor.name}</h2>
								<p className="text-gray-600 mb-2">{flavor.shortDescription}</p>
								<p className="text-xl font-bold text-black mb-2">
									₹ {flavor.price}
								</p>
							</div>
							<div className="w-full flex justify-between font-paragraph mt-4 z-20">
								<button
									type="button"
									className="text-white font-medium rounded-lg text-sm px-5 py-2.5 transition hover:brightness-90"
									style={{
										backgroundColor: flavor.color,
									}}
									onClick={() => buyNowHandler(flavor)}
								>
									Buy now
								</button>
								{alreadyInCart ? (
									<button
										onClick={() => navigate('/cart')}
										type="button"
										className="hover:cursor-pointer text-white bg-black hover:bg-gray-900 font-bold rounded-lg text-sm px-5 py-2.5"
									>
										Go to Cart 🛒
									</button>
								) : (
									<button
										onClick={() => addToCartHandler(flavor.id)}
										type="button"
										className="hover:cursor-pointer text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5"
									>
										Add to cart
									</button>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default Shop;
