// Global variable for image rotation
var currentRotation = 0;

var foto;
window.onload = function() {
  
  foto = new Foto();
}

function selectImage(){
  document.getElementById("foto-file").click();
}

function makeGrayScale() {
    //foto.grayscale();
    //Get the CanvasPixelArray
    var imageData = foto.imageData.data;

    //length is equal to each pixel being made up of 4 elements (Red, Green, Blue and Alpha)
    var arraylength = foto.imageWidth * foto.imageHeight * 4;

    var gray=0;

    //Change each pixel starting from the bottom right to the top left
    //Typically (R+G+B)/3 or R/3 + G/3 + B/3 (for overflow errors)
    //But weighted method (luminosity method) weighs RGB according to their wavelengths
    // gray = 0.299*R + 0.587*G + 0.114*B

    for (var i = arraylength-1 ; i>0 ;i-=4) {

        //Red= i-3, Green = i-2, Blue = i-1, Alpha = i
        //Get our gray shade using the weighted method
        gray = 0.299 * imageData[i-3] + 0.587 * imageData[i-2] + 0.114 * imageData[i-1];

        //Set our 3 RGB channels to the computed gray ignoring the alpha channel
        imageData[i-3] = gray;
        imageData[i-2] = gray;
        imageData[i-1] = gray;
    }

    //save image and preview
    foto.operationEditedCtx.putImageData(foto.imageData, 0, 0);
    //foto.operationOrgCtx.putImageData(foto.imageData, 0, 0);
    foto.previewImage();
}

//Brightness Filter
function makeBright() {
    //foto.makeBright();
    //Get the CanvasPixelArray
    var imageData = foto.imageData.data;
    var width = foto.imageWidth;
    var height = foto.imageHeight;

    //length is equal to each pixel being made up of 4 elements (Red, Green, Blue and Alpha)
    var arraylength = width * height * 4;

        for (var i = arraylength-1 ; i>0 ;i-=4) 
        {
          // This adds 10% to its current RGB values.
         imageData[i-3] = 1.1 *imageData[i-3];
         imageData[i-2] = 1.1 *imageData[i-2];
         imageData[i-1] = 1.1 *imageData[i-1];
         
        }
    //save image and preview
    foto.operationEditedCtx.putImageData(foto.imageData, 0, 0);
    foto.previewImage();
}



function makeDark() {
 // foto.makeDark();
    //Get the CanvasPixelArray
    var imageData = foto.imageData.data;
    var width = foto.imageWidth;
    var height = foto.imageHeight;

    //length is equal to each pixel being made up of 4 elements (Red, Green, Blue and Alpha)
    var arraylength = width * height * 4;

        for (var i = arraylength-1 ; i>0 ;i-=4) 
        {
          // This gets rid of 10% to its current RGB values.
         imageData[i-3] = 0.9 *imageData[i-3];
         imageData[i-2] = 0.9 *imageData[i-2];
         imageData[i-1] = 0.9 *imageData[i-1];
         
        }
    //save image and preview
    foto.operationEditedCtx.putImageData(foto.imageData, 0, 0);
    foto.previewImage();
}

function makeBlur() {
  foto.applyBlurFilter();
}

function makeEmboss() {
  foto.applyEmbossFilter();
}

function makeSharp() {
  foto.applySharpFilter();
  
}

function download() {
  foto.export();
}

function openColorpicker() {
  document.getElementById("color-picker").click();
}

function makeColorize(elem) {
  var color = elem.value;
  foto.colorize(color);
}

//Image Rotation
// rotate image to left
function rotateLeft(){
  	// update number of image rotation
	// negative number makes rotation go counter clockwise
	currentRotation += -90;

	// rotate counter clockwise by 90 degrees
	document.querySelector("#foto-image").style.transform = 'rotate(' + currentRotation + 'deg)';
}
// rotate image to right
function rotateRight(){
  	// update number of image rotation
	// positive number makes rotation go clockwise
	currentRotation += 90;

	// rotate clockwise by 90 degrees
	document.querySelector("#foto-image").style.transform = 'rotate(' + currentRotation + 'deg)';
}
// rotate image using slider
function rotate(t) {
  //either rotate image clockwise or counter clockwise 
  document.querySelector("#foto-image").style.transform = 'rotate(' + t + 'deg)';
}

function flipVertically() {
  foto.flipVertically();
  
}
function flipHorizontally() {
  foto.flipHorizontally();
  
}
function crop() {
  foto.cropSelected();
  
}
function makeTransparent() {
  foto.makeTransparent();
  
}
function Saturation(value){
    var x, y;
    var t = foto.imageData;
    var width = foto.imageWidth, height = foto.imageHeight;
    
    //Value ranges from 0.0 to 300.0 and the default is 100.0
    //divide by 100.0 to make it simple values ranging from 0.0 to 3.0
    value /= 100.0;

    //In case of error in value, set it to default
    if (value === undefined){
      value = 1.0;
    }

    //satLevel is the level at which user wants to saturate or desaturate image
    //redLumConst, greenLumConst, and blueLumConst are luminance constants that help determine the luminance of the color
    var satLevel = value;
    var redLumConst = 0.3086;
    var greenLumConst = 0.6094;
    var blueLumConst = 0.0820;
    
    //multiply the saturation level by the constants of each color
    var a = (1.0 - satLevel) * redLumConst + satLevel
    var b = (1.0 - satLevel) * redLumConst;
    var c = (1.0 - satLevel) * redLumConst;
    var d = (1.0 - satLevel) * greenLumConst;
    var e = (1.0 - satLevel) * greenLumConst + satLevel;
    var f = (1.0 - satLevel) * greenLumConst;
    var g = (1.0 - satLevel) * blueLumConst;
    var h = (1.0 - satLevel) * blueLumConst;
    var i = (1.0 - satLevel) * blueLumConst + satLevel;

    for (x = 0; x < height; x++){
      for(y  = 0; y < width; y++){

        //traverse each pixel
        var pix = (x * width + y) * 4;

        //mutilply each pixel cell by the result of the above calculation to alter the color of the original image
        t.data[pix]   = a * t.data[pix] + d * t.data[pix + 1] + g * t.data[pix + 2];
				t.data[pix + 1] = b * t.data[pix] + e * t.data[pix + 1] + h * t.data[pix + 2];
				t.data[pix + 2]  = c * t.data[pix] + f * t.data[pix + 1] + i * t.data[pix + 2];
      }
    }

    //save image and preview
    foto.operationEditedCtx.putImageData(t,0,0);
    foto.previewImage();
}
function Opacity(value){
    var opacity = value;
    var imageData = foto.imageData.data;
    var arraylength = foto.imageWidth * foto.imageHeight * 4;

    //Value ranges from 0.0 to 255.0 and the default is 0.0
    //In case of error in value, set it to default (no transparency)
    if (opacity === undefined){
        opacity = 255.0;
    }

    //loop through array but change only the Alpha level to match the inputted opacity value
    for (var i = arraylength-1 ; i>0 ;i-=4) {
        imageData[i] = opacity;
    }

    //save image and preview
    foto.operationEditedCtx.putImageData(foto.imageData, 0, 0);
    foto.previewImage();
}