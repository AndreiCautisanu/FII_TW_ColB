const deleteCollectionQuery = `
mutation DeleteCollection($id: ID!) {
    deleteCollection(id: $id) {
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

async function deleteCollection(collectionId) {
	const res = await fetch(API, {
		method: 'POST',
		body: JSON.stringify({
			query: deleteCollectionQuery,
			variables: { id: collectionId },
		}),
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			'Content-Type': 'application/json',
		},
	});

	const deletedCollection = await res.json();

	console.log(deletedCollection);

	window.location.replace('/Frontend/personal-collections.html');
}
