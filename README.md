#BEAUTIFY TOOL
This is a javascript project to adjust parameters of photos, add filters and frames. It can import local photos or use web camera to take photos. 

##Functions
* Open File: Choose and Open local files
* Webcam: Use camara to take the photos
* Adjust: Adjust parameters of the photo, including contrast, brightness, exposure, warmth and saturation
* Filter: Add filters on the photos, including gray scale, aged, magnify, iced, tile, sharpness, blur, relief, carnival and mirror
* Frame: Add frames on the phoros, including blackedge, circle, rainy, flower, vintage, diamond, love, whitespot and star
* Save: Download processed image

##Third Party Code Used in this Experiment
* [requirejs](http://requirejs.org/), by [jrburke](jrburke), BSD & MIT license
* [jpg-glitch](https://github.com/snorpey/jpg-glitch), by [snorpey](snorpey), MIT license

##license[MIT License](LICENSE)
##Build Script
* Use python to set up a http server: python -m SimpleHTTPServer 8000
* Open localhost:8000 in the web browser
* The web cam and frame will not work without a http server