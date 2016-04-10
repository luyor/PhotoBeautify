/*global define*/
define(
	[ 'util/browser', 'util/addpublishers', 'util/canvas', 'util/localizetext' ],
	function ( browser, addPublishers , canvasHelper, loc ) {
		
		var framemodel = {};
		var frame_canvas = document.createElement('canvas');
		var frame_context = frame_canvas.getContext('2d');
		var imageObj = new Image();
		imageObj.src = "http://www.cosy.sbg.ac.at/~pmeerw/Watermarking/lena_color.gif";
		imageObj.onload = function() {
    			frame_context.drawImage(imageObj, 0, 0);
		}

		function GreenEdgeFrame(imagedata){

			frame_context
			//var frame_canvas = document.createElement('canvas');
			//xvar frame_context = frame_canvas.getContext('2d');

			//fileReader = new fileReader();
			//fileReader.readAsDataURL('GreenEdge.JPG');

			
			//imageObj.width = 518;
			//imageObj.height = 518;

			
			//console.log(imageObj.width);
			

			/*

			var d = imagedata.data;

			var w = imagedata.width;
  			var h = imagedata.height;
  			var frame_w = Math.floor(w*0.05);
  			var frame_h = Math.floor(h*0.05);

  			var frame_xw = Math.floor(w*0.1);
  			var frame_xh = Math.floor(w*0.1);

			for (var y=0; y<h; y++) {
		    	for (var x=0; x<w; x++) {
		      		if(y<=Math.floor(h*0.1)|| y>=Math.floor(h*0.9)){

		      		}
		      			var sx = x;
		      		var dstOff = (y*w+x)*4;
		      		// calculate the weighed sum of the source image pixels that
		      		// fall under the convolution matrix
		      		var r=0, g=0, b=0, a=0;
		      		for (var cy=0; cy<side; cy++) {
		        		for (var cx=0; cx<side; cx++) {
		          			var scy = sy + cy - halfSide;
		          			var scx = sx + cx - halfSide;
		          			if (scy >= 0 && scy < h && scx >= 0 && scx < w) {
		            			var srcOff = (scy*w+scx)*4;
		            			var wt = weights[cy*side+cx];
		            			r += d[srcOff] * wt;
		            			g += d[srcOff+1] * wt;
		            			b += d[srcOff+2] * wt;
		            			a += d[srcOff+3] * wt;
		          			}
		        		}
		      		}
		      		dst[dstOff] = r;
		      		dst[dstOff+1] = g;
		      		dst[dstOff+2] = b;
		      		dst[dstOff+3] = a + alphaFac*(255-a);
		    	}
			}
*/

			return imagedata;
		}

		framemodel.GreenEdgeFrame = GreenEdgeFrame;
		return framemodel;
	}
);