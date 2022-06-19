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
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			'Content-Type': 'application/json',
		},
	});

	const collections = await res.json();

	const collectionsContainer = document.querySelector(wrapperClass);

	let userCollections = collections.data.collections;

	if (owner) {
		userCollections = userCollections.filter(
			(collection) => collection.owner === owner
		);
	}

	if (limit) {
		userCollections = userCollections.slice(0, limit);
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

	if (userCollections.length === 0) {
		const noCollections = document.createElement('div');
		noCollections.classList.add('no-elements');
		noCollections.innerHTML = `<div class="no-elements-text" style="margin-bottom: 16px"> No collections added </div>`;
		collectionsContainer.prepend(noCollections);
	}
}
