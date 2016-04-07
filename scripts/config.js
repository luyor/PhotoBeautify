define(
	function () {
		return {
			settings: {
				canZoomWithPointer: { value: true },
				resizeUploadedImages: { value: true },
				language: { value: 'en-us', options: [ 'en-us', 'en-gb', 'de-de', 'ru-ru' ] }
			},
			defaultControlParams:{
				amount: {     min: 0, max: 99,  value: 24 },
				seed: {       min: 0, max: 100, value: 53 },
				iterations: { min: 0, max: 100, value: 21 },
				quality: {    min: 1, max: 99,  value: 46 }
			},
		};
	}
);