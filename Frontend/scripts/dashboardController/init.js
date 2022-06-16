const userData = JSON.parse(localStorage.getItem('userData'));
const userName = userData.username;

// get greeting depending on time of day
function getGreeting() {
	const currentTime = new Date().getHours();
	let greeting;

	if (currentTime < 12) {
		greeting = 'Good morning';
	} else if (currentTime < 18) {
		greeting = 'Good afternoon';
	} else {
		greeting = 'Good evening';
	}

	return greeting;
}

function getCollectionCard(collectionImage, collectionName) {
	const cardElement = document.createElement('div');

	return cardElement;
}

function setGreeting() {
	const greetingElem = document.querySelector('.main-greeting');
	greetingElem.innerHTML = `${getGreeting()}, ${userName}! 👋🏻`;
}

setGreeting();
