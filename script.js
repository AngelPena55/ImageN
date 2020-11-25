

var foto;
//For drawing functionality
var penColor = "black";
var penCap = "round";
var penSize = 10;

window.onload = function() {
  
  foto = new Foto();
}

function selectImage(){
  document.getElementById("foto-file").click();
}
/*
for drawing functionality*/
function changePenColor(color){
  penColor = color;
}
function changePenCap(capStyle){
  penCap = capStyle
}
function changePenSize(size){
  penSize = size
}

window.addEventListener("load", ()=>{
  const canvas = document.querySelector("#canvas");
  const context = canvas.getContext("2d");

  //resizing
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  //variables
  let painting = false;

  function startPosition(e){
      painting = true;
      draw(e);
  }
  function finishedPosition(){
      painting = false;
      context.beginPath();
  }
  function draw(e){
      if(painting == false){
      return;
      }
      
      context.lineWidth= penSize;
      context.lineCap = penCap;
      context.strokeStyle = penColor;
      
      context.lineTo(e.layerX, e.layerY);
      context.stroke();
      context.beginPath();
      context.moveTo(e.layerX, e.layerY);
  }
  e = window.event;
  //check mouse
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", finishedPosition);
  canvas.addEventListener("mousemove", draw);

})

// GRAYSCALE FILTER --------------------------------------------------------------------------------------

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


//Brightness Filter ---------------------------------------------------------------------------------------


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



// MAKE DARK FILTER ------------------------------------------------------------------------------------

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


// Saturation Filter ---------------------------------------------------------------------------------------------

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


// Make Blur Filter ---------------------------------------------------------------------------------------


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
function rotate(t) {
  foto.rotate(t);
  
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


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function mydropdownFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



