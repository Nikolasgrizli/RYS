import { Loader } from "@googlemaps/js-api-loader";
// const axios = require("axios");

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
			elementType: "geometry",
			stylers: [
				{
					color: "#f5f5f5",
				},
			],
		},
		{
			elementType: "labels.icon",
			stylers: [
				{
					visibility: "off",
				},
			],
		},
		{
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#616161",
				},
			],
		},
		{
			elementType: "labels.text.stroke",
			stylers: [
				{
					color: "#f5f5f5",
				},
			],
		},
		{
			featureType: "administrative",
			elementType: "geometry",
			stylers: [
				{
					visibility: "off",
				},
			],
		},
		{
			featureType: "administrative.land_parcel",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#bdbdbd",
				},
			],
		},
		{
			featureType: "poi",
			stylers: [
				{
					visibility: "off",
				},
			],
		},
		{
			featureType: "poi",
			elementType: "geometry",
			stylers: [
				{
					color: "#eeeeee",
				},
			],
		},
		{
			featureType: "poi",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#757575",
				},
			],
		},
		{
			featureType: "poi.park",
			elementType: "geometry",
			stylers: [
				{
					color: "#e5e5e5",
				},
			],
		},
		{
			featureType: "poi.park",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#9e9e9e",
				},
			],
		},
		{
			featureType: "road",
			elementType: "geometry",
			stylers: [
				{
					color: "#ffffff",
				},
			],
		},
		{
			featureType: "road",
			elementType: "labels.icon",
			stylers: [
				{
					visibility: "off",
				},
			],
		},
		{
			featureType: "road.arterial",
			elementType: "labels",
			stylers: [
				{
					visibility: "off",
				},
			],
		},
		{
			featureType: "road.arterial",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#757575",
				},
			],
		},
		{
			featureType: "road.highway",
			elementType: "geometry",
			stylers: [
				{
					color: "#dadada",
				},
			],
		},
		{
			featureType: "road.highway",
			elementType: "labels",
			stylers: [
				{
					visibility: "off",
				},
			],
		},
		{
			featureType: "road.highway",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#616161",
				},
			],
		},
		{
			featureType: "road.local",
			stylers: [
				{
					visibility: "off",
				},
			],
		},
		{
			featureType: "road.local",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#9e9e9e",
				},
			],
		},
		{
			featureType: "transit",
			stylers: [
				{
					visibility: "off",
				},
			],
		},
		{
			featureType: "transit.line",
			elementType: "geometry",
			stylers: [
				{
					color: "#e5e5e5",
				},
			],
		},
		{
			featureType: "transit.station",
			elementType: "geometry",
			stylers: [
				{
					color: "#eeeeee",
				},
			],
		},
		{
			featureType: "water",
			elementType: "geometry",
			stylers: [
				{
					color: "#c9c9c9",
				},
			],
		},
		{
			featureType: "water",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#9e9e9e",
				},
			],
		},
	],
};

// function setFilteredPlace(town) {
// 	console.log(town);
// }

function setRandomImg(img) {
	const input = img.src;
	const regex = /(\d+)(\.jpg)/;

	const result = input.replace(regex, (match, p1, p2) => {
		const newNumber = Math.floor(Math.random() * 8) + 1;
		return `${newNumber}${p2}`;
	});
	img.src = result;
}

function setModalInfo(marker) {
	console.log(marker);

	const img = document.querySelector("#mapSidebar-img"),
		title = document.querySelector("#mapSidebar-title"),
		recordsBy = document.querySelector("#mapSidebar-recordsBy"),
		sounds = document.querySelector("#mapSidebar-sounds"),
		filterLink = document.querySelector("#mapSidebar-filterLink");

	setRandomImg(img);
	title.innerHTML = `<i> ${marker.title} ${marker.region_title} Область </i>`;
	recordsBy.innerHTML = `<i> ${marker.recordsBy} </i>`;
	sounds.innerHTML = `<i> ${marker.sounds} </i>`;
	filterLink.href = marker.filterLink;
}

