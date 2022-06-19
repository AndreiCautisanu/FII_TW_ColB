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
        views
    }
}
`;

let currentContainers = [];

async function getPopularContainers(
	wrapperClass = '.all-collections-container',
	wrapperElement = 'a'
) {
	const res = await fetch(API, {
		method: 'POST',
		body: JSON.stringify({
			query: containersQuery,
		}),
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			'Content-Type': 'application/json',
		},
	});

	const items = await res.json();

	const collectionsContainer = document.querySelector(wrapperClass);

	let userContainers = items.data.containers;

	userContainers.sort((a, b) => b.views - a.views);

	userContainers = userContainers.slice(0, 10);

	console.log(userContainers);

	currentContainers = userContainers;

	userContainers.forEach((container) => {
		const collectionCardViewsWrap = document.createElement('div');
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
		collectionCardViewsWrap.appendChild(collectionCard);
		collectionsContainer.appendChild(collectionCardViewsWrap);

		const viewsTag = document.createElement('p');
		viewsTag.classList.add('views-tag');
		viewsTag.innerHTML = `${container.views} views`;
		collectionCardViewsWrap.appendChild(viewsTag);
	});
}

getPopularContainers();
