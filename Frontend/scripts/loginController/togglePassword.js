const passwordToggleOff = document.getElementById('password-invisible');
const passwordToggleOn = document.getElementById('password-visible');
const password = document.querySelector('#password-field');

passwordToggleOff.addEventListener('click', function (e) {
	console.log('toggle off');
	password.setAttribute('type', 'text');

	passwordToggleOff.style.display = 'none';
	passwordToggleOn.style.display = 'block';
});

passwordToggleOn.addEventListener('click', function (e) {
	console.log('toggle on');

	password.setAttribute('type', 'password');
	passwordToggleOn.style.display = 'none';
	passwordToggleOff.style.display = 'block';
});
