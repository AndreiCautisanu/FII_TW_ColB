const collectionQuery = `
query Collection($id: ID!) {
    collection(id: $id) { 
        id
        name
        description
        owner
        imageUrl
        containers {
            id
            type
            description
        }
    }
}
`;

// global variable to store current collection data (to not make the same request twice on a page)
let currentCollection;

// get collection with id @collectionId
async function getCollection(collectionId = null) {
	// retrieve collection with id @collectionId
	const res = await fetch(API, {
		method: 'POST',
		body: JSON.stringify({
			query: collectionQuery,
			variables: { id: collectionIdParam },
		}),
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			'Content-Type': 'application/json',
		},
	});

	const collection = await res.json();

	// select html elements to display collection info
	const collectionName = document.querySelector('.main-greeting');
	const collectionNameField = document.querySelector('.name-field');
	const collectionDescription = document.querySelector('.description-field');
	const collectionImageUrl = document.querySelector('.image-field');

	// display collection info
	const collectionData = collection.data.collection;
	collectionName.innerHTML = collectionData.name;
	collectionDescription.innerHTML = collectionData.description;
	if (collectionImageUrl) {
		collectionImageUrl.value = collectionData.imageUrl;
	}
	if (collectionNameField) {
		collectionNameField.value = collectionData.name;
	}

	return collectionData;
}

// save current collection to global variable
// getCollection(collectionIdParam).then((collection) => {
// 	currentCollection = collection;
// });
