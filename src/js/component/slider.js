jQuery(function ($) {
	$('.js-multiple-items').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		dots: true,
		nextArrow: '<button type="button" class="slick-next"><svg class="icon icon-arrow-right"><use xlink:href="#arrow-right"></use></svg></button>',
		prevArrow: '<button type="button" class="slick-prev"><svg class="icon icon-arrow-left"><use xlink:href="#arrow-back"></use></svg></button>',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					slidesToShow: 1,
				}
			},
		]
	});
});
