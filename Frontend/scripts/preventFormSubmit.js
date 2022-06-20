// util file to prevents default behaviour of the form submit event
document.querySelectorAll('form').forEach((f) =>
	addEventListener(
		'submit',
		function (event) {
			event.preventDefault();
		},
		false
	)
);
