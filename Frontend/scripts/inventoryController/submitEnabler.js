const submitButton = document.querySelector('.submit-btn');
const nameField = document.querySelector('#name-field');
const descriptionField = document.querySelector('#description-field');
const priceField = document.querySelector('#price-field');
const imageField = document.querySelector('#image-field');
const countryField = document.querySelector('#country-field');
const yearField = document.querySelector('#year-field');
const typeField = document.querySelector('#type-field');
const currentData = {
	name: '',
	description: '',
	price: '',
	image: '',
	country: 'Afghanistan',
	year: '',
	type: '',
};

const formFields = [
	nameField,
	descriptionField,
	priceField,
	imageField,
	countryField,
	yearField,
	typeField,
];

formFields.forEach((field) =>
	field.addEventListener('change', function (e) {
		currentData[e.target.name] = e.target.value;

		if (Object.values(currentData).every((value) => value)) {
			submitButton.disabled = false;
		} else {
			submitButton.disabled = true;
		}
	})
);
