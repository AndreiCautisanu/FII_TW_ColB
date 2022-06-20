const collectionUpdateQuery = `
mutation UpdateCollection($id: ID!, $input: CollectionInput!) {
    updateCollection(id: $id, input: $input) {
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

// update the collection with id @collectionId
async function updateCollection(collectionId) {
	// get the new values from th form
	const collectionName = document.querySelector('#name-field').value;
	const collectionDescription =
		document.querySelector('#description-field').value;
	const collectionImage = document.querySelector('#image-field').value;
	const selectedContainers = document.querySelectorAll('.selected-card');

	const selectedIds = [];
	// get the ids of the selected containers
	for (cardElem of selectedContainers) {
		selectedIds.push(cardElem.getAttribute('data-testid'));
	}

	console.log(selectedIds);

	// create the payload for the BE
	const collectionPayload = {
		name: collectionName,
		description: collectionDescription,
		imageUrl: collectionImage,
		containers: selectedIds,
		owner: JSON.parse(localStorage.getItem('userData')).username,
	};

	console.log(collectionPayload);

	// perform the update mutation
	const res = await fetch(API, {
		method: 'POST',
		body: JSON.stringify({
			query: collectionUpdateQuery,
			variables: { id: collectionId, input: collectionPayload },
		}),
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			'Content-Type': 'application/json',
		},
	});

	const updatedCollection = await res.json();

	console.log(updatedCollection);

	// redirect to the newly edited collection
	window.location.replace(`/Frontend/collections.html?id=${collectionId}`);
}
