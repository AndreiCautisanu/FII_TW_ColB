// function executed on submit button click
// send request to API to authenticate user
// receive JWT in response
// decode JWT to get user data

const loginQuery = `
mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
        success
        token
        error
    }
}
`;

async function login() {
	// retrieve credentials from input field
	const username = document.querySelector('#username-field').value;
	const password = document.querySelector('#password-field').value;
	let res;

	if (username && password) {
		try {
			res = await fetch(API, {
				method: 'POST',
				body: JSON.stringify({
					query: loginQuery,
					variables: { input: { username, password } },
				}),
			});
		} catch (error) {
			console.log('Authentication failed', error);
		}

		if (res) {
			const responseData = await res.json();
			const token = responseData.data.signIn.token;
			try {
				const decodedToken = atob(token.split('.')[1]); // decode token to get user data
				localStorage.setItem('userData', decodedToken); // set data to LS to access later
			} catch (error) {
				console.log('Error decoding JWT', error);
				return;
			}

			// save JWT to LS
			localStorage.setItem('jwt', token);

			console.log('Authentication successful');
			// redirect to index
			window.location.replace('/Frontend/index.html');

			// clean input fields
			document.querySelector('#username-field').value = '';
			document.querySelector('#password-field').value = '';
		}
	}
}
