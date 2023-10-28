import { isLocal, isMobile } from './services';
import SmoothScrollMagic from './smoothScroll';
import './animationContainer';
import './progressScrollAndToTopBtn';
import './accordion';
import './customSelect';
import './magnific';
import './audio';
import './slider';
import {initMap} from './map';
// import './testChars';
import './categories';

const mapSimple = document.getElementById('mapSimple');
const mapFilter = document.getElementById('mapFilter');
if(mapSimple || mapFilter){
	document.addEventListener('DOMContentLoaded', initMap);
}

let smoothScrollAllPage = new SmoothScrollMagic;
smoothScrollAllPage.init();

let isTouch = false;
if ('ontouchstart' in document.documentElement) {
    isTouch = true;
}
document.body.className += isTouch ? ' touch' : ' no-touch';


const headerMenu = document.querySelector('.header__nav');
const isMobileMenu = window.matchMedia('(max-width: 1023px)').matches;
const checkIfHoverOnElemOrChildren = (parent) => {
	return new Promise((resolve, reject) => {
	  const onMouseMove = (e) => {
		const elem = document.elementFromPoint(e.clientX, e.clientY);
		if (elem) {
		  if (parent.contains(elem)) {
			document.removeEventListener('mousemove', onMouseMove);
			resolve(true); // Курсор находится над элементом или его потомком
		  } else {
			resolve(false); // Курсор находится над другим элементом
		  }
		}
	  };

	  document.addEventListener('mousemove', onMouseMove);
	});
  };

if(!!headerMenu){
	[...headerMenu.querySelectorAll('.menu-item-has-children')].forEach(elem => {
		if(isMobileMenu || isTouch){
			elem.addEventListener('click', (e)=>{
				elem.classList.toggle('is-open');
			})
		} else {
			elem.addEventListener('mouseenter', (e)=>{
				elem.classList.add('is-open');
			})
			elem.addEventListener('mouseleave', (e)=>{
				console.log('mouseleave');
				setTimeout(() => {
					checkIfHoverOnElemOrChildren(elem)
					.then((isHoveredOnElementOrChildren) => {
						if (!isHoveredOnElementOrChildren) {
							elem.classList.remove('is-open');
						}
					})
					  .catch((error) => {
						console.error('Произошла ошибка:', error);
					});
					// if(!checkIfHoverOnElemOrChildren(e)){
					// }
				}, 500);
			})
		}
	})
	document.addEventListener('click', (e)=>{
		const isOpened = headerMenu.querySelector('.menu-item-has-children.is-open');
		if(isOpened && !isOpened.contains(e.target)){
			isOpened.classList.remove('is-open');
		}
	})
}

(function () {
    let trigger = document.querySelector('.js-menu-trigger');
    if (trigger) {
        trigger.onclick = () => {
            document.body.classList.toggle('menu-open');
        };
    }
})();

jQuery(function ($) {
    $('.js-tooltipster').tooltipster({
        interactive: true,
        theme: 'tooltipster-shadow2',
        animation: 'drop',
        position: 'bottom',
        arrow: false,
        trigger: (!isMobile()) ? 'hover' : 'click',
        // maxWidth: 300
    });
    $('.js-tooltipster-min').tooltipster({
        interactive: true,
        theme: 'tooltipster-shadow2 tooltipster-shadow2_min',
        animation: 'drop',
        position: 'bottom',
        arrow: false,
        trigger: (!isMobile()) ? 'hover' : 'click',
        // maxWidth: 250
    });
});

// console.log('Hello World from Webpack Starter Project!');

// async function fetchData() {
//     try {
//       // Simulate an asynchronous operation (e.g., fetching data from an API)
//       const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
//       const data = await response.json();

//       // Log the fetched data
//       console.log(data);

//       return data; // Return the fetched data
//     } catch (error) {
//       console.error('An error occurred:', error);
//       throw error;
//     }
// }

// fetchData()
//   .then((data) => {
//     console.log('Async operation completed successfully.');
//   })
//   .catch((error) => {
//     console.error('Async operation failed:', error);
//   });



//   if(isLocal) {
//     console.log('We are in development mode!');
//   } else {
//     console.log('We are in production mode!');
//   }
