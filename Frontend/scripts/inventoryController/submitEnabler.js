const submitButton = document.querySelector('.submit-btn');
const nameField = document.querySelector('#name-field');
let currentName;

nameField.addEventListener('change', function (e) {
	currentName = e.target.value;

	if (currentName) {
		submitButton.disabled = false;
	} else {
		submitButton.disabled = true;
	}
});
