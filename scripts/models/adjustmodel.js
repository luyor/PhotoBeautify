/*global define*/
define(
	[ 'util/browser', 'util/addpublishers', 'util/canvas', 'util/localizetext' ],
	function ( browser, addPublishers , canvasHelper, loc ) {
		
		var adjust = {};

		function Adjust(adjustvalue,imagedata){

			var d = imagedata.data;
			//adjust constract
			var contrast_scale = (adjustvalue.contrast-50)/90+1;
			for (var i=0; i<d.length; i+=4) {
			  	var r = d[i]*contrast_scale+(1-contrast_scale)*0.5*255;
			 	var g = d[i+1]*contrast_scale+(1-contrast_scale)*0.5*255;
			    var b = d[i+2]*contrast_scale+(1-contrast_scale)*0.5*255;
			    d[i] = r;
			    d[i+1] = g;
			    d[i+2] = b;
			    if(d[i]>255) d[i] = 255;
			    if(d[i+1]>255) d[i+1] = 255;
			    if(d[i+2]>255) d[i+2] = 255;
			    if(d[i]<0) d[i] = 0;
			    if(d[i+1]<0) d[i+1] = 0;
			    if(d[i+2]<0) d[i+2] = 0;
  			}


			//adjust brightness
			var brightness_scale = (adjustvalue.brightness-50)/90+1;
			for (var i=0; i<d.length; i+=4) {
			  	var r = d[i]*brightness_scale;
			 	var g = d[i+1]*brightness_scale;
			    var b = d[i+2]*brightness_scale;
			    d[i] = r;
			    d[i+1] = g;
			    d[i+2] = b;
			    if(d[i]>255) d[i] = 255;
			    if(d[i+1]>255) d[i+1] = 255;
			    if(d[i+2]>255) d[i+2] = 255;
			    if(d[i]<0) d[i] = 0;
			    if(d[i+1]<0) d[i+1] = 0;
			    if(d[i+2]<0) d[i+2] = 0;
  			}


  			//adjust saturation
  			var saturation_scale = (adjustvalue.saturation-50)/50+1;
  			for (var i=0; i<d.length; i+=4) {
			  	var r = d[i];
			 	var g = d[i+1];
			    var b = d[i+2];
			    var L = 0.3*r + 0.59*g +0.11*b;
			    d[i] = r* saturation_scale + (1- saturation_scale )*L;
			    d[i+1] = g* saturation_scale + (1- saturation_scale )*L;
			    d[i+2] = b* saturation_scale + (1- saturation_scale )*L;
			    if(d[i]>255) d[i] = 255;
			    if(d[i+1]>255) d[i+1] = 255;
			    if(d[i+2]>255) d[i+2] = 255;
			    if(d[i]<0) d[i] = 0;
			    if(d[i+1]<0) d[i+1] = 0;
			    if(d[i+2]<0) d[i+2] = 0;
  			}

  			//adjust exposure
  			var exposure_scale = (adjustvalue.exposure-50)/50;
  			for (var i=0; i<d.length; i+=4) {
			  	var r = d[i];
			 	var g = d[i+1];
			    var b = d[i+2];
			    d[i] = r* Math.pow(2,exposure_scale);
			    d[i+1] = g* Math.pow(2,exposure_scale);
			    d[i+2] = b* Math.pow(2,exposure_scale);
			    if(d[i]>255) d[i] = 255;
			    if(d[i+1]>255) d[i+1] = 255;
			    if(d[i+2]>255) d[i+2] = 255;
			    if(d[i]<0) d[i] = 0;
			    if(d[i+1]<0) d[i+1] = 0;
			    if(d[i+2]<0) d[i+2] = 0;
  			}

  			//adjust warmth
  			var warmth_scale = adjustvalue.warmth *0.5+36;
  			var red; 
  			var green;
  			var blue;
  			if(warmth_scale <=66)
  			{
  				red = 255;

  				green = warmth_scale;
  				green = 99.47*Math.log(green) -161.12;
  			}
  			else
  			{
  				red = warmth_scale-60;
  				red = 329.7*(Math.pow(red,-0.133));

  				green = warmth_scale-60;
  				green = 288.12 * (Math.pow(green,-0.075));
  			}

  			if(warmth_scale>=66){
  				blue = 255;
  			}
  			else
  			{
  				if(warmth_scale<=19){
  					blue = 0;
  				}
  				else{
  					blue = warmth_scale-10;
  					blue = 138.52*(Math.log(blue))-305.04;
  				}
  			}
  			if (red <0 )  red =0;
  			if (red >255)  red =255;
  			if (green <0 )  green =0;
  			if (green >255)  green =255;
  			if (blue <0 )  blue =0;
  			if (blue >255)  blue =255;
  			for (var i=0; i<d.length; i+=4) {
			  	var r = d[i]/255*red;
			 	var g = d[i+1]/255*green;
			    var b = d[i+2]/255*blue;
			    d[i] = r;
			    d[i+1] = g;
			    d[i+2] = b;
  			}
  			
  			return imagedata;
		}

		adjust.Adjust = Adjust;


		return adjust;
	}
);