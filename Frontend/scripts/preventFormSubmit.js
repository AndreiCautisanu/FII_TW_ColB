document.querySelectorAll('form').forEach((f) =>
	addEventListener(
		'submit',
		function (event) {
			event.preventDefault();
		},
		false
	)
);
