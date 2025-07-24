import { nanoid } from 'nanoid';
import { createContext, useEffect, useState } from 'react';
export const cartContext = createContext(null);

const Context = (props) => {
	const [cart, setCart] = useState([]);

	return (
		<cartContext.Provider value={[cart, setCart]}>
			{props.children}
		</cartContext.Provider>
	);
};

export default Context;
