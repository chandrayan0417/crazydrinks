import React, { useContext, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from 'react-router-dom';
import gpay from '../assets/google-pay-svgrepo-com.svg';
import paypal from '../assets/paypal-logo-svgrepo-com.svg';
import stripe from '../assets/stripe-svgrepo-com.svg';
import { cartContext } from '../components/Context';

const Cart = () => {
	const [cart, setCart] = useContext(cartContext);
	const navigate = useNavigate();
	const isMobile = useMediaQuery({
		query: '(max-width: 600px)',
	});

	useEffect(() => {
		const parseCart = JSON.parse(localStorage.getItem('cart')) || [];
		setCart(parseCart.filter((item) => item.isAvailable !== false));
	}, [setCart]);

	let subTotal = 0;
	for (const item of cart) {
		subTotal += (item.price || 120) * (item.quantity || 1);
	}
	const tax = subTotal * 0.05;
	const handlingFee = subTotal > 0 ? 42 : 0;
	const totalPrice = subTotal + tax + handlingFee;

	const handleAdd = (item) => {
		if (item.quantity >= 10) return;
		const updatedCart = cart.map((cartItem) =>
			cartItem.id === item.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem,
		);
		setCart(updatedCart);
		localStorage.setItem('cart', JSON.stringify(updatedCart));
	};

	const handleRemove = (item) => {
		if (item.quantity <= 1) return;
		const updatedCart = cart.map((cartItem) =>
			cartItem.id === item.id
				? { ...cartItem, quantity: cartItem.quantity - 1 }
				: cartItem,
		);
		setCart(updatedCart);
		localStorage.setItem('cart', JSON.stringify(updatedCart));
	};

	const handleCartRemove = (item) => {
		const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
		setCart(updatedCart);
		localStorage.setItem('cart', JSON.stringify(updatedCart));
		// toast.error(`${item.name} removed from cart`);
	};

	if (cart.length === 0) {
		return (
			<section className="h-dvh bg-white flex items-center justify-center flex-col gap-3">
				<i className="ri-close-circle-fill text-9xl text-gray-400" />
				<h1 className="text-2xl text-gray-400">
					There are no items in your cart.
				</h1>
				<Link
					className="py-2 px-7 rounded-sm transition delay-75 ease-in-out duration-200 bg-[#F72E41] text-white hover:bg-red-600"
					to="/shop"
				>
					Go to shop
				</Link>
			</section>
		);
	}

	return (
		<section className="min-h-dvh w-dvw pt-20 md:pt-40 bg-white text-black lg:flex px-3 pb-3 md:px-15 lg:text-xl font-paragraph font-light">
			<div className="lg:w-2/3 mb-5">
				<div className="lg:flex w-full mb-5 sticky top-16 z-50 hidden">
					<div className="flex w-3/5 justify-between px-5">
						<h1>Drink Details</h1>
						<h1>Quantity</h1>
					</div>
					<div className="flex w-2/5 justify-around lg:pr-20">
						<h1>Price</h1>
						<h1>Total</h1>
					</div>
				</div>
				<div className="flex flex-col gap-3">
					{cart.map((item) => (
						<div
							key={item.id + 'cart'}
							className="border-2 rounded-lg border-zinc-200 flex gap-3 justify-between items-center hover:scale-101 hover:shadow-xs duration-200 cursor-default"
							style={{ borderLeft: `8px solid ${item.color}` }}
						>
							<div className="flex md:w-3/5 justify-between py-3 pl-3 w-full">
								<div className="flex md:gap-3 gap-1 items-center">
									<img
										src={`/crazydrinks/images/${item.images ? item.images[0] : 'mango-front.png'}`}
										alt={item.name}
										className="w-[60px] h-[60px] flex-shrink-0 object-cover rounded-lg border-2"
										style={{
											borderColor: item.color,
										}}
									/>
									<div className="flex flex-col gap-2 ">
										<h1 className="font-bold">{item.name}</h1>
										{!isMobile && (
											<p className="text-xs text-gray-500">
												{item.shortDescription}
											</p>
										)}
									</div>
								</div>
								{/* Quantity controls */}
								<div className="flex md:gap-5 gap-2 justify-center items-center">
									<button
										onClick={() => handleRemove(item)}
										type="button"
										disabled={item.quantity <= 1}
										className={`${item.quantity <= 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
									>
										<i className="ri-subtract-line" />
									</button>
									<div className="w-8 md:w-10 h-8 md:h-10 border-2 rounded-xs border-zinc-200 flex justify-center items-center">
										<span>{String(item.quantity || 1).padStart(2, '0')}</span>
									</div>
									<button
										onClick={() => handleAdd(item)}
										type="button"
										disabled={item.quantity >= 10}
										className={`${item.quantity >= 10 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
									>
										<i className="ri-add-line" />
									</button>
								</div>
							</div>
							{/* Price and Remove */}
							<div className="md:w-2/5 flex justify-between items-center pr-3 gap-4 lg:p-0">
								<div className="flex justify-around w-4/5 lg:pr-3">
									<div className="hidden md:flex">₹ {item.price || 120}</div>
									<div>{(item.price || 120) * (item.quantity || 1)}</div>
								</div>
								<button
									type="button"
									onClick={() => handleCartRemove(item)}
									className="text-2xl lg:text-3xl flex justify-center items-center hover:bg-[#F72E41] hover:text-white hover:cursor-pointer w-1/5 h-21 rounded-r-lg duration-200"
								>
									<i className="ri-delete-bin-line" />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
			{/* Order Summary */}
			<div className="lg:w-1/3 h-fit lg:mx-20 lg:mt-12 lg:p-5 p-3 border-2 border-zinc-200 lg:sticky lg:top-50 rounded-lg flex flex-col lg:gap-5 gap-3">
				<div className="lg:text-3xl text-2xl">Order Summary</div>
				<div className="flex flex-col gap-2">
					<div className="flex justify-between lg:text-xl">
						<h1>Subtotal</h1>
						<strong>₹ {subTotal.toFixed(2)}</strong>
					</div>
					<div className="flex justify-between lg:text-xl">
						<h1>Estimated tax</h1>
						<strong>₹ {tax.toFixed(2)}</strong>
					</div>
					<div className="flex justify-between lg:text-xl">
						<h1>Delivery & handling fees</h1>
						<strong>₹ {handlingFee.toFixed(2)}</strong>
					</div>
					<div className="flex justify-between border-t-2 border-zinc-200 pt-1">
						<strong>Total</strong>
						<strong>₹ {totalPrice.toFixed(2)}</strong>
					</div>
				</div>
				<button
					className="text-center w-full px-20 py-3 rounded-lg bg-[#F72E41] text-white hover:bg-red-600"
					type="button"
					onClick={() =>
						navigate('/checkout', { state: { total: totalPrice.toFixed(2) } })
					}
				>
					Check Out <i className="ri-arrow-right-long-line" />
				</button>
				<div>
					<p className="font-light text-sm text-center">
						Available payment options
					</p>
					<div className="flex items-center md:scale-150 scale-110 justify-center">
						<img
							src={gpay}
							alt="Google Pay"
							className="h-10 w-16 object-contain scale-170 mx-5"
						/>
						<img
							src={paypal}
							alt="PayPal"
							className="h-10 w-16 object-contain scale-150"
						/>
						<img
							src={stripe}
							alt="Stripe"
							className="h-10 w-16 object-contain scale-80"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Cart;
