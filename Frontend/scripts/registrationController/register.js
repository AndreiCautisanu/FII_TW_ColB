const registrationQuery = `
mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
        success
        error
    }
}
`;

// function to register a new user
async function register() {
	// retrieve the username and password from the form
	const username = document.querySelector('#username-field').value;
	const password = document.querySelector('#password-field').value;

	if (username && password) {
		try {
			// perform the registration mutation
			const res = await fetch(API, {
				method: 'POST',
				body: JSON.stringify({
					query: registrationQuery,
					variables: { input: { username, password } },
				}),
			});
		} catch (error) {
			console.log('Registration failed', error);
		}

		// clean fields
		document.querySelector('#username-field').value = '';
		document.querySelector('#password-field').value = '';

		// redirect to login page
		window.location.replace('/Frontend/login.html');
	}
}
