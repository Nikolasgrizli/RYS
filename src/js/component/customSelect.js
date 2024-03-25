import NiceSelect from "../lib/nice-select2";

class CustomSelect {
	#options = {};
	#instance = null;
	#parent = null;
	#clearBtn = null;
	constructor(selector) {
		this.selector = selector;
		this.setOptions();
		this.init();
	}
	setOptions() {
		const options = JSON.parse(this.selector.dataset.options);
		this.#options = options;
	}
	setFeaturePlaceholder() {
		if (this.#options.placeholder && this.#options.placeholder.length) {
			this.#instance.dropdown.classList.add("custom-select_placeholder");
			this.#instance.dropdown.classList.add("custom-select_hide-first");
			this.#instance.el.addEventListener("change", (e) => {
				if (e.target.value.length) {
					this.#instance.dropdown.classList.remove(
						"custom-select_placeholder"
					);
				} else {
					this.#instance.dropdown.classList.add(
						"custom-select_placeholder"
					);
				}
			});
		}
	}
	setButtonToClear() {
		if (!!this.#parent) {
			const clearBtn = document.createElement("button");
			clearBtn.classList.add("custom-select_clear");
			clearBtn.classList.add("js-custom-select-clear");
			clearBtn.type = "button";
			clearBtn.innerHTML =
				'<svg class="icon icon-close"><use xlink:href="#close"></use></svg>';
			this.#parent.appendChild(clearBtn);
			this.#clearBtn = clearBtn;

			this.#clearBtn.addEventListener("click", () => {
				this.#instance.clear();
				this.#instance.dropdown.classList.add(
					"custom-select_placeholder"
				);
				if (
					this.#options.placeholder &&
					this.#options.placeholder.length
				) {
					this.#instance.dropdown.classList.add(
						"custom-select_hide-first"
					);
				}
			});
		}
	}
	setHelpers() {
		this.setFeaturePlaceholder();
		this.setButtonToClear();
	}

	init() {
		const elSel = new NiceSelect(this.selector, {
			searchable: this.#options.searchable,
			placeholder: this.#options.placeholder,
			multiple: this.#options.multiple,
			withBtn: this.#options.withButtons,
			showSelectedItems: true,
		});
		this.#instance = elSel;
		this.#parent = this.selector.closest(".customSelect");
		this.setHelpers();
	}
	clear() {
		this.#instance.clear();
		this.setHelpers();
	}
	update() {
		this.#instance.update();
		this.setHelpers();
	}
}

class CustomSelectManager {
	constructor() {
		this.selectInstances = new Map();
	}

	initializeCustomSelects() {
		const nSel = document.querySelectorAll(".js-custom-select");
		if (nSel.length) {
			nSel.forEach((elem) => {
				const customSelect = new CustomSelect(elem);
				this.selectInstances.set(elem.id, customSelect);
			});
		}
	}
	clearCustomSelectById(id) {
		const elSel = this.selectInstances.get(id);
		if (elSel) {
			elSel.clear();
		}
	}

	reinitializeCustomSelectById(id) {
		const elSel = this.selectInstances.get(id);
		if (elSel) {
			elSel.update();
		}
	}

	clearAllCustomSelects() {
		this.selectInstances.forEach((elSel) => {
			elSel.clear();
		});
	}
}

const customSelectManager = new CustomSelectManager();
window.customSelectManager = customSelectManager;
document.addEventListener("DOMContentLoaded", () => {
	customSelectManager.initializeCustomSelects();
});

const pseudoSelect = document.querySelector(".js-range-select");
if (!!pseudoSelect) {
	pseudoSelect.addEventListener(
		"click",
		function (e) {
			pseudoSelect.classList.add("open");
		},
		false
	);
	const closePseudoSelect = function () {
		pseudoSelect.classList.remove("open");
	};
	document.addEventListener("click", function (e) {
		if (!pseudoSelect.contains(e.target)) {
			closePseudoSelect();
		}
	});

	// const close = pseudoSelect.querySelector('.js-btn-apply');
	// if(!!close){
	// 	// console.log(close);
	// 	close.addEventListener('click', ()=>{
	// 		setTimeout(()=>{
	// 			closePseudoSelect();
	// 		}, 10);
	// 	});
	// }
}

// test
// $(document).ready(function () {
// 	$("#testB").on("click", function () {
// 		customSelectManager.clearCustomSelectById("test");
// 		$("#test").html(
// 			`<option value="">Обрати Локацію</option>
// 			<optgroup label="Полтавська область">
// 			  <option class="custom-select_children" value="77" >м. Балаклія, Балаклійський район</option>
// 			  <option class="custom-select_children" value="52" >м. Ізюм, Ізюмський район</option>
// 			  <option class="custom-select_children" value="108" >Новий Бурлук, Чугуївський район</option>
// 			  <option class="custom-select_children" value="114" >с. Абазівка, Зачепилівський район</option>
// 			  <option class="custom-select_children" value="39" >с. Артемівка, Чугуївський район</option>
// 			  <option class="custom-select_children" value="54" >с. Багата Чернещина, Сахновщинський район</option>
// 			  <option class="custom-select_children" value="120" >с. Балтазарівка, Чаплинський район</option>
// 			  <option class="custom-select_children" value="49" >с. Басове, Золочівський район</option>
// 			</optgroup>
// 			<optgroup label="Миргородьский район">
// 			  <option class="custom-select_children" value="5">с. Березівка, Борисівський район</option>
// 			  <option class="custom-select_children" value="42">с. Берестовенька, Красноградський район</option>
// 			  <option class="custom-select_children" value="73">с. Будне, Охтирський район</option>
// 			  <option class="custom-select_children" value="101">с. Бузове (Перша Бузова), Вовчанський район</option>
// 			  <option class="custom-select_children" value="22">с. Вʼязова, Краснокутський район</option>
// 			  <option class="custom-select_children" value="90">с. Варварівка, Бєлгородський район</option>
// 			</optgroup>
// 			<optgroup label="Новосанжирський район">
// 			  <option class="custom-select_children" value="5">с. Березівка, Борисівський район</option>
// 			  <option class="custom-select_children" value="42">с. Берестовенька, Красноградський район</option>
// 			  <option class="custom-select_children" value="73">с. Будне, Охтирський район</option>
// 			  <option class="custom-select_children" value="101">с. Бузове (Перша Бузова), Вовчанський район</option>
// 			  <option class="custom-select_children" value="22">с. Вʼязова, Краснокутський район</option>
// 			  <option class="custom-select_children" value="90">с. Варварівка, Бєлгородський район</option>
// 			</optgroup>
// 			<option value="60">с. Велика Гомільша, Зміївський район</option>
// 			<option value="43">с. Вишневе, Валківський район</option>`
// 		);
// 		customSelectManager.reinitializeCustomSelectById("test");
// 	});
// });
