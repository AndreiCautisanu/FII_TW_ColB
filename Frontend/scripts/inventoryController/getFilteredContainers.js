function getFilteredContainers() {
	let filteredContainers = currentContainers;

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
        <div class="card-gradient  data-testid=${container.id}></div>
        <label class="card-label">${container.name}</label>
    </div>`;
		cardsContainer.prepend(collectionCard);
	});
}

function getStatistics() {}
