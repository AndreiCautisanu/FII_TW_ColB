const deleteContainerQuery = `
mutation DeleteContainer($id: ID!) {
    deleteContainer(id: $id) {
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

async function deleteContainer(containerId) {
	const res = await fetch(API, {
		method: 'POST',
		body: JSON.stringify({
			query: deleteContainerQuery,
			variables: { id: containerId },
		}),
	});

	const deletedContainer = await res.json();

	console.log(deletedContainer);

	window.location.replace('/Frontend/personal-containers.html');
}
