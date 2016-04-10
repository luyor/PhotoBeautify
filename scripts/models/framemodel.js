/*global define*/
define(
	[ 'util/browser', 'util/addpublishers', 'util/canvas', 'util/localizetext' ],
	function ( browser, addPublishers , canvasHelper, loc ) {
		
		var framemodel = {};
		var frame_canvas = document.createElement('canvas');
		var frame_context = frame_canvas.getContext('2d');
		var imageObj = new Image();
		imageObj.src = "GreenEdge.JPG";
		imageObj.onload = function() {
			frame_canvas.width=imageObj.width;
			frame_canvas.height=imageObj.height;
    		frame_context.drawImage(imageObj, 0, 0);
		}
		
		function GreenEdgeFrame(imagedata){

			frame_context.getImageData(0,0,frame_canvas.width,frame_canvas.height);
		}

		function BlackEdgeFrame(imagedata){

			var d = imagedata.data;
			var w = imagedata.width;
  			var h = imagedata.height;
  			var srcOff;
			for (var y=0; y<h; y++) {
		    	for (var x=0; x<w; x++) {
		    		var xdis = x> 0.5*w ? (w-x):x;
		    		var ydis = y> 0.5*h ? (h-y):y;
		    		var xscale = xdis/w;
		    		var yscale = ydis/h;
		    		var scale = yscale < xscale? yscale : xscale; 
		    		if(scale<=0.05){
		    			scale = scale/0.05;
		    			srcOff = (y*w+x)*4;
		    			d[srcOff] = 0;
	      				d[srcOff+1] = 0;
	      				d[srcOff+2] = 0;
		    		}
		    		else if(scale<=0.1 && scale>0.05){
		    			scale = scale/0.05-1;
		    			srcOff = (y*w+x)*4;
		    			d[srcOff] = d[srcOff]*scale;
	      				d[srcOff+1] = d[srcOff+1]*scale;
	      				d[srcOff+2] = d[srcOff+2]*scale;
		    		}
		      	}
		      	
		    }
			return imagedata;
		}

		function CircleFrame(imagedata){

			var d = imagedata.data;
			var w = imagedata.width;
  			var h = imagedata.height;
  			var srcOff;
			for (var y=0; y<h; y++) {
		    	for (var x=0; x<w; x++) {
		    		var xdis = x> 0.5*w ? (x-0.5*w):(0.5*w-x);
		    		var ydis = y> 0.5*h ? (y-0.5*h):(0.5*h-y);
		    		var xscale = xdis/w*2;
		    		var yscale = ydis/h*2;

		    		var dis = Math.pow(xscale,2)+ Math.pow(yscale,2); 
		    		dis = Math.sqrt(dis);
		    		if(dis>=1){
		    			srcOff = (y*w+x)*4;
		    			d[srcOff] = 0;
	      				d[srcOff+1] = 0;
	      				d[srcOff+2] = 0;
		    		}
		    		else if(dis>=0.8){
		    			var scale = (dis-0.8)/0.2;
		    			srcOff = (y*w+x)*4;
		    			d[srcOff] = d[srcOff]*(1-scale);
	      				d[srcOff+1] = d[srcOff+1]*(1-scale);
	      				d[srcOff+2] = d[srcOff+2]*(1-scale);
		    		}
		      	}
		      	
		    }
			return imagedata;
		}

		framemodel.BlackEdgeFrame = BlackEdgeFrame;
		framemodel.CircleFrame = CircleFrame;

		return framemodel;
	}
);