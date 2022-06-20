// to logout, simply clear the LS and redirect to login
function logout() {
	localStorage.clear();
	window.location.replace('/Frontend/login.html');
}
logout();
