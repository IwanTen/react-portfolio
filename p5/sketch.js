const flock = [];
let boidColor = '#ffffff';
let boidSize = 18;
let numBoids = 30;

let wrapper = document.querySelector('header');

let bg = '#000000';

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  // canvas.parent('.wrapper');
  canvas.style('z-index', '-1');
  background(bg);
  for (let i = 0; i < numBoids; i++) {
    if (i <= 10) {
      flock.push(new Boid(boidColor + '70', boidSize, true));
    } else {
      flock.push(new Boid(boidColor + '70', boidSize, false));
    }
  }
}

function draw() {
  background(bg);
  for (let boid of flock) {
    boid.flock(flock);
    boid.update();
    boid.wrap();
    boid.display();
  }
}

// const flock = [];

//let alignmentSlider, cohesionSlider, seperationSlider

// function setup() {
//   createCanvas(windowWidth, windowHeight);
// alignmentSlider = createSlider(0,2,1,0.1);
//  cohesionSlider = createSlider(0,2,1,0.1);
// seperationSlider = createSlider(0,2,1,0.1);

// alignmentSlider.position(0,height-110);
// alignmentSlider.style('width', '50px');

//  cohesionSlider.position(0,height-70);
//  cohesionSlider.style('width', '50px');

// seperationSlider.position(0,height-30);
// seperationSlider.style('width', '50px');

//   for (let i = 0; i < 20; i++) {
//     flock.push(new Boid());
//   }
// }

// function draw() {
//   background(20, 0, 60,255);
//   //stroke(10);
//   fill(255);

//SLIDER LABELS
// textSize(10);
//text('alignment', 0,height-110);
//text('cohesion', 0,height-70);
//text('seperation', 0,height-30);

//   for (let boid of flock) {

//     boid.flock(flock);
//     boid.update();
//     boid.wrap();
//     boid.display();

//   }

// }
