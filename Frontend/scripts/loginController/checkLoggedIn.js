// check if the used is logged in in order to grant access to the page
// check JWT in LS

function checkLoggedIn() {
	if (!localStorage.getItem('jwt')) {
		console.log('Not logged in, redirecting');
		window.location.replace('/Frontend/login.html');
	}
	try {
		const decodedToken = atob(localStorage.getItem('jwt').split('.')[1]);
	} catch (e) {
		// if the token cannot be decoded, it means it's not valid
		window.location.replace('/Frontend/login.html'); // redirect to Login if the token is not valid
	}
}

checkLoggedIn(); // function will be executed before the loading of the page
