import { nanoid } from 'nanoid';

export const flavors = [
	{
		id: nanoid(),
		name: 'Supreme Aam-Rush',
		shortDescription: 'Desi mango madness with a tangy summer twist',
		longDescription:
			'Indulge in the king of fruits with Supreme Aam-Rush! Juicy Alphonso mangoes blend with a zesty citrus twist for that ultimate Indian summer experience. Ingredients: Mango puree, lemon essence, natural cane sugar, vitamin C, caffeine.',
		images: [
			'mango-front.png',
			'mango-front-tilted.png',
			'mango.png',
			'mango-tilted.png',
		],
		color: '#F9B572', // Bright mango yellow
		quantity: 1,
		price: 250,
	},
	{
		id: nanoid(),
		name: 'Wild Berry-Blast',
		shortDescription: 'Juicy berries explode with wild, fruity flavor energy',
		longDescription:
			'Dive into a berry bonanza with Wild Berry-Blast! A punchy mix of strawberries, blueberries, and raspberries for non-stop energy and a fruity high. Ingredients: Mixed berry juice, blueberry extract, natural sugars, vitamin B complex, caffeine.',
		images: [
			'strawberry-front.png',
			'strawberry-front-tilted.png',
			'strawberry.png',
			'strawberry-tilted.png',
		],
		color: '#FF8080', // Wild berry pink
		quantity: 1,
		price: 225,
	},
	{
		id: nanoid(),
		name: 'Zesty Lemon-Burn',
		shortDescription: 'Lemon zest meets chili heat for bold refreshment',
		longDescription:
			'Get zapped with Zesty Lemon-Burn! Zingy lemons and a hint of red chili create a bold, spicy refreshment that’s totally unique. Ingredients: Lemon juice, chili extract, natural cane sugar, electrolytes, caffeine.',
		images: [
			'lemon-front.png',
			'lemon-front-tilted.png',
			'lemon.png',
			'lemon-tilted.png',
		],
		color: '#A3DC9A', // Lemon yellow
		quantity: 1,
		price: 210,
	},
	{
		id: nanoid(),
		name: 'Tandoori Apple-Twist',
		shortDescription: 'Spiced apple fusion with smoky desi street vibes',
		longDescription:
			'Feel the streets of India with Tandoori Apple-Twist! Crisp apple meets warm tandoori spices for a uniquely desi, smoky flavor. Ingredients: Apple juice, cinnamon & clove, tandoori spice blend, natural sweetener, caffeine.',
		images: [
			'apple-front.png',
			'apple-front-tilted.png',
			'apple.png',
			'apple-tilted.png',
		],
		color: '#EFB495', // Spicy orange
		quantity: 1,
		price: 265,
	},
	{
		id: nanoid(),
		name: 'Midnight Blue-Lush',
		shortDescription: 'Chill blueberry burst with cool minty aftertaste',
		longDescription:
			'Refreshing and mysterious, Midnight Blue-Lush combines sweet blueberries with a cool mint finish for those late-night chills. Ingredients: Blueberry juice, mint essence, natural sweetener, vitamin B12, caffeine.',
		images: [
			'blueberry-front.png',
			'blueberry-front-tilted.png',
			'blueberry.png',
			'blueberry-tilted.png',
		],
		color: '#D0BFFF', // Midnight blue
		quantity: 1,
		price: 295,
	},
];
