const axios = require("axios");
const isLocal = (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "");


class ContactPage {
	constructor() {

	}
	innerFn() {
		const testForms = document.querySelectorAll(".form_js-validate");
		window.formComponent = {
			init: () => {
				testForms.forEach((form) => {

					const fields = form.querySelectorAll("[data-validate]");
					// console.log(fields)

					formComponent.validationOnSubmit(fields, form);
					formComponent.checkActive(fields, form);
					formComponent.validateOnEntry(fields, form);
				});
			},

			modelValidation: (validationFields, form) => {
				validationFields.forEach((field) => {
					formComponent.validateFields(field);
				});
				let checks = form.querySelector(".error:not(.hidden)");
				if (form.contains(checks)) {
					// here you can add some error msg or else ...
				} else {
					// console.log(form);
					formSending(form);
				}
			},

			validationOnSubmit: (validationFields, form) => {
				form.addEventListener("submit", (e) => {
					e.preventDefault();
					formComponent.modelValidation(validationFields, form);
				});
			},

			checkActive: (validationFields, form) => {
				validationFields.forEach((field) => {
					// console.log(field);
					field.onfocus = function () {
						field.closest('.form__field').classList.add('form__field_active');
						// console.log(this);
					}
					field.onblur = function () {
						if (field.value == '')
							field.closest('.form__field').classList.remove('form__field_active');
					}

				});
			},

			validateOnEntry: (validationFields, form) => {
				validationFields.forEach((field) => {
					field.addEventListener("input", (event) => {
						formComponent.validateFields(field);
					});
				});
			},

			validateFields: (input) => {
				const data = input.dataset.validate;

				if (~data.indexOf("no-empty")) {
					if (input.value.trim() === "") {
						formComponent.setStatus(input, "error");
					} else {
						formComponent.setStatus(input, "success");
					}
				}
				if (~data.indexOf("number")) {
					const numReg = /^\d+$/;
					if (numReg.test(input.value) && input.value.trim() !== "") {
						formComponent.setStatus(input, "success");
					} else {
						formComponent.setStatus(input, "error");
					}
				}
				if (~data.indexOf("email")) {
					const emailReg = /\S+@\S+\.\S+/;
					if (emailReg.test(input.value) && input.value.trim() !== "") {
						formComponent.setStatus(input, "success");
					} else {
						formComponent.setStatus(input, "error");
					}
				}

				if (~data.indexOf("select")) {
					if (input.value === "") {
						formComponent.setStatus(input, "error");
					} else {
						formComponent.setStatus(input, "success");
					}
				}
				if (~data.indexOf("outer")) {
					if (input.querySelector('.jdropdown-header').value === "") {
						formComponent.setStatus(input, "error");
					} else {
						formComponent.setStatus(input, "success");
					}
				}
				if (~data.indexOf("checkbox")) {
					// console.log(input.checked);
					if (input.checked) {
						formComponent.setStatus(input, "success");
					} else {
						formComponent.setStatus(input, "error");
					}
				}

				if (~data.indexOf("phone")) {
					const phoneReg =
						/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
					if (phoneReg.test(input.value) && input.value.trim() !== "") {
						formComponent.setStatus(input, "success");
					} else {
						formComponent.setStatus(input, "error");
					}
				}
			},

			// set/remove class final fx
			setStatus: (field, status) => {
				const errorMessage = field.parentElement.querySelector(".error");

				// console.log(errorMessage);
				if (status === "success") {
					field.classList.remove("input-error");
					errorMessage.classList.add("hidden");
				}
				if (status === "error") {
					field.classList.add("input-error");
					errorMessage.classList.remove("hidden");
				}
			},
		};

		formComponent.init();



		window.formSending = function (form) {
			let newFormData = new FormData(),
				action = form.action;

			let
				name = document.getElementById('name').value,
				email = document.getElementById('email').value,
				topic = document.getElementById('topic').value,
				message = document.getElementById('message').value;

			newFormData.set('name', name);
			newFormData.set('email', email);
			newFormData.set('topic', topic);
			newFormData.set('message', message);



			if (isLocal) {
				for (var pair of newFormData.entries()) {
					console.log(pair[0] + ', ' + pair[1]);
				}
				console.log(action)
			}


			form.closest('.form').classList.add('is-sending')
			axios({
					method: "post",
					url: action,
					data: newFormData,
					headers: {
						"Content-Type": "multipart/form-data"
					},
				})
				.then(function (response) {
					//handle success
					console.log(response);
					showInfo('infoSuccess');
					testForms.forEach((form) => {
						const fields = form.querySelectorAll("[data-validate]");
						fields.forEach((field) => {
							console.log(field);
							if (field.type !== 'checkbox') {
								field.value = '';
							}
						})
					})
					form.closest('.form').classList.remove('is-sending')
				})
				.catch(function (response) {
					//handle error
					console.log(response);

					showInfo('infoError');
				});

		}

		let isAnimating = false;
		window.showInfo = function (elem) {
			if (!isAnimating) {
				const target = document.getElementById(elem);
				if (!!target) {
					isAnimating = true;
					target.classList.add('start-animation');
					target.classList.remove('hidden');
					setTimeout(() => {
						target.classList.add('is-animating');
					}, 200);

					setTimeout(() => {
						target.classList.remove('is-animating');
						target.classList.remove('start-animation');
						setTimeout(() => {
							target.classList.add('hidden');
						}, 500);
						isAnimating = false;
					}, 5000);
				}

			}
		}
		window.closeInfo = function (elem) {
			const target = document.getElementById(elem);
			if (!!target) {
				target.classList.add('hidden');
			}

		}



		const closePopups = document.querySelectorAll('.info-tool .close');
		if (!!closePopups) {
			closePopups.forEach((close) => {
				close.addEventListener('click', function () {
					const tool = close.closest('.info-tool').id;
					closeInfo(tool);
				})
			})
		}


		window.setFormSizes = function () {
			const form = document.querySelector(".form_js-validate");
			if (!!form) {
				document.documentElement.style.setProperty(
					"--formWidth",
					form.offsetWidth + "px"
				);
				document.documentElement.style.setProperty(
					"--formOffset",
					form.offsetLeft + "px"
				);
			}
		}
		setFormSizes();
		window.addEventListener("optimizedResize", function () {
			setFormSizes();
		});
	}

}



let pagesWithForm = new ContactPage;
pagesWithForm.innerFn();
