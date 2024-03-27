class Rubricator {
	constructor(wrapper) {
		this.categoriesWrapper = wrapper;
		this.categories =
			this.categoriesWrapper.querySelectorAll(".js-category");
		this.modalFilterBtn = document.querySelector(".js-modal-filter");
		this.rubricator = document.querySelector(".rubricator");
		this.isMobile = window.matchMedia("(max-width: 767px)").matches;
		this.btnBack = document.querySelector(".js-rubricator-back");
		this.mainTitle = document.querySelector(
			".js-rubricator-title .r-title__child"
		);
		this.btnReset = document.querySelector(".js-rubricator-reset");
		this.btnApply = document.querySelector(".js-rubricator-apply");
		this.currentCategory = null;
		this.handleCategoryClick = this.handleCategoryClick.bind(this);
		this.handleModalFilterClick = this.handleModalFilterClick.bind(this);
		this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
		this.handleResetButtonClick = this.handleResetButtonClick.bind(this);
		this.handleApplyButtonClick = this.handleApplyButtonClick.bind(this);
		this.init();
	}

	init() {
		if (this.categoriesWrapper) {
			this.categories.forEach((category) => {
				const categoryBtn = category.querySelector(".rubricator__btn"),
					categoryWrapper = category.closest(".rubricator__item"),
					categoryTitle =
						category.querySelector(".rubricator__title");

				if (!categoryBtn) return;
				categoryBtn.addEventListener("click", this.handleCategoryClick);
			});

			this.modalFilterBtn.addEventListener(
				"click",
				this.handleModalFilterClick
			);
			this.btnBack.addEventListener("click", this.handleBackButtonClick);
			this.btnReset.addEventListener(
				"click",
				this.handleResetButtonClick
			);
			this.btnApply.addEventListener(
				"click",
				this.handleApplyButtonClick
			);
		}
	}

	destroy() {
		this.categories.forEach((category) => {
			const categoryBtn = category.querySelector(".rubricator__btn");
			if (categoryBtn)
				categoryBtn.removeEventListener(
					"click",
					this.handleCategoryClick
				);
		});
		this.modalFilterBtn.removeEventListener(
			"click",
			this.handleModalFilterClick
		);
		this.btnBack.removeEventListener("click", this.handleBackButtonClick);
		this.btnReset.removeEventListener("click", this.handleResetButtonClick);
		this.btnApply.removeEventListener("click", this.handleApplyButtonClick);
	}

	handleCategoryClick() {
		const categoryBtn = event.currentTarget,
			categoryWrapper = categoryBtn.closest(".rubricator__item"),
			categoryTitle = categoryWrapper.querySelector(".rubricator__title");

		if (this.isMobile) {
			categoryWrapper.classList.add("is-open");
			this.mainTitle.innerHTML = categoryTitle.innerHTML;
			this.btnBack.classList.add("open-child");
			this.currentCategory = categoryWrapper;
		} else {
			categoryWrapper.classList.toggle("is-open");
		}
	}

	handleModalFilterClick(event) {
		event.preventDefault();
		this.rubricator.classList.add("rubricator-open");
		document.body.classList.add("modal-open");
	}

	handleBackButtonClick(event) {
		event.preventDefault();
		if (this.btnBack.classList.contains("open-child")) {
			if (this.currentCategory) {
				this.currentCategory.classList.remove("is-open");
				const parentCategory = this.currentCategory.closest(
					".rubricator__item.is-open"
				);
				if (parentCategory) {
					this.currentCategory = parentCategory;
					this.mainTitle.innerHTML =
						parentCategory.querySelector(
							".rubricator__title"
						).innerHTML;
				} else {
					this.currentCategory = null;
				}

				if (!this.currentCategory) {
					this.btnBack.classList.remove("open-child");
				}
			}
		} else {
			this.rubricator.classList.remove("rubricator-open");
			document.body.classList.remove("modal-open");
		}
	}

	handleResetButtonClick(event) {
		event.preventDefault();
		console.log("reset");
	}

	handleApplyButtonClick(event) {
		event.preventDefault();
		console.log("apply");
	}
}

const rubricatorWrapper = document.getElementById("categoriesWrapper");
if (rubricatorWrapper) {
	window.rubricator = new Rubricator(rubricatorWrapper);
}
