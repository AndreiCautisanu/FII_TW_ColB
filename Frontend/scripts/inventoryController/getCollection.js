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

let currentCollection;

async function getCollection(collectionId = null) {
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

	const collectionName = document.querySelector('.main-greeting');
	const collectionNameField = document.querySelector('.name-field');
	const collectionDescription = document.querySelector('.description-field');
	const collectionImageUrl = document.querySelector('.image-field');

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

getCollection(collectionIdParam).then((collection) => {
	currentCollection = collection;
});
