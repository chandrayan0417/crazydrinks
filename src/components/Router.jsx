import { Route, Routes } from 'react-router-dom';
import About from '../routes/About';
import Cart from '../routes/Cart';
import Home from '../routes/Home';
import PageNotFound from '../routes/PageNotFound';
import Shop from '../routes/Shop';
import Checkout from './Checkout';

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/shop" element={<Shop />} />
			<Route path="/about" element={<About />} />
			<Route path="/cart" element={<Cart />} />
			<Route path="/checkout" element={<Checkout />} />
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
};

export default Router;
