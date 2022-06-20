// function to import a collection from a valid json file
async function importCollection() {
	// get the user's uploaded file from the input
	const file = document.querySelector('#file-field').files[0];
	const fileJson = JSON.parse(await file.text());
	console.log(fileJson);

	// prepare the payload using the data from the json
	const collectionPayload = {
		...fileJson,
		owner: JSON.parse(localStorage.getItem('userData')).username,
		containers: fileJson.containers.map((container) => container.id),
	};

	// send the create request to the BE
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
	// redirect to the newly created collection
	window.location.replace(
		`/Frontend/collections.html?id=${createdCollection.data.addCollection.id}`
	);
}