export const initMap = (points) => {
	loader.load().then(async () => {
		const { Map } = await google.maps.importLibrary("maps");
		const markerIcon = {
			path: google.maps.SymbolPath.CIRCLE,
			path: "M28.5 0C12.785 0 0 12.8347 0 28.6107C0 48.1891 25.5047 76.9314 26.5906 78.1454C27.6105 79.2859 29.3913 79.2838 30.4094 78.1454C31.4953 76.9314 57 48.1891 57 28.6107C56.9997 12.8347 44.2148 0 28.5 0ZM28.5 43.0055C20.5934 43.0055 14.1611 36.548 14.1611 28.6107C14.1611 20.6733 20.5936 14.216 28.5 14.216C36.4064 14.216 42.8388 20.6735 42.8388 28.6108C42.8388 36.5482 36.4064 43.0055 28.5 43.0055Z",
			fillColor: "#BC4CC6",
			strokeColor: "#BC4CC6",
			fillOpacity: 1,
			scale: 0.5,
			anchor: new google.maps.Point(11, 11),
		};
		// const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

		const mapSimpleElement = document.getElementById("mapSimple");
		const mapFilterElement = document.getElementById("mapFilter");

		if (mapSimpleElement) {
			const mapSimplePosition =
				mapSimpleElement.dataset.position.split(",");
			const placeInfo = mapSimpleElement.title;
			mapOptions.center = {
				lat: +mapSimplePosition[0],
				lng: +mapSimplePosition[1],
			};

			const mapSimple = new Map(mapSimpleElement, mapOptions);
			const markerMapSimple = new google.maps.Marker({
				position: {
					lat: +mapSimplePosition[0],
					lng: +mapSimplePosition[1],
				},
				// position: map.getCenter(),
				map: mapSimple,
				title: placeInfo,
				icon: markerIcon,
			});

			// markerMapSimple.addListener('click', () => {
			// 	const town = markerMapSimple.get('title');
			// 	setFilteredPlace(town);
			// });
		}

		if (mapFilterElement) {
			const markers = [];
			const mapSidebar = document.getElementById("map_sidebar");

			const typeOfMap = mapFilterElement.classList.contains(
				"js-map-songs"
			)
				? "songs"
				: "stories";
			let timeout;

			window.mapFilter = new Map(mapFilterElement, mapOptions);

			// if click on map(not on trigger), close sidebar
			mapFilterElement.addEventListener("click", (e) => {
				if (
					mapSidebar &&
					mapSidebar.classList.contains("is-shown") &&
					e.target.tagName !== "IMG"
				) {
					mapSidebar.classList.remove("is-shown");
				}
			});

			points.forEach((point) => {
				// const position = point.position.split(',');
				const markerMapFilter = new google.maps.Marker({
					// position: { lat: +position[0], lng:  +position[1] },
					position: { lat: +point.latitude, lng: +point.longitude },
					map: mapFilter,
					title: point.title,
					icon: markerIcon,
				});

				if (typeOfMap === "stories") {
					markerMapFilter.addListener("click", function (e) {
						document
							.querySelector(
								'#input-places option[value="' + point.id + '"]'
							)
							.setAttribute("selected", "selected");
						document.querySelector("#form-search").submit();
					});
				} else {
					const addInfo = {
						sounds: point.sounds,
						recordsBy: point.recordsBy,
						filterLink: point.filterLink,
						region_title: point.region_title,
						photo: point.photo,
					};
					Object.assign(markerMapFilter, addInfo);
					markerMapFilter.addListener("click", function (e) {
						clearTimeout(timeout);
						if (mapSidebar.classList.contains("is-shown")) {
							mapSidebar.classList.remove("is-shown");
							timeout = setTimeout(function () {
								mapSidebar.classList.add("is-shown");
								setModalInfo(markerMapFilter);
							}, 500);
						} else {
							setModalInfo(markerMapFilter);
							mapSidebar.classList.add("is-shown");
						}
					});
				}

				markers.push(markerMapFilter);
			});

			const bounds = new google.maps.LatLngBounds();

			markers.forEach((marker) => {
				bounds.extend(marker.getPosition());
			});
			mapFilter.fitBounds(bounds);

			setTimeout(() => {
				// mapFilter.setCenter(new google.maps.LatLng(50.0244754, 35.3932429));
				mapFilter.setZoom(9);
			}, 1500);
		}
	});
};
