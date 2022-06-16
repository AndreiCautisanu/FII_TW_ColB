const API_URL_LOGIN = 'http://localhost:8000/gql';

async function createItem() {
	const itemName = document.querySelector('#name-field').value;
	const itemDescription = document.querySelector('#description-field').value;
	const itemPrice = Number(document.querySelector('#price-field').value);
	const itemImage = document.querySelector('#image-field').value;
	const itemCountry = document.querySelector('#country-field').value;
	const itemYear = Number(document.querySelector('#year-field').value);
	const itemType = document.querySelector('#type-field').value;
	const itemLabel = document.querySelector('#label-field').checked;

	if (
		itemName &&
		typeof itemPrice === 'number' &&
		typeof itemYear === 'number' &&
		itemYear > 1700 &&
		itemYear < new Date().getFullYear() &&
		itemPrice > 0
	) {
		const itemPayload = {
			name: itemName,
			description: itemDescription,
			price: itemPrice,
			image: itemImage,
			country: itemCountry,
			year: itemYear,
			type: itemType,
			hasLabel: itemLabel,
		};

		console.log('Item created:');
		console.table(itemPayload);

		window.location.replace('/Frontend/personal-collections.html');
	} else {
		console.log('Invalid item data');
	}
}
