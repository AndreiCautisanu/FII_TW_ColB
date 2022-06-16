const containerQuery = `
query Container($id: ID!) {
    container(id: $id) { 
        id 
        type
        name
        description
        imageUrl
        year
        price
        country
        hasLabel
    }
}
`;

async function getContainer(containerId = null) {
	const res = await fetch(API, {
		method: 'POST',
		body: JSON.stringify({
			query: containerQuery,
			variables: { id: containerId },
		}),
	});

	const container = await res.json();

	const containerName = document.querySelector('.main-greeting');
	const containerDescription = document.querySelector('.container-description');
	const containerDetails = document.querySelector('.container-details');

	const containerData = container.data.container;
	containerName.innerHTML = containerData.name;
	containerDescription.innerHTML = containerData.description;

	containerDetails.innerHTML = `
        <img
            src="${containerData.imageUrl}"
            alt=""
            class="container-image"
        />
        <div class="container-details-container">
            <label>Name: ${containerData.name}</label>
            <label>Type: ${containerData.type}</label>
            <label>Year: ${containerData.year}</label>
            <label>Price: $${containerData.price}</label>
            <label>Country: ${containerData.country}</label>
            <label>Has label: ${containerData.hasLabel ? 'yes' : 'no'}</label>
       </div>
       `;
}

getContainer(collectionIdParam);
