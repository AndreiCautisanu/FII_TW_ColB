// function executed on submit button click
// send request to API to authenticate user
// receive JWT in response

const API_URL = 'http://localhost:8000/login';

const login = async () => {
	// retrieve credentials from input field
	const username = document.querySelector('#username-field').value;
	const password = document.querySelector('#password-field').value;

	if (username && password) {
		fetch(API_URL, {
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
				return Promise.reject(response); // if status code is not ok, reject the promise
			})
			.then(function (data) {
				// save JWT to LS
				localStorage.setItem('jwt', data['JWT']);

				try {
					const decodedToken = atob(data['JWT'].split('.')[1]); // decode token to get user data
					localStorage.setItem('userData', decodedToken); // set data to LS to access later
				} catch (e) {
					console.log('Error decoding JWT', e);
					return;
				}

				console.log('Authentication successful');
				// redirect to index
				window.location.replace('/index.html');
			})
			.catch(function (error) {
				console.log('Authentication error', error);
			});

		// clean input fields
		document.querySelector('#username-field').value = '';
		document.querySelector('#password-field').value = '';
	}
};
