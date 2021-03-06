const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" in e.g. "https://example.com/?some_key=some_value"
const collectionIdParam = params.id; // "some_value"
