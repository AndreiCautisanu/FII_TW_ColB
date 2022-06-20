// function used to filter the containers based on country, label, year, type and price
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

	// first clean the wrapper to only add the filtered containers to it
	const cardsContainer = document.querySelector('.all-collections-container');
	cardsContainer.innerHTML = '';

	// only filter if the filter does not have the default value
	// same for the other filters below
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

	// for each container that respects the filters, create a card element and append it to the wrapper
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

// export the statistics on the currently displayed cards
// if a filter is applied, the stats will refer to only those containers
// statistics are exported to csv and pdf
// NOTE: instead of 5 csv files, only one with the concatenated results is exported - for practical reasons only
function getStatistics() {
	console.log(filteredContainers);
	// first only retrieve the values that we're interested in
	const countries = filteredContainers.map((container) =>
		container.country.toLowerCase()
	);
	const labels = filteredContainers.map((container) => container.hasLabel);
	const types = filteredContainers.map((container) =>
		container.type.toLowerCase()
	);
	const prices = filteredContainers.map((container) => container.price);
	const years = filteredContainers.map((container) => container.year);

	// for each such field, create a reducer
	// e.g. from an array of the form [true, true, true, false, true] (i.e. on the hasLabel field)
	// the reducer will return the number of true / false values in the following form: {true: 4, false: 1}
	// the same applies for the other fields below
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

	// for the prices there are buckets created so that the values are grouped in ranges
	const pricesBuckets = {
		100: 0, // prices below 100
		500: 0, // prices between 100 and 500
		1000: 0, // between 500 and 1000
		1500: 0, // ...
		2000: 0, // ...
	};

	// same as for the prices
	const yearsBuckets = {
		1900: 0,
		1950: 0,
		2000: 0,
		2010: 0,
		2020: 0,
	};

	// iterating through the prices and years arrays to group them in the buckets above
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

	// convert each json statistic to csv string
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
