const containers = [
	{
		name: 'Moet & Chandon Champagne Bottle',
		description:
			'A bottle from 1980s Moet & Chandon, with a unique signature of the Champagne label.',
		price: 2400.0,
		imageUrl:
			'https://images.unsplash.com/photo-1643618829236-a23857519fb6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80',
		country: 'France',
		year: 1988,
		type: 'Champagne',
		hasLabel: true,
	},
	{
		name: 'Bibi Graetz Colore 20th Anniversary Label 2019',
		description:
			'Colore is the highest expression of Bibi Graetz dream. The drive of this wine is to create a pure excellence of Tuscany, a wine made with traditional Tuscan grapes sourced from some of the oldest and rarest vineyards of the region. Sangiovese represent the structure and the power of the wine, Colorino fruits and velvety tannins, Canaiolo minerality and intensity. On the best few barrels of the whole production will become Colore.',
		price: 229.0,
		imageUrl:
			'https://www.wine.com/product/images/w_480,h_600,c_fit,q_auto:good,fl_progressive/x4zreqk6ex32i6x6kmk2.jpg',
		country: 'Italy',
		year: 2019,
		type: 'Wine',
		hasLabel: false,
	},
	{
		name: 'Saxum James Berry Vineyard (1.5 Liter Magnum) 2014',
		description:
			'A dramatic wine that weds power and opulence, maintaining impeccable balance along the way. Brooding dark berry and loamy mineral aromas lead to rich flavors of currant, licorice, dried sage and smoky pepper.',
		price: 389.97,
		imageUrl:
			'https://www.wine.com/product/images/w_768,c_fit,q_auto:good,fl_progressive/167553.jpg',
		country: 'USA, Paso Robles, Central Coast, California',
		year: 2014,
		type: 'Wine',
		hasLabel: true,
	},
	{
		name: 'Pride Mountain Vineyards Reserve Cabernet Sauvignon (1.5 Liter Magnum) 2003',
		description:
			'Our Reserve Cabernet is made from our oldest and most expressive vineyard blocks of Clone 7 Cabernet and is aged in barrel 6 months longer compared to our Pride and Vintner Select cuvees.',
		price: 499.97,
		imageUrl:
			'https://www.wine.com/product/images/w_480,c_fit,q_auto:good,fl_progressive/152343.jpg',
		country: 'USA, St. Helena, Napa Valley, California',
		year: 2003,
		type: 'Wine',
		hasLabel: true,
	},
	{
		name: 'Sine Qua Non Pagan Poetry (375ML half-bottle) 2001',
		description:
			'Sine Qua Non was created after the 1994 harvest of a Bien Nacido Syrah named “The Queen of Spades”. Winemaker Manfred Krankl feels strongly that each vintage is a completely unique wine and thus he gives each wine a unique name.',
		price: 287.0,
		image:
			'https://www.wine.com/product/images/w_480,h_600,c_fit,q_auto:good,fl_progressive/qxpkeupf8yaj1tan6fpe.jpg',
		country: 'USA, Central Coast, California',
		year: 2001,
		type: 'Wine',
		hasLabel: false,
	},
	{
		name: 'Chateau Lafite Rothschild (Futures Pre-Sale) 2020',
		description:
			'Rather ethereal and so refined with finesse, focus and brightness that provides incredible energy and pedigree. It’s full-bodied with ultra fine tannins that go on and on. Superb presence with tannins that melt into the wine.',
		price: 709.0,
		image:
			'https://www.wine.com/product/images/w_1024,c_fit,q_auto:good,fl_progressive/kpycr55wbck78yah1prh.jpg',
		country: 'France',
		year: 2020,
		type: 'Wine',
		hasLabel: true,
	},
	{
		name: 'Chateau Latour (1.5 Liter Magnum) 2000',
		description:
			"Impressive deep, dark color. The wine has powerful, balanced structure. The dense structures and the unique qualities of the tannins may be superior to those of the '96 and '90 vintage. The balance of the wine combines class, rigor, complexity and great finesse in the fruit.",
		price: 2799.0,
		image:
			'https://www.wine.com/product/images/w_480,c_fit,q_auto:good,fl_progressive/138409.jpg',
		country: 'France',
		year: 2000,
		type: 'Wine',
		hasLabel: true,
	},
	{
		name: 'Jose Maria Da Fonseca Century Edition Kingsman Moscatel de Setubal (500ML) 1919',
		description:
			'It is with great pride and honor that José Maria da Fonseca presents the Moscatel Kingsman Century Edition 1919. This wine is a treasure among portuguese wines and José Maria da Fonseca is one of the most recognized and oldest producer. This 500 bottles limited edition was created in collaboration with Matthew Vaughn and MARV to celebrate the worldwide theatrical release of The King’s Man film.',
		price: 3499.0,
		image:
			'https://www.wine.com/product/images/w_1920,c_fit,q_auto:good,fl_progressive/vipvm7sjupkrsowgkq4y.jpg',
		country: 'Portugal',
		year: 1919,
		type: 'Wine',
		hasLabel: false,
	},
	{
		name: 'R. Lopez de Heredia Rioja White Vina Tondonia Gran Reserva 2001',
		description:
			'The White Tondonia Gran Reserva is golden in color with perfumed, persistent and complex aromas. Aged 10 years, being racked twice per year, this wine is round and very smooth on the palate.',
		price: 449.0,
		image:
			'https://www.wine.com/product/images/w_480,h_600,c_fit,q_auto:good,fl_progressive/urkrirl8itrvs6guv6tq.jpg',
		country: 'Spain',
		year: 2001,
		type: 'Wine',
		hasLabel: true,
	},
	{
		name: 'SEITZ & BRO EASTON PA BOTTLE',
		description:
			'This is a cobalt blue, about 6 7/8", squat, soda, beer or mineral water bottle.',
		price: 122.0,
		image: 'https://i.ebayimg.com/images/g/iVkAAOSwxcVimMOa/s-l1600.jpg',
		country: 'USA',
		year: 2016,
		type: 'Beer',
		hasLabel: true,
	},
	{
		name: 'Heineken Original Pure Malt',
		description:
			'Heineken Original Pure Malt Lager Beer with an Advertisement feel to it',
		price: 26.0,
		image:
			'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80',
		country: 'UK',
		year: 2014,
		type: 'Beer',
		hasLabel: true,
	},
	{
		name: 'Monkey 47',
		description: 'Monkey 47 gin bottle in perfect state.',
		price: 120.0,
		image:
			'https://images.unsplash.com/photo-1585409944718-79b9463b5c0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=960&q=80',
		country: 'Belgium',
		year: 2014,
		type: 'Gin',
		hasLabel: true,
	},
	{
		name: 'Koval classic',
		description:
			'Distilled in Chicago, Koval is a delicious Gin that’s made its way into Kyoto and beyond.',
		price: 67.5,
		image:
			'https://images.unsplash.com/photo-1514362362976-6eaab6068a08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80',
		country: 'USA, Chicago',
		year: 2018,
		type: 'Gin',
		hasLabel: true,
	},
	{
		name: 'Berzelius set of 3',
		description:
			'Set of 3 berzelius bottles. Each bottle is a different color and has a different flavor.',
		price: 1123.99,
		image:
			'https://images.unsplash.com/photo-1554475900-0a0350e3fc7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1017&q=80',
		country: 'Belarus',
		year: 1999,
		type: 'Flask',
		hasLabel: false,
	},
	{
		name: 'Jack Daniels no. 7 Whiskey Flask',
		description:
			'Original Jack Daniels Flask, manufactured in the USA. It is a unique bottle that is made of stainless steel.',
		price: 89.25,
		image:
			'https://images.unsplash.com/photo-1628144526492-788bf37d3495?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
		country: 'USA, San Francisco',
		year: 2017,
		type: 'Flask',
		hasLabel: false,
	},
	{
		name: 'Elegant jet black flask',
		description:
			'This flask is a unique and elegant jet black flask. It is made of stainless steel with a beautiful silver finish on the cap. It was showcased in Montreal at the fine drinks fair in the summer of 2019.',
		price: 176.0,
		image:
			'https://images.unsplash.com/photo-1597301841029-a2162f4e6f9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
		country: 'Canada',
		year: 2019,
		type: 'Flask',
		hasLabel: false,
	},
];

