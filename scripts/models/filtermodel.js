/*global define*/
define(
	[ 'util/browser', 'util/addpublishers', 'util/canvas', 'util/localizetext' ],
	function ( browser, addPublishers , canvasHelper, loc ) {
		
		var filter = {};

		function Grayscale(imagedata){
			d = imagedata.data;
			for (var i=0; i<d.length; i+=4) {
			  	var r = d[i];
			 	var g = d[i+1];
			    var b = d[i+2];
			    // CIE luminance for the RGB
			    // The human eye is bad at seeing red and blue, so we de-emphasize them.
			    var v = 0.2126*r + 0.7152*g + 0.0722*b;
			    d[i] = d[i+1] = d[i+2] = v;
  			}
  			return imagedata;
		}
		filter.Grayscale = Grayscale;

		function AgedFilter(imagedata){
			var width=imagedata.width;
			var height=imagedata.height;
			var radius=1;
			var intensityLevels=30;
			var tmp_image = [];

			var intensityCount= initArray(intensityLevels);
			var averageR= initArray(intensityLevels);
			var averageG= initArray(intensityLevels);
			var averageB= initArray(intensityLevels);

			for (var i=0;i<width;i++){
				for (var j=0;j<height;j++){
					
					var pos={x:i,y:j};
					var color=getPixel(imagedata,pos);
					var curIntensity=Math.floor(getIntensity(color)*intensityLevels/256);

					intensityCount[curIntensity]++;
					averageR[curIntensity] += color.r;
					averageG[curIntensity] += color.g;
					averageB[curIntensity] += color.b;

				}
			}

			for (var i=0;i<width;i++){
				for (var j=0;j<height;j++){
					var pos={x:i,y:j};
					var color=getPixel(imagedata,pos);
					var curIntensity=Math.floor(getIntensity(color)*intensityLevels/256);

					var finalR = Math.floor(averageR[curIntensity] / intensityCount[curIntensity]);
					var finalG = Math.floor(averageG[curIntensity] / intensityCount[curIntensity]);
					var finalB = Math.floor(averageB[curIntensity] / intensityCount[curIntensity]);
					var new_color={r:finalR,g:finalG,b:finalB};

					if (i==76&&j==610){
						color.r=0;
					}
					
					setPixel(imagedata,pos,new_color);
				}
			}

			return imagedata;
		}
		filter.AgedFilter = AgedFilter;

		function getIntensity(color){
			return 0.299*color.r+0.587*color.g+0.114*color.b;
		}

		function HahaFilter(imagedata){
			var width=imagedata.width;
			var height=imagedata.height;
			var centerX=Math.floor(width/2);
			var centerY=Math.floor(height/2);
			var radius=Math.min(centerX, centerY);
			var mutiple=2;

			var dst = [];
			
			var real_radius = radius / mutiple;
			
			for(var i=0; i<width; i++){
				for(var j=0;j<height;j++){
					
					var distance = (centerX-i)*(centerX-i) + (centerY-j)*(centerY-j);
					if (distance < radius * radius){
						var src_x = Math.round((i-centerX) / mutiple );
						var src_y = Math.round((j-centerY) / mutiple );
						src_x = Math.round(src_x * (Math.sqrt(distance) / real_radius));
						src_y = Math.round(src_y * (Math.sqrt(distance) / real_radius));
						src_x += centerX;
						src_y += centerY;
						
						dst[i+j*width] = getPixel(imagedata,{x:src_x,y:src_y});
					}
					else{
						var color = getPixel(imagedata,{x:i,y:j});
						dst[i+j*width] = color;
					}
					
				}
			}
			for(var i=0; i<width; i++){
				for(var j=0;j<height;j++){
					setPixel(imagedata,{x:i,y:j},dst[i+j*width]);
				}
			}

			return imagedata;
		}
		filter.HahaFilter = HahaFilter;

		function IcedFilter(imagedata){
			var width=imagedata.width;
			var height=imagedata.height;

			for(var i=0; i<width; i++){
				for(var j=0;j<height;j++){
					var color = getPixel(imagedata,{x:i,y:j});
					var t=color.r-color.g-color.b;
					t=t*3/2;
					t=t<0?-t:t;
					t=t>255?255:t;
					color.r=t;

					var t=color.g-color.b-color.r;
					t=t*3/2;
					t=t<0?-t:t;
					t=t>255?255:t;
					color.g=t;

					var t=color.b-color.g-color.r;
					t=t*3/2;
					t=t<0?-t:t;
					t=t>255?255:t;
					color.b=t;

					setPixel(imagedata,{x:i,y:j},color);
				}
			}
			return imagedata;
		}
		filter.IcedFilter = IcedFilter;

		function TileFilter(imagedata){
			var width=imagedata.width;
			var height=imagedata.height;
			var tileSize=30;
			var maxShift=20;
			var dst=[];

			for(var i=0; i<width; i+=tileSize){
				for(var j=0;j<height;j+=tileSize){
					var shiftX=getRandomInt(0,maxShift);
					var shiftY=getRandomInt(0,maxShift);
					for (var k=0;k<tileSize;k++){
						for (var l=0;l<tileSize;l++){
							var color=getPixel(imagedata,{x:i+k,y:j+l});
							dst[i+k+shiftX+(j+l+shiftY)*width]=color;
						}
					}
				}
			}

			for(var i=0; i<width; i++){
				for(var j=0;j<height;j++){
					if (!dst[i+j*width]) dst[i+j*width]={r:0,g:0,b:0};
					setPixel(imagedata,{x:i,y:j},dst[i+j*width]);
				}
			}
			
			return imagedata;
		}
		filter.TileFilter= TileFilter;

		function addcolor(dst,index,color,ratio){
			if (!dst[index]) {
				dst[index]={};
				dst[index].r=0;
				dst[index].g=0;
				dst[index].b=0;
			}
			
			dst[index].r+=color.r*ratio;
			dst[index].g+=color.g*ratio;
			dst[index].b+=color.b*ratio;
		}

		function initArray(number){
			var arr = Array(number);
			for (k=0;k<number;k++){
				arr[k]=0;
			}
			return arr;
		}

		function getPixel(imagedata,pos){
			var tmp = (pos.x+pos.y*imagedata.width)*4;
			return {r:imagedata.data[tmp],g:imagedata.data[tmp+1],b:imagedata.data[tmp+2]};
		}

		function setPixel(imagedata,pos,color){
			var tmp = (pos.x+pos.y*imagedata.width)*4;
			imagedata.data[tmp]=color.r;
			imagedata.data[tmp+1]=color.g;
			imagedata.data[tmp+2]=color.b;
		}

		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}

		return filter;
	}
);