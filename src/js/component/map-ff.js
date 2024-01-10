import { Loader } from "@googlemaps/js-api-loader"
const axios = require("axios");
const isLocal = (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "");


const loader = new Loader({
	apiKey: "AIzaSyAJFBc9PqrYjxoXQD3bJ6C0q3DQUz7_-sY",
	version: "weekly",
});

const mapOptions = {
	center: { lat: 50.4018377, lng: 30.220909 },
	zoom: 9,
	zoomControl: true,
	mapTypeControl: false,
	scaleControl: false,
	streetViewControl: false,
	rotateControl: false,
	fullscreenControl: true,
	styles: [
		{
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#f5f5f5"
			}
		  ]
		},
		{
		  "elementType": "labels.icon",
		  "stylers": [
			{
			  "visibility": "off"
			}
		  ]
		},
		{
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#616161"
			}
		  ]
		},
		{
		  "elementType": "labels.text.stroke",
		  "stylers": [
			{
			  "color": "#f5f5f5"
			}
		  ]
		},
		{
		  "featureType": "administrative",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "visibility": "off"
			}
		  ]
		},
		{
		  "featureType": "administrative.land_parcel",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#bdbdbd"
			}
		  ]
		},
		{
		  "featureType": "poi",
		  "stylers": [
			{
			  "visibility": "off"
			}
		  ]
		},
		{
		  "featureType": "poi",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#eeeeee"
			}
		  ]
		},
		{
		  "featureType": "poi",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#757575"
			}
		  ]
		},
		{
		  "featureType": "poi.park",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#e5e5e5"
			}
		  ]
		},
		{
		  "featureType": "poi.park",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#9e9e9e"
			}
		  ]
		},
		{
		  "featureType": "road",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#ffffff"
			}
		  ]
		},
		{
		  "featureType": "road",
		  "elementType": "labels.icon",
		  "stylers": [
			{
			  "visibility": "off"
			}
		  ]
		},
		{
		  "featureType": "road.arterial",
		  "elementType": "labels",
		  "stylers": [
			{
			  "visibility": "off"
			}
		  ]
		},
		{
		  "featureType": "road.arterial",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#757575"
			}
		  ]
		},
		{
		  "featureType": "road.highway",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#dadada"
			}
		  ]
		},
		{
		  "featureType": "road.highway",
		  "elementType": "labels",
		  "stylers": [
			{
			  "visibility": "off"
			}
		  ]
		},
		{
		  "featureType": "road.highway",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#616161"
			}
		  ]
		},
		{
		  "featureType": "road.local",
		  "stylers": [
			{
			  "visibility": "off"
			}
		  ]
		},
		{
		  "featureType": "road.local",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#9e9e9e"
			}
		  ]
		},
		{
		  "featureType": "transit",
		  "stylers": [
			{
			  "visibility": "off"
			}
		  ]
		},
		{
		  "featureType": "transit.line",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#e5e5e5"
			}
		  ]
		},
		{
		  "featureType": "transit.station",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#eeeeee"
			}
		  ]
		},
		{
		  "featureType": "water",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#c9c9c9"
			}
		  ]
		},
		{
		  "featureType": "water",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#9e9e9e"
			}
		  ]
		}
	  ]

};

function setFilteredPlace(town) {
	console.log(town);
}

function setModalInfo(marker) {
	console.log(marker);
}


async function getData(type) {
	let urlParams = new URLSearchParams(window.location.search);
	const response = await fetch((isLocal ? `/data/${type}.json` : `/api/${type}?`) + urlParams.toString());
	const data = await response.json();
	// return data.slice(0, 30);
	return data;
}

