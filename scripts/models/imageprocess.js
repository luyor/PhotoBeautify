/*global define*/
define(
	[ 'util/browser', 'util/addpublishers', 'util/canvas', 'util/localizetext','models/filtermodel' ,'models/adjustmodel'],
	function ( browser, addPublishers , canvasHelper, loc, filtermodel,adjustmodel ) {
		
		function ProcessModel () {
			if ( ! ( this instanceof ProcessModel ) ) {
				return new ProcessModel();
			}

			var self = this;
			var publishers = addPublishers( self, [ 'updateimage' ] );
			var ori = document.createElement('canvas');
			var context = ori.getContext('2d');
			var adjustvalue={contrast : 50, 
				brightness : 50, 
				exposure : 50,
				warmth : 50,
				saturation : 50}

			

			function setimage(imageData){
				ori.width = imageData.width;
				ori.height = imageData.height;
				context.putImageData(imageData,0,0);

				publishers.updateimage.dispatch(imageData);
			}

			function reset(){
				adjustvalue.contrast = 50;
				adjustvalue.brightness = 50;
				adjustvalue.exposure = 50;
				adjustvalue.warmth =50;
				adjustvalue.saturation = 50;
				publishers.updateimage.dispatch(context.getImageData(0,0,ori.width,ori.height));
			}

			function adjust(key, values ){
				adjustvalue[key] = values;

				var canvas = document.createElement('canvas');
				canvas.width = ori.width;
				canvas.height = ori.height;
				var new_context = canvas.getContext('2d');
				new_context.drawImage(ori,0,0);
				var newdata=new_context.getImageData(0,0,canvas.width,canvas.height);

				adjustmodel.Adjust( adjustvalue,newdata);

				publishers.updateimage.dispatch(newdata);

			}

			function filter(name){
				var canvas = document.createElement('canvas');
				canvas.width = ori.width;
				canvas.height = ori.height;
				var new_context = canvas.getContext('2d');
				new_context.drawImage(ori,0,0);
				var newdata=new_context.getImageData(0,0,canvas.width,canvas.height);

				switch(name){
					case 'Original':
						break; 
					case 'Grayscale':
						filtermodel.Grayscale(newdata);
						break;
					case 'AgedFilter':
						filtermodel.AgedFilter(newdata);
						break;
					case 'HahaFilter':
						filtermodel.HahaFilter(newdata);
						break;
					case 'IcedFilter':
						filtermodel.IcedFilter(newdata);
						break;
					case 'TileFilter':
						filtermodel.TileFilter(newdata);
						break;
					case 'SharpnessFilter':
						filtermodel.SharpnessFilter(newdata);
						break;
					case 'BlurFilter':
						filtermodel.BlurFilter(newdata);
						break;
					case 'ReliefFilter':
						filtermodel.ReliefFilter(newdata);
						break;
					case 'CarnivalFilter':
						filtermodel.CarnivalFilter(newdata);
						break;

				}

				publishers.updateimage.dispatch(newdata);
			}
			self.reset = reset;
			self.adjust = adjust;
			self.filter = filter;
			self.setimage = setimage;
			
		}
			

		return ProcessModel;
	}
);