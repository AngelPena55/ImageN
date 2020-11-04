

var foto;
window.onload = function() {
  
  foto = new Foto();
}

function selectImage(){
  document.getElementById("foto-file").click();
}

function makeGrayScale() {
  foto.grayscale()
}

function makeBright() {
  foto.makeBright();
}

function makeDark() {
  foto.makeDark();
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
function Saturation(value){

    var i, j;
    var t = foto.imageData;

    var width = foto.imageWidth, height = foto.imageHeight;

    if (value === undefined){
      value = 1.0;
    }
    var satLevel = value;
    var redLumConst = 0.3086;
    var greenLumConst = 0.6094;
    var blueLumConst = 0.0820;
    var a = (1 - satLevel) * redLumConst + satLevel
    var b = (1 - satLevel) * redLumConst;
    var c = (1 - satLevel) * redLumConst;
    var d = (1 - satLevel) * greenLumConst;
    var e = (1 - satLevel) * greenLumConst + satLevel;
    var f = (1 - satLevel) * greenLumConst;
    var g = (1 - satLevel) * blueLumConst;
    var h = (1 - satLevel) * blueLumConst;
    var i = (1 - satLevel) * blueLumConst + satLevel;
    for (i = 0; i < height; i++){
      for(j  = 0; j < width; j++){
        var pix = (i * width + j) * 4;
        t.data[pix]   = a * t.data[pix] + d * t.data[pix + 1] + g * t.data[pix + 2];
				t.data[pix + 1] = b * t.data[pix] + e * t.data[pix + 1] + h * t.data[pix + 2];
				t.data[pix + 2]  = c * t.data[pix] + f * t.data[pix + 1] + i * t.data[pix + 2];
      }
    }

    foto.operationEditedCtx.putImageData(t,0,0);
    
    foto.previewImage();
}
