

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