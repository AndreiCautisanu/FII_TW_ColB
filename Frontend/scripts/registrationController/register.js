const API_URL_REGISTER = 'http://localhost:8000/register';

const register = async () => {
	const username = document.querySelector('#username-field').value;
	const password = document.querySelector('#password-field').value;

	if (username && password) {
		fetch(API_URL_REGISTER, {
			method: 'POST',
			body: JSON.stringify({
				username,
				password,
			}),
		})
			.then(function (response) {
				if (response.ok) {
					return response.json();
				}
				return Promise.reject(response);
			})
			.then(function (data) {
				console.log('Registration successful');

				// redirect to login
				window.location.replace('/Frontend/login.html');
			})
			.catch(function (error) {
				console.log('Registration error', error);
			});

		// clean fields
		document.querySelector('#username-field').value = '';
		document.querySelector('#password-field').value = '';
	}
};
