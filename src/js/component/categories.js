const categoriesWrapper = document.getElementById("categoriesWrapper");

if (categoriesWrapper) {
	const 	categories = categoriesWrapper.querySelectorAll(".js-category");
	console.log(categories.length);
	categories.forEach((category) => {
		const 	categoryBtn = category.querySelector(".rubricator__btn"),
				categoryWrapper = category.closest(".rubricator__item");

		if(!categoryBtn) return;
		categoryBtn.addEventListener("click", () => {
			categoryWrapper.classList.toggle("is-open");
		});
	});

}
