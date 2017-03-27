# BEAUTIFY TOOL
This is a javascript project to adjust parameters of photos and add filters or frames. It can import local photos or use web camera to take photos. 

## Functions
* Open File: Choose and Open local files
* Webcam: Use camera to take photos
* Adjust: Adjust parameters of the photo, including contrast, brightness, exposure, warmth and saturation
* Filter: Add filters on the photos, including gray scale, aged, magnify, iced, tile, sharpness, blur, relief, carnival and mirror
* Frame: Add frames on the photos, including blackedge, circle, rainy, flower, vintage, diamond, love, whitespot and star
* Save: Download processed image

## Screen shot
![img](images/screenshot.jpg)

## Third Party Code Used in this Experiment
* [requirejs](http://requirejs.org/), by [jrburke](jrburke), BSD & MIT license
* [jpg-glitch](https://github.com/snorpey/jpg-glitch), by [snorpey](snorpey), MIT license

## license

[MIT License](LICENSE)


## Build Script
* Use python to set up an http server: python -m SimpleHTTPServer 8000
* Open localhost:8000 in the web browser
* The web cam and frame will not work without an http server
