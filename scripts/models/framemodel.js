/*global define*/
define(
	[ 'util/browser', 'util/addpublishers', 'util/canvas', 'util/localizetext' ],
	function ( browser, addPublishers , canvasHelper, loc ) {
		
		var framemodel = {};
		var frame_canvas = document.createElement('canvas');
		var frame_context = frame_canvas.getContext('2d');
		var imageObj = new Image();
		imageObj.src = "images/frame/Diamond.JPG";
		imageObj.onload = function() {
			frame_canvas.width=imageObj.width;
			frame_canvas.height=imageObj.height;
    		frame_context.drawImage(imageObj, 0, 0);
		}

		var frame_canvas1 = document.createElement('canvas');
		var frame_context1 = frame_canvas1.getContext('2d');
		var imageObj1 = new Image();
		imageObj1.src = "images/frame/Vintage.JPG";
		imageObj1.onload = function() {
			frame_canvas1.width=imageObj1.width;
			frame_canvas1.height=imageObj1.height;
    		frame_context1.drawImage(imageObj1, 0, 0);
		}

		var frame_canvas2 = document.createElement('canvas');
		var frame_context2 = frame_canvas2.getContext('2d');
		var imageObj2 = new Image();
		imageObj2.src = "images/frame/Love.JPG";
		imageObj2.onload = function() {
			frame_canvas2.width=imageObj2.width;
			frame_canvas2.height=imageObj2.height;
    		frame_context2.drawImage(imageObj2, 0, 0);
		}

		
		function DiamondFrame(imagedata){
			var framedata = frame_context.getImageData(0,0,frame_canvas.width,frame_canvas.height);
			var framed = framedata.data;

			var newcanvas = document.createElement('canvas');
			var newcontext = newcanvas.getContext('2d');
			newcanvas.width=imagedata.width;
			newcanvas.height=imagedata.height;
			newcontext.drawImage(frame_canvas,0,0,newcanvas.width,newcanvas.height);

			var testdata = newcontext.getImageData(0,0,newcanvas.width,newcanvas.height);

			framedata = newcontext.getImageData(0,0,newcanvas.width,newcanvas.height);
			framed = framedata.data;
			var d = imagedata.data;
			for (var i=0; i<d.length; i+=4) {
				var scale = (framed[i]+framed[i]+framed[i])/3/255;
				d[i] = framed[i]*scale+d[i]*(1-scale);
			    d[i+1] = framed[i+1]*scale+d[i+1]*(1-scale);
			    d[i+2] = framed[i+2]*scale+d[i+2]*(1-scale);
							    
  			}
			return imagedata;
		}
		framemodel.DiamondFrame = DiamondFrame;

		function VintageFrame(imagedata){
			var framedata = frame_context1.getImageData(0,0,frame_canvas1.width,frame_canvas1.height);
			var framed = framedata.data;

			var newcanvas = document.createElement('canvas');
			var newcontext = newcanvas.getContext('2d');
			newcanvas.width=imagedata.width;
			newcanvas.height=imagedata.height;
			newcontext.drawImage(frame_canvas1,0,0,newcanvas.width,newcanvas.height);

			var testdata = newcontext.getImageData(0,0,newcanvas.width,newcanvas.height);

			framedata = newcontext.getImageData(0,0,newcanvas.width,newcanvas.height);
			framed = framedata.data;
			var d = imagedata.data;
			for (var i=0; i<d.length; i+=4) {
				var scale = (framed[i]+framed[i]+framed[i])/3/255;
				d[i] = framed[i]*(1-scale)+d[i]*scale;
			    d[i+1] = framed[i+1]*(1-scale)+d[i+1]*scale;
			    d[i+2] = framed[i+2]*(1-scale)+d[i+2]*scale;
							    
  			}
			return imagedata;
		}
		framemodel.VintageFrame = VintageFrame;

		function LoveFrame(imagedata){
			var framedata = frame_context2.getImageData(0,0,frame_canvas2.width,frame_canvas2.height);
			var framed = framedata.data;

			var newcanvas = document.createElement('canvas');
			var newcontext = newcanvas.getContext('2d');
			newcanvas.width=imagedata.width;
			newcanvas.height=imagedata.height;
			newcontext.drawImage(frame_canvas2,0,0,newcanvas.width,newcanvas.height);

			var testdata = newcontext.getImageData(0,0,newcanvas.width,newcanvas.height);

			framedata = newcontext.getImageData(0,0,newcanvas.width,newcanvas.height);
			framed = framedata.data;
			var d = imagedata.data;
			for (var i=0; i<d.length; i+=4) {
				var scale = (framed[i]+framed[i]+framed[i])/3/255;
				d[i] = framed[i]*scale+d[i]*(1-scale);
			    d[i+1] = framed[i+1]*scale+d[i+1]*(1-scale);
			    d[i+2] = framed[i+2]*scale+d[i+2]*(1-scale);
							    
  			}
			return imagedata;
		}
		framemodel.LoveFrame = LoveFrame;



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