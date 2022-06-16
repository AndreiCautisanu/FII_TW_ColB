const containersQuery = `
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

async function getContainersWithoutCollection(
	limit = null,
	owner = null,
	wrapperClass = '.selectable-items-wrapper',
	wrapperElement = 'div'
) {
	const res = await fetch(API, {
		method: 'POST',
		body: JSON.stringify({
			query: containersQuery,
		}),
	});

	const items = await res.json();

	const collectionsContainer = document.querySelector(wrapperClass);

	let userContainers = items.data.containersWithoutCollection;

	if (limit) {
		userContainers = userContainers.slice(0, limit);
	}

	if (owner) {
		userContainers = userContainers.filter(
			(collection) => collection.owner === owner
		);
	}

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
