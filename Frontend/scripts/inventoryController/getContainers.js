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

let currentContainers = [];

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

	if (collectionId) {
		addActionButtons(userContainers[0].owner, collectionId);
	}
}

function addActionButtons(containerOwner, containerId) {
	const actionButtons = document.querySelector('.control-buttons');
	if (
		containerOwner === JSON.parse(localStorage.getItem('userData')).username
	) {
		const editButton = document.createElement('button');
		editButton.classList.add('edit-container-button');
		editButton.setAttribute('type', 'submit');
		editButton.setAttribute(
			'onclick',
			`window.location.replace(/Frontend/edit-collection.html?id=${containerId})`
		);
		editButton.innerHTML = `<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M19.5361 7.33496L20.6211 6.27148C21.1689 5.72363 21.1904 5.13281 20.707 4.63867L20.3418 4.27344C19.8584 3.79004 19.2676 3.84375 18.7197 4.37012L17.6348 5.44434L19.5361 7.33496ZM6.87109 19.9678L18.5908 8.25879L16.7109 6.36816L4.98047 18.0879L3.95996 20.4727C3.86328 20.7305 4.13184 21.0312 4.38965 20.9238L6.87109 19.9678Z"
				fill="#E9F3FC"
			/>
		</svg>`;
		actionButtons.prepend(editButton);

		const deleteButton = document.createElement('button');
		deleteButton.classList.add('delete-container-button');
		deleteButton.setAttribute('type', 'submit');
		deleteButton.setAttribute('onclick', `deleteCollection(${containerId})`);
		deleteButton.innerHTML = `<svg
			width="24"
			height="25"
			viewBox="0 0 24 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M7.58008 24.2549H17.4307C18.9668 24.2549 19.998 23.2559 20.0732 21.7197L20.8145 6.10059H22.1035C22.5439 6.10059 22.8984 5.72461 22.8984 5.28418C22.8984 4.84375 22.5439 4.47852 22.1035 4.47852H17.1943V2.83496C17.1943 1.27734 16.1846 0.332031 14.5303 0.332031H10.4482C8.79395 0.332031 7.78418 1.27734 7.78418 2.83496V4.47852H2.90723C2.47754 4.47852 2.10156 4.84375 2.10156 5.28418C2.10156 5.73535 2.47754 6.10059 2.90723 6.10059H4.19629L4.9375 21.7305C5.0127 23.2666 6.02246 24.2549 7.58008 24.2549ZM9.49219 2.94238C9.49219 2.33008 9.92188 1.93262 10.5664 1.93262H14.4121C15.0566 1.93262 15.4863 2.33008 15.4863 2.94238V4.47852H9.49219V2.94238ZM7.73047 22.6328C7.11816 22.6328 6.65625 22.1709 6.62402 21.5371L5.87207 6.10059H19.085L18.376 21.5371C18.3545 22.1816 17.8926 22.6328 17.2588 22.6328H7.73047ZM9.32031 20.7959C9.72852 20.7959 9.99707 20.5381 9.98633 20.1621L9.65332 8.66797C9.64258 8.29199 9.37402 8.04492 8.9873 8.04492C8.5791 8.04492 8.31055 8.30273 8.32129 8.67871L8.64355 20.1621C8.6543 20.5488 8.92285 20.7959 9.32031 20.7959ZM12.5 20.7959C12.9082 20.7959 13.1982 20.5381 13.1982 20.1621V8.67871C13.1982 8.30273 12.9082 8.04492 12.5 8.04492C12.0918 8.04492 11.8125 8.30273 11.8125 8.67871V20.1621C11.8125 20.5381 12.0918 20.7959 12.5 20.7959ZM15.6904 20.7959C16.0771 20.7959 16.3457 20.5488 16.3564 20.1621L16.6787 8.67871C16.6895 8.30273 16.4209 8.04492 16.0127 8.04492C15.626 8.04492 15.3574 8.29199 15.3467 8.67871L15.0244 20.1621C15.0137 20.5381 15.2822 20.7959 15.6904 20.7959Z"
				fill="#E9F3FC"
			/>
		</svg>`;
		actionButtons.prepend(deleteButton);
	}
}
