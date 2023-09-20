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

if(!!headerMenu){

    // if(document.body.classList.contains('no-touch')){
        [...headerMenu.querySelectorAll('.menu-item-has-children')].forEach(elem => {
            // checkPopupRightPosition(elem.querySelector('.child-list'))
            elem.addEventListener('mouseenter', (e)=>{
                elem.classList.add('is-open');
            })
            elem.addEventListener('mouseleave', (e)=>{
                elem.classList.remove('is-open');
            })
        })
    // }
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
        maxWidth: 170
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