const collections = [
	{
		id: '1',
		name: 'Old gin',
		description: 'A collection of fine old gin bottles',
		imageUrl:
			'https://images.unsplash.com/photo-1601751818941-571144562ff8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
		owner: 'Don',
		containers: [containers[11], containers[12]],
	},
	{
		id: '2',
		name: 'Fine beer',
		description: 'Funky beers from the past',
		imageUrl:
			'https://images.unsplash.com/photo-1534280113419-39bd807de180?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
		owner: 'Don',
		containers: [containers[9], containers[10]],
	},
	{
		id: '3',
		name: 'Exquisite wine',
		description: "The most beautiful wine bottles I've ever owned",
		imageUrl:
			'https://images.unsplash.com/photo-1592361557476-5c9eea53b04a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80',
		owner: 'Don',
		containers: [
			containers[0],
			containers[5],
			containers[6],
			containers[7],
			containers[8],
		],
	},
	{
		id: '4',
		name: 'Wine blessing',
		description: 'A collection of classic Champagne bottles',
		imageUrl:
			'https://images.unsplash.com/photo-1536346323287-0b6aa9e7d715?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1033&q=80',
		owner: 'AndrewCautzishanoo',
		containers: [containers[1], containers[3], containers[4]],
	},
	{
		id: '5',
		name: 'Chemistry! 💥',
		description: 'Chemistry flasks around the world',
		imageUrl:
			'https://images.unsplash.com/photo-1616255234550-fc041b293e29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80',
		owner: 'AndrewCautzishanoo',
		containers: [containers[13]],
	},
	{
		id: '6',
		name: 'Sober flasks',
		description: 'Serious business flasks with a flavourful name',
		imageUrl:
			'https://images.unsplash.com/photo-1597301841029-a2162f4e6f9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
		owner: 'BradP',
		containers: [containers[14], containers[15]],
	},
];

export { containers, collections };
