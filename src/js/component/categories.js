const categoriesWrapper = document.getElementById("categoriesWrapper");

if (categoriesWrapper) {
	const categories = categoriesWrapper.querySelectorAll(".js-category"),
		modalFilterBtn = document.querySelector(".js-modal-filter"),
		rubricator = document.querySelector(".rubricator"),
		isMobile = window.matchMedia("(max-width: 767px)").matches,
		btnBack = document.querySelector(".js-rubricator-back"),
		mainTitle = document.querySelector(".js-rubricator-title .r-title__child"),
		btnReset = document.querySelector(".js-rubricator-reset"),
		btnApply = document.querySelector(".js-rubricator-apply");


	let currentCategory = null;

	categories.forEach((category) => {
		const categoryBtn = category.querySelector(".rubricator__btn"),
			categoryWrapper = category.closest(".rubricator__item"),
			categoryTitle = category.querySelector(".rubricator__title");

		if (!categoryBtn) return;
		categoryBtn.addEventListener("click", () => {
			if (isMobile) {
				categoryWrapper.classList.add("is-open");
				mainTitle.innerHTML = categoryTitle.innerHTML;
				btnBack.classList.add("open-child");
				currentCategory = categoryWrapper;
			} else {
				categoryWrapper.classList.toggle("is-open");
			}
		});
	});


	modalFilterBtn.addEventListener("click", (e) => {
		e.preventDefault();
		rubricator.classList.add("rubricator-open");
		document.body.classList.add("modal-open");
	});

	btnBack.addEventListener("click", (e) => {
		e.preventDefault();
		if (btnBack.classList.contains("open-child")) {
			console.log(currentCategory);

			if (currentCategory) {
				currentCategory.classList.remove("is-open");
				const parentCategory = currentCategory.closest(".rubricator__item.is-open");
				if (parentCategory) {
					currentCategory = parentCategory;
					mainTitle.innerHTML = parentCategory.querySelector(".rubricator__title").innerHTML;
				} else {
					currentCategory = null;
				}

				if (!currentCategory) {
					btnBack.classList.remove("open-child");
				}
			}
		} else {
			rubricator.classList.remove("rubricator-open");
			document.body.classList.remove("modal-open");
		}
	});

	btnReset.addEventListener("click", (e) => {
		e.preventDefault();
		console.log("reset");
	});
	btnApply.addEventListener("click", (e) => {
		e.preventDefault();
		console.log("apply");
	});
}
