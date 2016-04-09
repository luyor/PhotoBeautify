define(
	function () {
		return {
			settings: {
				canZoomWithPointer: { value: true },
				resizeUploadedImages: { value: true },
				language: { value: 'en-us', options: [ 'en-us', 'en-gb', 'de-de', 'ru-ru' ] }
			},
			defaultControlParams:{
				contrast: {     min: 0, max: 99,  value: 50 },
				brightness: {       min: 0, max: 100, value: 50 },
				exposure: { min: 0, max: 100, value: 50 },
				warmth: {    min: 1, max: 99,  value: 50 },
				saturation: {    min: 1, max: 99,  value: 50 },
				sharpness:{ min:1, max:100, value:50}

			},
		};
	}
);