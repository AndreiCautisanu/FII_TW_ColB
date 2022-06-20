const containersWithoutCollectionQuery = `
query {
    containersWithoutCollection { 
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

// get containers without collection
// parameters are used to make the function reusable
// this function is used to get all the available containers when creating a new collection
// plus to display the valid containers when editing an already existing one
async function getContainersWithoutCollection(
	limit = null,
	owner = null,
	wrapperClass = '.selectable-items-wrapper',
	wrapperElement = 'div'
) {
	// send the request to BE
	const res = await fetch(API, {
		method: 'POST',
		body: JSON.stringify({
			query: containersWithoutCollectionQuery,
		}),
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			'Content-Type': 'application/json',
		},
	});

	const items = await res.json();

	// select the html wrapper element to add the cards to
	const collectionsContainer = document.querySelector(wrapperClass);

	let userContainers = items.data.containersWithoutCollection;

	// limit the number of containers to display if necessary
	if (limit) {
		userContainers = userContainers.slice(0, limit);
	}

	// only select the personal containers is necessary
	if (owner) {
		userContainers = userContainers.filter(
			(collection) => collection.owner === owner
		);
	}

	// for each such card, append it to the wrapper
	userContainers.forEach((container) => {
		const collectionCard = document.createElement(wrapperElement);
		if (wrapperElement === 'a') {
			collectionCard.setAttribute(
				'href',
				`/Frontend/containers.html?id=${container.id}`
			);
		}

		collectionCard.innerHTML = `<div class="collection-card">
        <img
            src="${container.imageUrl}"
            alt=""
        />
        <div class="card-gradient" data-testid=${container.id}></div>
        <label class="card-label">${container.name}</label>
    </div>`;
		collectionsContainer.prepend(collectionCard);
	});
}
