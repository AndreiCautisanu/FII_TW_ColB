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

// retrieve all collections from the server
async function getCollections(
	owner = null,
	limit = null,
	wrapperClass = '.all-collections-container'
) {
	// send request to server to get all collections
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

	// select collections container html element to append the retrieved collections
	const collectionsContainer = document.querySelector(wrapperClass);

	let userCollections = collections.data.collections;

	// if owner is set, filter collections by owner
	if (owner) {
		userCollections = userCollections.filter(
			(collection) => collection.owner === owner
		);
	}

	// if limit is set, limit the number of collections to display
	if (limit) {
		userCollections = userCollections.slice(0, limit);
	}

	// loop through all collections and create a card for each collection
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

	// if no collections are found, display a message
	if (userCollections.length === 0) {
		const noCollections = document.createElement('div');
		noCollections.classList.add('no-elements');
		noCollections.innerHTML = `<div class="no-elements-text" style="margin-bottom: 16px"> No collections added </div>`;
		collectionsContainer.prepend(noCollections);
	}
}
