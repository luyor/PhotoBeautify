/*global define*/
define(
	[ 'util/browser', 'util/addpublishers', 'util/canvas', 'util/localizetext' ],
	function ( browser, addPublishers , canvasHelper, loc ) {
		
		var framemodel = {};
		var diamond_canvas = AddFrameData('Diamond');
		var vintage_canvas = AddFrameData('Vintage');
		var love_canvas = AddFrameData('Love');
		var flower_canvas = AddFrameData('Flower');
		var rainy_canvas = AddFrameData('Rainy');
		var whitespot_canvas = AddFrameData('WhiteSpot');
		var star_canvas = AddFrameData('Star');
		
		function AddFrameData(name){
			var frame_canvas = document.createElement('canvas');
			var frame_context = frame_canvas.getContext('2d');
			var imageObj = new Image();
			imageObj.src = "images/frame/"+name+".JPG";
			imageObj.onload = function() {
				frame_canvas.width=imageObj.width;
				frame_canvas.height=imageObj.height;
    			frame_context.drawImage(imageObj, 0, 0);
    		}
    		return frame_canvas;
		}

		function Resize(canvas,imagedata){
			var frame_context = canvas.getContext('2d');
			var framedata = frame_context.getImageData(0,0,canvas.width,canvas.height);
			var newcanvas = document.createElement('canvas');
			var newcontext = newcanvas.getContext('2d');
			newcanvas.width=imagedata.width;
			newcanvas.height=imagedata.height;
			newcontext.drawImage(canvas,0,0,newcanvas.width,newcanvas.height);

			framedata = newcontext.getImageData(0,0,newcanvas.width,newcanvas.height);
			return framedata;
		}
		

		
		function DiamondFrame(imagedata){
			var framedata = Resize(diamond_canvas,imagedata);
			var framed = framedata.data;
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
			var framedata = Resize(vintage_canvas,imagedata);
			var framed = framedata.data;
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

		function FlowerFrame(imagedata){
			var framedata = Resize(flower_canvas,imagedata);
			var framed = framedata.data;
			var d = imagedata.data;
			for (var i=0; i<d.length; i+=4) {
				var gray = (framed[i]+framed[i+1]+framed[i+2])/3;
				if(gray<20){}
				else if(gray <50 && gray>=20){
					var scale = (framed[i]+framed[i]+framed[i])/3/255;
					d[i] = framed[i]*scale+d[i]*(1-scale);
			    	d[i+1] = framed[i+1]*scale+d[i+1]*(1-scale);
			    	d[i+2] = framed[i+2]*scale+d[i+2]*(1-scale);
				}
				else{
					d[i] = framed[i];
					d[i+1] = framed[i+1];
			    	d[i+2] = framed[i+2];
				}
							    
  			}
			return imagedata;
		}
		framemodel.FlowerFrame = FlowerFrame;

		function RainyFrame(imagedata){
			var framedata = Resize(rainy_canvas,imagedata);
			var framed = framedata.data;
			var d = imagedata.data;
			for (var i=0; i<d.length; i+=4) {
				var gray = (framed[i]+framed[i+1]+framed[i+2])/3;
				if(gray<20){}
				else if(gray <50 && gray>=20){
					var scale = (framed[i]+framed[i]+framed[i])/3/255;
					d[i] = framed[i]*scale+d[i]*(1-scale);
			    	d[i+1] = framed[i+1]*scale+d[i+1]*(1-scale);
			    	d[i+2] = framed[i+2]*scale+d[i+2]*(1-scale);
				}
				else{
					d[i] = framed[i];
					d[i+1] = framed[i+1];
			    	d[i+2] = framed[i+2];
				}
							    
  			}
			return imagedata;
		}
		framemodel.RainyFrame = RainyFrame;



		function WhiteSpotFrame(imagedata){
			var framedata = Resize(whitespot_canvas,imagedata);
			var framed = framedata.data;
			var d = imagedata.data;
			for (var i=0; i<d.length; i+=4) {
				var scale = (framed[i]+framed[i]+framed[i])/3/255;
				d[i] = framed[i]*scale+d[i]*(1-scale);
			    d[i+1] = framed[i+1]*scale+d[i+1]*(1-scale);
			    d[i+2] = framed[i+2]*scale+d[i+2]*(1-scale);
							    
  			}
			return imagedata;
		}
		framemodel.WhiteSpotFrame = WhiteSpotFrame;

		function StarFrame(imagedata){
			var framedata = Resize(star_canvas,imagedata);
			var framed = framedata.data;
			var d = imagedata.data;
			for (var i=0; i<d.length; i+=4) {
				var gray = (framed[i]+framed[i+1]+framed[i+2])/3;
				if(gray<20){}
				else if(gray <50 && gray>=20){
					var scale = (framed[i]+framed[i]+framed[i])/3/255;
					d[i] = framed[i]*scale+d[i]*(1-scale);
			    	d[i+1] = framed[i+1]*scale+d[i+1]*(1-scale);
			    	d[i+2] = framed[i+2]*scale+d[i+2]*(1-scale);
				}
				else{
					d[i] = framed[i];
					d[i+1] = framed[i+1];
			    	d[i+2] = framed[i+2];
				}
							    
  			}
			return imagedata;
		}
		framemodel.StarFrame = StarFrame;

		function LoveFrame(imagedata){
			var framedata = Resize(love_canvas,imagedata);
			var framed = framedata.data;
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