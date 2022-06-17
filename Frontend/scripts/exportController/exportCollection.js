function exportCollection() {
	downloadTextfile(
		`${currentCollection.name}.json`,
		JSON.stringify(currentCollection)
	);
}
