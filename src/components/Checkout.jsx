import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cartContext } from '../components/Context';

const DELIVERY_FEES = 42;

const Checkout = () => {
	const [cart, setCart] = useContext(cartContext);
	const location = useLocation();
	const navigate = useNavigate();

	const checkoutCart =
		location.state?.cart && Array.isArray(location.state.cart)
			? location.state.cart
			: cart;

	const deliveryFee = location.state?.deliveryFee ?? DELIVERY_FEES;

	const total =
		location.state?.total ??
		checkoutCart.reduce(
			(sum, item) => sum + (item.price || 0) * (item.quantity || 1),
			0,
		) + deliveryFee;

	const [address, setAddress] = useState({
		name: '',
		phone: '',
		line1: '',
		city: '',
		pincode: '',
	});
	const [error, setError] = useState('');

	const handleChange = (e) => {
		setAddress({ ...address, [e.target.name]: e.target.value });
		setError('');
	};

	const handlePay = (e) => {
		e.preventDefault();
		if (
			!address.name.trim() ||
			!address.phone.trim() ||
			!address.line1.trim() ||
			!address.city.trim() ||
			!address.pincode.trim()
		) {
			setError('Please fill all address fields!');
			return;
		}
		setCart([]);
		localStorage.setItem('cart', '[]');
		alert('Payment Successful! 🎉 Your order has been placed.');
		navigate('/'); // Thank You ya Home page redirect
	};

	return (
		<section className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-white p-6 md:py-25 font-paragraph">
			<h1 className="text-black text-3xl md:text-5xl font-extrabold mb-8 text-center">
				Checkout
			</h1>

			<div className="bg-black/5 rounded-xl p-5 md:p-8 w-full max-w-xl mb-8 flex flex-col items-center">
				<h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
					Order Summary
				</h2>
				<ul className="w-full mb-4">
					{checkoutCart.map((item) => (
						<li
							key={item.id}
							className="flex justify-between py-2 border-b border-zinc-200 text-black"
						>
							<span>
								{item.name}
								<span className="ml-2 text-gray-500 text-sm">
									× {item.quantity || 1}
								</span>
							</span>
							<span>₹ {(item.price || 0) * (item.quantity || 1)}</span>
						</li>
					))}
				</ul>
				<div className="w-full flex justify-between items-center text-base text-black mb-1">
					<span>Delivery & Handling Fee</span>
					<span>₹ {deliveryFee}</span>
				</div>
				<div className="w-full flex justify-between items-center mb-6 text-xl font-bold text-black border-t border-zinc-200 pt-2">
					<span>Total</span>
					<span>₹ {total}</span>
				</div>
			</div>

			<form
				onSubmit={handlePay}
				className="flex flex-col gap-4 bg-black/5 rounded-xl p-5 md:p-8 w-full max-w-xl"
			>
				<h2 className="text-2xl font-bold mb-2 text-black">Address</h2>
				<input
					type="text"
					name="name"
					placeholder="Full Name"
					value={address.name}
					onChange={handleChange}
					className="p-3 rounded border border-black text-black font-medium"
					autoComplete="name"
				/>
				<input
					type="tel"
					name="phone"
					placeholder="Phone Number"
					value={address.phone}
					onChange={handleChange}
					className="p-3 rounded border border-black text-black font-medium"
					autoComplete="tel"
					maxLength={10}
				/>
				<input
					type="text"
					name="line1"
					placeholder="Address Line"
					value={address.line1}
					onChange={handleChange}
					className="p-3 rounded border border-black text-black font-medium"
					autoComplete="street-address"
				/>
				<input
					type="text"
					name="city"
					placeholder="City"
					value={address.city}
					onChange={handleChange}
					className="p-3 rounded border border-black text-black font-medium"
					autoComplete="address-level2"
				/>
				<input
					type="text"
					name="pincode"
					placeholder="Pincode"
					value={address.pincode}
					onChange={handleChange}
					className="p-3 rounded border border-black text-black font-medium"
					autoComplete="postal-code"
					maxLength={6}
				/>
				{error && (
					<div className="text-red-400 text-sm text-center">{error}</div>
				)}
				<div className="flex w-full justify-between gap-1">
					<button
						onClick={() => navigate(-1)}
						type="button"
						className="mt-4 bg-black text-white md:text-xl font-bold py-3 rounded-lg hover:cursor-pointer hover:bg-gray-900 transition w-2/5"
					>
						Go Back
					</button>
					<button
						type="submit"
						className="mt-4 bg-black text-white md:text-xl font-bold py-3 rounded-lg hover:cursor-pointer hover:bg-gray-900 transition w-3/5 md:w-2/5"
						disabled={checkoutCart.length === 0}
					>
						Pay & Place Order
					</button>
				</div>
			</form>
		</section>
	);
};

export default Checkout;
