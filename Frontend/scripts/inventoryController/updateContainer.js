const containerQuery = `
query Container($id: ID!) {
    container(id: $id) { 
        id 
        type
        name
        description
        imageUrl
        year
        price
        country
        hasLabel
    }
}
`;

const updateContainerQuery = `
mutation UpdateContainer($id: ID!, $input: ContainerInput!) {
    updateContainer(id: $id, input: $input) {
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

async function updateContainer(containerId) {
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
		itemYear <= new Date().getFullYear() &&
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
				query: updateContainerQuery,
				variables: { input: itemPayload, id: containerId },
			}),
			headers: {
				Authorization: `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json',
			},
		});

		const updatedContainer = await res.json();

		console.log(updatedContainer);

		window.location.replace(`/Frontend/containers.html?id=${containerId}`);
	} else {
		console.log('Invalid item data');
	}
}

async function initUpdateForm(containerId) {
	const res = await fetch(API, {
		method: 'POST',
		body: JSON.stringify({
			query: containerQuery,
			variables: { id: containerId },
		}),
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			'Content-Type': 'application/json',
		},
	});

	const container = await res.json();

	const containerData = container.data.container;
	document.querySelector('#name-field').value = containerData.name;
	document.querySelector('#description-field').value =
		containerData.description;
	document.querySelector('#price-field').value = Number(containerData.price);
	document.querySelector('#image-field').value = containerData.imageUrl;
	document.querySelector('#country-field').value = containerData.country;
	document.querySelector('#year-field').value = Number(containerData.year);
	document.querySelector('#type-field').value = String(
		containerData.type
	).toLowerCase();
	document.querySelector('#label-field').checked = containerData.hasLabel;
	document.querySelector('#no-label-field').checked = !containerData.hasLabel;
}

initUpdateForm(collectionIdParam);
