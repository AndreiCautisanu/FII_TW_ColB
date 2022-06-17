function exportCollection() {
	downloadTextfile(
		`${currentCollection.name}.json`,
		JSON.stringify({
			name: currentCollection.name,
			description: currentCollection.description,
			imageUrl: currentCollection.imageUrl,
			containers: currentCollection.containers,
		})
	);
}