export const initMap = ()=> {
	loader.load().then(async () => {
		const { Map } = await google.maps.importLibrary("maps");
		const markerIcon = {
			path: google.maps.SymbolPath.CIRCLE,
			path: 'M28.5 0C12.785 0 0 12.8347 0 28.6107C0 48.1891 25.5047 76.9314 26.5906 78.1454C27.6105 79.2859 29.3913 79.2838 30.4094 78.1454C31.4953 76.9314 57 48.1891 57 28.6107C56.9997 12.8347 44.2148 0 28.5 0ZM28.5 43.0055C20.5934 43.0055 14.1611 36.548 14.1611 28.6107C14.1611 20.6733 20.5936 14.216 28.5 14.216C36.4064 14.216 42.8388 20.6735 42.8388 28.6108C42.8388 36.5482 36.4064 43.0055 28.5 43.0055Z',
			fillColor: '#BC4CC6',
			strokeColor: '#BC4CC6',
			fillOpacity: 1,
			scale: .5,
			anchor: new google.maps.Point(11,11),
		}
		// const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

		const mapSimpleElement = document.getElementById("mapSimple");
		const mapFilterElement = document.getElementById("mapFilter");

		if(mapSimpleElement) {
			const mapSimplePosition = mapSimpleElement.dataset.position.split(',');
			const placeInfo = mapSimpleElement.title;
			mapOptions.center = { lat: +mapSimplePosition[0], lng: +mapSimplePosition[1] };

			const mapSimple = new Map(mapSimpleElement, mapOptions);
			const markerMapSimple = new google.maps.Marker({
				position: { lat: +mapSimplePosition[0], lng: +mapSimplePosition[1] },
				// position: map.getCenter(),
				map: mapSimple,
				title: placeInfo,
				icon: markerIcon
			});


			// markerMapSimple.addListener('click', () => {
			// 	const town = markerMapSimple.get('title');
			// 	setFilteredPlace(town);
			// });
		}

		if(mapFilterElement) {

			const points = JSON.parse(mapFilterElement.dataset.points);
			// const points = getData(mapFilterElement.dataset.points);
			const markers = [];
			const mapSidebar = document.getElementById('map_sidebar');
			let timeout;

			const mapFilter = new Map(mapFilterElement, mapOptions);



			mapFilterElement.addEventListener("click", (e) => {
				if(mapSidebar && mapSidebar.classList.contains('is-shown')) {
					mapSidebar.classList.remove('is-shown');
				}
			});

			// points.then((data) => {
			// 	console.log(data);
			// 	data.forEach(point => {
			// 		const markerMapFilter = new google.maps.Marker({
			// 			position: { lat: + point.latitude, lng:  + point.longitude },
			// 			map: mapFilter,
			// 			title: point.title,
			// 			icon: markerIcon
			// 		});
			// 		markers.push(markerMapFilter);
			// 	});
			// });
			console.log(points);
			points.forEach(point => {
				const position = point.position.split(',');
				const markerMapFilter = new google.maps.Marker({
					position: { lat: +position[0], lng:  +position[1] },
					map: mapFilter,
					title: point.title,
					icon: markerIcon
				});
				markers.push(markerMapFilter);
			});

			const bounds = new google.maps.LatLngBounds();


			console.log(bounds)

			markers.forEach((marker) => {
				bounds.extend(marker.getPosition());

				marker.addListener("click", function (e) {
					clearTimeout(timeout);

					// getMapPoints();

					getData().then((data) => {
						console.log(data);
					});
					if (mapSidebar.classList.contains('is-shown')) {
						mapSidebar.classList.remove('is-shown');
						timeout = setTimeout(function() {
							mapSidebar.classList.add('is-shown');
							setModalInfo(this);
						}, 500)
					} else {
						mapSidebar.classList.add('is-shown');
						setModalInfo(this)
					}
				});
			});
			mapFilter.fitBounds(bounds);

			// setTimeout(() => {
            //     mapFilter.setCenter(new google.maps.LatLng(50.0244754, 35.3932429));
            //     mapFilter.setZoom(9);
            //   }, 1500);
		}
	});

}


