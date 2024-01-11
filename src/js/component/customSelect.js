// import NiceSelect from "nice-select2";
// import NiceSelect from "nice-select2/dist/js/nice-select2";
import NiceSelect from "../lib/nice-select2";


const nSel = document.querySelectorAll('.js-custom-select');
if(nSel.length){
	nSel.forEach(elem => {
		const options = JSON.parse(elem.dataset.options);
		const elSel = new NiceSelect(elem, {
			searchable: options.searchable,
			placeholder: options.placeholder,
			multiple: options.multiple,
			withBtn: options.withButtons,
			showSelectedItems: true
		});

		//TODO default selected

		if(options.placeholder && options.placeholder.length){
			elSel.dropdown.classList.add('custom-select_placeholder');
			elSel.dropdown.classList.add('custom-select_hide-first');
			elSel.el.addEventListener('change', function (e) {
				if(e.target.value.length){
					elSel.dropdown.classList.remove('custom-select_placeholder');
				} else {
					elSel.dropdown.classList.add('custom-select_placeholder');
				}
            })
		}
		elSel.el.addEventListener('modalClosed', function (e) {
			console.log('modalClosed');
		});


		const parent = elem.closest('.customSelect');
		if(!!parent){
			// console.log(parent);
			// niceSelectInstance.clear();

			const clearBtn = document.createElement('button');
			clearBtn.classList.add('custom-select_clear');
			clearBtn.classList.add('js-custom-select-clear');
			clearBtn.type = 'button';
			clearBtn.innerHTML = '<svg class="icon icon-close"><use xlink:href="#close"></use></svg>';
			parent.appendChild(clearBtn);

			clearBtn.addEventListener('click', function (e) {
				elSel.clear();
				elSel.dropdown.classList.add('custom-select_placeholder');
				if(options.placeholder && options.placeholder.length){
					elSel.dropdown.classList.add('custom-select_hide-first');
				}
			});
		}
	  });
}


const pseudoSelect = document.querySelector('.js-range-select');
if(!!pseudoSelect){
	pseudoSelect.addEventListener('click', function (e) {
		pseudoSelect.classList.add('open');
	}, false);
	const closePseudoSelect = function () {
		pseudoSelect.classList.remove('open');
	}
	document.addEventListener('click', function(e){
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
