function createChart(data) {
    Highcharts.chart('container', {
		accessibility: {
			enabled: false,
		},
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'USD to EUR exchange rate over time',
            align: 'left'
        },
		subtitle: {
			text: document.ontouchstart === undefined ?
				'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in',
			align: 'left'
		},
		xAxis: {
			type: 'datetime'
		},
		yAxis: {
			title: {
				text: 'Exchange rate'
			}
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			area: {
				fillColor: {
					linearGradient: {
						x1: 0,
						y1: 0,
						x2: 0,
						y2: 1
					},
					stops: [
						[0, Highcharts.getOptions().colors[0]],
						[1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
					]
				},
				marker: {
					radius: 2
				},
				lineWidth: 1,
				states: {
					hover: {
						lineWidth: 1
					}
				},
				threshold: null
			}
		},
        series: [{
            type: 'area',
            name: 'USD to EUR',
            data: data
        }]
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const chartContainer = document.querySelector('#container');

    if (chartContainer) {
        // Создаем элемент <script> для загрузки Highcharts
        const script = document.createElement('script');
        script.src = 'https://code.highcharts.com/highcharts.js';
        script.async = true;

        // Обработчик события загрузки Highcharts
        script.onload = () => {
            // Загрузка данных и создание графика
            fetch('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v10.3.3/samples/data/usdeur.json')
                .then(response => response.json())
                .then(data => createChart(data))
                .catch(error => console.error('Ошибка загрузки данных:', error));

            // Загрузка модуля доступности
            const accessibilityScript = document.createElement('script');
            accessibilityScript.src = 'https://code.highcharts.com/modules/accessibility.js';
            accessibilityScript.async = true;
            document.body.appendChild(accessibilityScript);
        };

        // Добавляем элемент <script> в конец <body>
        document.body.appendChild(script);
    }
});


























// import Highcharts from 'highcharts';

// (async () => {

//     const data = await fetch(
//         'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v10.3.3/samples/data/usdeur.json'
//     ).then(response => response.json());

//     Highcharts.chart('container', {
//         chart: {
//             zoomType: 'x'
//         },
//         title: {
//             text: 'USD to EUR exchange rate over time',
//             align: 'left'
//         },
//         subtitle: {
//             text: document.ontouchstart === undefined ?
//                 'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in',
//             align: 'left'
//         },
//         xAxis: {
//             type: 'datetime'
//         },
//         yAxis: {
//             title: {
//                 text: 'Exchange rate'
//             }
//         },
//         legend: {
//             enabled: false
//         },
//         plotOptions: {
//             area: {
//                 fillColor: {
//                     linearGradient: {
//                         x1: 0,
//                         y1: 0,
//                         x2: 0,
//                         y2: 1
//                     },
//                     stops: [
//                         [0, Highcharts.getOptions().colors[0]],
//                         [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
//                     ]
//                 },
//                 marker: {
//                     radius: 2
//                 },
//                 lineWidth: 1,
//                 states: {
//                     hover: {
//                         lineWidth: 1
//                     }
//                 },
//                 threshold: null
//             }
//         },

//         series: [{
//             type: 'area',
//             name: 'USD to EUR',
//             data: data
//         }]
//     });
// })();



