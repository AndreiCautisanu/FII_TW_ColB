// util file to only enable the submit button on the login & signup screens only if all the fields are filled
const submitButton = document.querySelector('.submit-btn');
const usernameField = document.querySelector('#username-field');
const passwordField = document.querySelector('#password-field');
let currentUsername, currentPassword;

usernameField.addEventListener('change', function (e) {
	currentUsername = e.target.value;

	if (currentUsername && currentPassword) {
		submitButton.disabled = false;
	} else {
		submitButton.disabled = true;
	}
});

passwordField.addEventListener('change', function (e) {
	currentPassword = e.target.value;

	if (currentUsername && currentPassword) {
		submitButton.disabled = false;
	} else {
		submitButton.disabled = true;
	}
});
