const collectionsQuery = `
query {
    collections { 
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

async function getCollections(
	owner = null,
	limit = null,
	wrapperClass = '.all-collections-container'
) {
	const res = await fetch(API, {
		method: 'POST',
		body: JSON.stringify({
			query: collectionsQuery,
		}),
	});

	const collections = await res.json();

	const collectionsContainer = document.querySelector(wrapperClass);

	let userCollections = collections.data.collections;

	if (limit) {
		userCollections = userCollections.slice(0, limit);
	}

	if (owner) {
		userCollections = userCollections.filter(
			(collection) => collection.owner === owner
		);
	}

	userCollections.forEach((collection) => {
		const collectionCard = document.createElement('a');
		collectionCard.setAttribute(
			'href',
			`/Frontend/collections.html?id=${collection.id}`
		);
		collectionCard.innerHTML = `<div class="collection-card">
        <img
            src="${collection.imageUrl}"
            alt=""
        />
        <div class="card-gradient"></div>
        <label class="card-label">${collection.name}</label>
    </div>`;
		collectionsContainer.prepend(collectionCard);
	});
}
