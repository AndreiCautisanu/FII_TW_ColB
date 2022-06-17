const containerQuery = `
mutation AddContainer($input: ContainerInput!) {
    addContainer(input: $input) {
        id
        name
        description
        price
        imageUrl
        country
        year
        type
        hasLabel
    }
}
`;

async function createContainer() {
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
			imageUrl: itemImage,
			country: itemCountry,
			year: itemYear,
			type: itemType,
			hasLabel: itemLabel,
			owner: JSON.parse(localStorage.getItem('userData')).username,
		};

		const res = await fetch(API, {
			method: 'POST',
			body: JSON.stringify({
				query: containerQuery,
				variables: { input: itemPayload },
			}),
			headers: {
				Authorization: `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json',
			},
		});

		const createdContainer = await res.json();

		console.log(createdContainer);

		window.location.replace('/Frontend/personal-containers.html');
	} else {
		console.log('Invalid item data');
	}
}
