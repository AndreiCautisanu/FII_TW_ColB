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

let currentContainers;

async function getContainers(
	collectionId = null,
	limit = null,
	owner = null,
	wrapperClass = '.all-collections-container',
	wrapperElement = 'a',
	setSelected = false
) {
	const res = await fetch(API, {
		method: 'POST',
		body: JSON.stringify({
			query: containersQuery,
			variables: { collectionId },
		}),
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			'Content-Type': 'application/json',
		},
	});

	const items = await res.json();

	const collectionsContainer = document.querySelector(wrapperClass);

	let userContainers = items.data.containers;

	if (owner) {
		userContainers = userContainers.filter(
			(container) => container.owner === owner
		);
	}

	if (limit) {
		userContainers = userContainers.slice(0, limit);
	}

	currentContainers = userContainers;

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
        <div class="card-gradient ${
					setSelected ? 'selected-card' : ''
				}" data-testid=${container.id}></div>
        <label class="card-label">${container.name}</label>
    </div>`;
		collectionsContainer.prepend(collectionCard);
	});
}
