// WebPaint.js
// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform float u_Size;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = u_Size;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }`

// Constants
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 3;
const STAR = 4;

// Global Variables
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;
// Global UI variables
let g_selectedColor=[1.0,1.0,1.0,1.0];
let g_selectedSize=5;
let g_selectedType=POINT;
let g_segments = 10;

function setupWebGL(){
  // retrieve canvas element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  //gl = getWebGLContext(canvas);
  gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
}

function connectToGLSL(){
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if(!u_Size) {
    console.log('Failed to get the storage location of u_Size');
    return;
  }

}

// Set up actions for HTML UI elements
function addActionsForHtmlUI(){

  // Button Events (Shape type)
  document.getElementById('clearButton').onclick = function() { g_shapesList=[]; renderAllShapes(); };
  document.getElementById('pointButton').onclick = function() { g_selectedType=POINT };
  document.getElementById('triButton').onclick = function() { g_selectedType=TRIANGLE };
  document.getElementById('circleButton').onclick = function() { g_selectedType=CIRCLE };
  document.getElementById('starButton').onclick = function() { g_selectedType=STAR };
  document.getElementById('drawKitty').onclick = function() { drawKitty() };
  

  // Slider Events
  document.getElementById('redSlide').addEventListener('mouseup', function() {g_selectedColor[0] = this.value/100; });
  document.getElementById('greenSlide').addEventListener('mouseup', function() {g_selectedColor[1] = this.value/100; });
  document.getElementById('blueSlide').addEventListener('mouseup', function() {g_selectedColor[2] = this.value/100; });
  document.getElementById('sizeSlide').addEventListener('mouseup', function() {g_selectedSize = this.value });
  document.getElementById('segmentSlide').addEventListener('mouseup', function() {g_segments = this.value });
}

function main() {
  // Set up canvas and GL variables
  setupWebGL();
  // Set up GLSL shader programs, connect JavaScript Variables with GLSL variables
  connectToGLSL();

  // Set up actions for HTML UI elements
  addActionsForHtmlUI();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  canvas.onmousemove = function(ev) { if(ev.buttons == 1) { click(ev) } };
  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

}

var g_shapesList = [];

// var g_points = [];  // The array for the position of a mouse press
// var g_colors = [];  // The array to store the color of a point
// var g_sizes = [];

function click(ev) {
  // Extract event click and return it in WebGL coordinates
  let [x,y] = convertCoordsToGL(ev);

  // Create and store new point
  let point;
  if(g_selectedType==POINT) {
    point = new Point();
  } else if(g_selectedType==TRIANGLE) {
    point = new Triangle();
  } else if(g_selectedType==CIRCLE) {
    point = new Circle();
    point.segments = g_segments;
  } else if(g_selectedType==STAR) {
    point = new Star();
  }

  point.position=[x,y];
  point.color=g_selectedColor.slice();
  point.size=g_selectedSize;
  g_shapesList.push(point);

  // // Store the coordinates to g_points array
  // g_points.push([x, y]);
  // // store the color to g_colors array
  // g_colors.push(g_selectedColor.slice());
  // // store size to g_sizes array
  // g_sizes.push(g_selectedSize);

  
  renderAllShapes();
}

function convertCoordsToGL(ev){
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return([x,y]);
}

function renderAllShapes(){
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_shapesList.length;

  for(var i = 0; i < len; ++i) {

    g_shapesList[i].render();

  }
  
}

function drawKitty(){
  kitty = new Cat();
  g_shapesList.push(kitty);
  renderAllShapes();
}