const registrationQuery = `
mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
        success
        error
    }
}
`;

async function register() {
	const username = document.querySelector('#username-field').value;
	const password = document.querySelector('#password-field').value;

	if (username && password) {
		try {
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
