const containersQuery = `
query Query($collectionId: ID) {
    containers(collectionId: $collectionId) { 
        id 
        type
        name
        description
        imageUrl
        year
        price
        country
        hasLabel
        owner
    }
}
`;

async function getContainers(
	collectionId = null,
	limit = null,
	owner = null,
	wrapperClass = '.all-collections-container'
) {
	const res = await fetch(API, {
		method: 'POST',
		body: JSON.stringify({
			query: containersQuery,
			variables: { collectionId },
		}),
	});

	const items = await res.json();

	const collectionsContainer = document.querySelector(wrapperClass);

	let userContainers = items.data.containers;

	if (limit) {
		userContainers = userContainers.slice(0, limit);
	}

	if (owner) {
		userContainers = userContainers.filter(
			(collection) => collection.owner === owner
		);
	}

	userContainers.forEach((container) => {
		const collectionCard = document.createElement('a');
		collectionCard.setAttribute(
			'href',
			`/Frontend/containers.html?id=${container.id}`
		);
		collectionCard.innerHTML = `<div class="collection-card">
        <img
            src="${container.imageUrl}"
            alt=""
        />
        <div class="card-gradient"></div>
        <label class="card-label">${container.name}</label>
    </div>`;
		collectionsContainer.prepend(collectionCard);
	});
}
