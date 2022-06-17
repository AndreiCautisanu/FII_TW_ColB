async function importCollection() {
	const file = document.querySelector('#file-field').files[0];
	const fileJson = JSON.parse(await file.text());
	console.log(fileJson);

	const collectionPayload = {
		...fileJson,
		owner: JSON.parse(localStorage.getItem('userData')).username,
		containers: fileJson.containers.map((container) => container.id),
	};

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
	window.location.replace(
		`/Frontend/collections.html?id=${createdCollection.data.addCollection.id}`
	);
}
