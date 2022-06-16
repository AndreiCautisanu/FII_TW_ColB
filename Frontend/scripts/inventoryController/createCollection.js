const itemCards = document.querySelectorAll('.collection-card');

itemCards.forEach((card) => {
	card.addEventListener('click', function (e) {
		const gradientOverlay = card.querySelector('.card-gradient');
		if (!gradientOverlay.classList.contains('selected-card')) {
			gradientOverlay.classList.add('selected-card');
		} else {
			gradientOverlay.classList.remove('selected-card');
		}
	});
});

function createCollection() {}
