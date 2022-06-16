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

async function getCollection(collectionId = null) {
	const res = await fetch(API, {
		method: 'POST',
		body: JSON.stringify({
			query: collectionQuery,
			variables: { id: collectionIdParam },
		}),
	});

	const collection = await res.json();

	const collectionName = document.querySelector('.main-greeting');
	const collectionDescription = document.querySelector(
		'.collection-description'
	);

	console.log(collection);
	const collectionData = collection.data.collection;
	collectionName.innerHTML = collectionData.name;
	collectionDescription.innerHTML = collectionData.description;
}

getCollection(collectionIdParam);
