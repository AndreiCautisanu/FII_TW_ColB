const submitButton = document.querySelector('.submit-btn');
const nameField = document.querySelector('#name-field');
const descriptionField = document.querySelector('#description-field');
const imageField = document.querySelector('#image-field');

const currentData = {
	name: '',
	description: '',
	image: '',
};

const formFields = [nameField, descriptionField, imageField];

function validateForm() {
	formFields.forEach((field) =>
		field.addEventListener('change', function (e) {
			currentData[e.target.name] = e.target.value;

			if (Object.values(currentData).every((value) => value)) {
				submitButton.disabled = false;
			} else {
				submitButton.disabled = true;
			}
		})
	);
}

const collectionCreationQuery = `
mutation AddCollection($input: CollectionInput!) {
    addCollection(input: $input) {
        id
        name
        description
        imageUrl
        owner
        containers {
            id
            name
            description
        }
    }
}
`;

/*
	set card styling based on whether or not it is selected
*/
function setSelectable() {
	const itemCards = document.querySelectorAll('.collection-card');

	itemCards.forEach((card) => {
		card.addEventListener('click', function (e) {
			const gradientOverlay = card.querySelector('.card-gradient');
			if (!gradientOverlay.classList.contains('selected-card')) {
				gradientOverlay.classList.add('selected-card');
			} else {
				gradientOverlay.classList.remove('selected-card');
			}
		});
	});
}

/*
	create a new collection
*/
async function createCollection() {
	// get the values from the form
	const collectionName = document.querySelector('#name-field').value;
	const collectionDescription =
		document.querySelector('#description-field').value;
	const collectionImage = document.querySelector('#image-field').value;
	const selectedContainers = document.querySelectorAll('.selected-card');

	const selectedIds = [];
	// get the ids of the selected cards
	for (cardElem of selectedContainers) {
		selectedIds.push(cardElem.getAttribute('data-testid'));
	}

	console.log(selectedIds);

	// create the payload
	const collectionPayload = {
		name: collectionName,
		description: collectionDescription,
		imageUrl: collectionImage,
		owner: JSON.parse(localStorage.getItem('userData')).username,
		containers: selectedIds,
	};

	// send the payload to the server
	const res = await fetch(API, {
		method: 'POST',
		body: JSON.stringify({
			query: collectionCreationQuery,
			variables: { input: collectionPayload },
		}),
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			'Content-Type': 'application/json',
		},
	});

	const createdCollection = await res.json();

	console.log(createdCollection);

	// redirect to the new collection
	window.location.replace(
		`/Frontend/collections.html?id=${createdCollection.data.addCollection.id}`
	);
}
