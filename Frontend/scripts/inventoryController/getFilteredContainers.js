function getFilteredContainers() {
	filteredContainers = currentContainers;

	const itemCountry = document.querySelector('#country-field').value;
	const itemOlderThanYear = Number(document.querySelector('#year-field').value);
	const itemLabel = document.querySelector('#label-field').value;
	const itemType = document.querySelector('#type-field').value;
	const itemPriceLessThan = Number(
		document.querySelector('#price-le-field').value
	);
	const itemPriceGreaterThan = Number(
		document.querySelector('#price-ge-field').value
	);

	const cardsContainer = document.querySelector('.all-collections-container');
	cardsContainer.innerHTML = '';

	if (itemCountry !== 'all') {
		filteredContainers = filteredContainers.filter(
			(container) => container.country === itemCountry
		);
	}

	if (itemLabel !== 'all') {
		filteredContainers = filteredContainers.filter(
			(container) => container.hasLabel === Boolean(itemCountry)
		);
	}

	if (itemType !== 'all') {
		filteredContainers = filteredContainers.filter(
			(container) => container.type.toLowerCase() === itemType
		);
	}

	if (itemPriceLessThan !== 0) {
		filteredContainers = filteredContainers.filter(
			(container) => container.price < itemPriceLessThan
		);
	}

	if (itemPriceGreaterThan !== 0) {
		filteredContainers = filteredContainers.filter(
			(container) => container.price > itemPriceGreaterThan
		);
	}

	if (itemOlderThanYear !== new Date().getFullYear) {
		filteredContainers = filteredContainers.filter(
			(container) => container.year < itemOlderThanYear
		);
	}

	console.log(currentContainers);
	console.log(filteredContainers);

	filteredContainers.forEach((container) => {
		const collectionCard = document.createElement('a');

		collectionCard.setAttribute(
			'href',
			`/Frontend/containers.html?id=${container.id}`
		);

		collectionCard.innerHTML = `<div class="collection-card">
        <img
            src="${container.imageUrl}"
            alt=""
        />
        <div class="card-gradient"  data-testid=${container.id}></div>
        <label class="card-label">${container.name}</label>
    </div>`;
		cardsContainer.prepend(collectionCard);
	});
}

function getStatistics() {
	console.log(filteredContainers);
	const countries = filteredContainers.map((container) =>
		container.country.toLowerCase()
	);
	const labels = filteredContainers.map((container) => container.hasLabel);
	const types = filteredContainers.map((container) =>
		container.type.toLowerCase()
	);
	const prices = filteredContainers.map((container) => container.price);
	const years = filteredContainers.map((container) => container.year);

	const countriesCount = countries.reduce((acc, curr) => {
		if (acc[curr]) {
			acc[curr]++;
		} else {
			acc[curr] = 1;
		}
		return acc;
	}, {});

	const labelsCount = labels.reduce((acc, curr) => {
		if (acc[curr]) {
			acc[curr]++;
		} else {
			acc[curr] = 1;
		}
		return acc;
	}, {});

	const typesCount = types.reduce((acc, curr) => {
		if (acc[curr]) {
			acc[curr]++;
		} else {
			acc[curr] = 1;
		}
		return acc;
	}, {});

	const pricesCount = prices.reduce((acc, curr) => {
		if (acc[curr]) {
			acc[curr]++;
		} else {
			acc[curr] = 1;
		}
		return acc;
	}, {});

	const yearsCount = years.reduce((acc, curr) => {
		if (acc[curr]) {
			acc[curr]++;
		} else {
			acc[curr] = 1;
		}
		return acc;
	}, {});

	const pricesBuckets = {
		100: 0,
		500: 0,
		1000: 0,
		1500: 0,
		2000: 0,
	};

	const yearsBuckets = {
		1900: 0,
		1950: 0,
		2000: 0,
		2010: 0,
		2020: 0,
	};

	Object.entries(pricesCount).map(([key, value]) => {
		if (key < 100) {
			pricesBuckets[100] += value;
		}
		if (key >= 100 && key < 500) {
			pricesBuckets[100] += value;
		}
		if (key >= 500 && key < 1000) {
			pricesBuckets[500] += value;
		}
		if (key >= 1000 && key < 1500) {
			pricesBuckets[1000] += value;
		}
		if (key >= 1500 && key < 2000) {
			pricesBuckets[1500] += value;
		}
	});

	Object.entries(yearsCount).map(([key, value]) => {
		if (key < 1900) {
			yearsBuckets[1900] += value;
		}
		if (key >= 1900 && key < 1950) {
			yearsBuckets[1900] += value;
		}
		if (key >= 1950 && key < 2000) {
			yearsBuckets[1950] += value;
		}
		if (key >= 2000 && key < 2010) {
			yearsBuckets[2000] += value;
		}
		if (key >= 2010 && key < 2020) {
			yearsBuckets[2010] += value;
		}
	});

	console.log(countriesCount);
	console.log(labelsCount);
	console.log(typesCount);
	console.log(pricesBuckets);
	console.log(yearsBuckets);

	let csvStats = '';

	const countryStats = convertJsonToCsv([countriesCount]);
	const labelsStats = convertJsonToCsv([labelsCount]);
	const typesStats = convertJsonToCsv([typesCount]);
	const pricesStats = convertJsonToCsv([pricesBuckets]);
	const yearsStats = convertJsonToCsv([yearsBuckets]);

	csvStats =
		'Country\n' +
		countryStats +
		'\n\nHas habel\n' +
		labelsStats +
		'\n\nType\n' +
		typesStats +
		'\n\nPrices\n' +
		pricesStats +
		'\n\nYears\n' +
		yearsStats;
	downloadTextfile('statistics.csv', csvStats);

	const pdfStats = new jsPDF({
		orientation: 'landscape',
	});

	pdfStats.text(csvStats, 10, 10);
	pdfStats.save('statistics.pdf');
}
