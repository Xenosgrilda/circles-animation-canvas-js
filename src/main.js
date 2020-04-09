import Circle from './model/circle.js';

// CONSTANTS
const MAX_RADIUS = 40;
const POINTER_RANGE = 30;
const CIRCLES_AMOUNT = 1000;

// GLOBAL
const mouse = {
  x: undefined,
  y: undefined
};

// EVENTS
const onMouseMove = e =>{
  mouse.x = e.x;
  mouse.y = e.y;
};

const onResizeWindows = (canvas) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}


// START POINT
document.addEventListener('DOMContentLoaded', () => {
  // ANIMATION VARIABLES
  const canvas = document.querySelector("canvas");
  const c = canvas.getContext("2d");
  const circlesArray = [];
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Event Listeners
  document.addEventListener('resize', () => onResizeWindows(canvas))
  document.addEventListener('mousemove', onMouseMove)
  // Creating 100 circles;
  for (let index = 0; index < CIRCLES_AMOUNT; index++) {
    let radius = Math.random() * 4 + 2;
    let x = Math.random() * (window.innerWidth - radius * 2) + radius;
    let y = Math.random() * (window.innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;

    circlesArray.push(new Circle(x, y, dx, dy, radius));
  }

  animate(c, circlesArray);
})


// FUNCTIONS

/**
 * Creates a animation loop using the window.requestAnimationFrame()
 * @see requestAnimationFrame Docs {@link https://developer.mozilla.org/pt-BR/docs/Web/API/Window/requestAnimationFrame}
 * 
 * @param {CanvasRenderingContext2D} c The renderingContext to be drawn.
 * @param {Circle[]} circlesArray The populated array of circles.
 */
function animate(c, circlesArray){
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  circlesArray.forEach(circle => {
    update(c, circle);
  });

  requestAnimationFrame(() => {
    animate(c, circlesArray)
  });
};


/**
 * Updates the circle properties to be drawn on Canvas.
 * If there's a collision, the circle will go to the opposite way from the axis that collided.
 * 
 * Also if the mouse is near the POINTER_RANGE(default 30px) the circle will grow, if it's further 
 * than POINTER_RANGE it'll shrink.
 * 
 * @param {Circle} circle The circle being updated in canvas.
 */
function update(c, circle) {

  if (circle.x + circle.radius > innerWidth || circle.x - circle.radius < 0) {
    circle.dx = -circle.dx;
  }
  if (circle.y + circle.radius > innerHeight || circle.y - circle.radius < 0) {
    circle.dy = -circle.dy;
  }

  circle.x += circle.dx;
  circle.y += circle.dy;
  

  // Interactivity
  if (
    (mouse.x - circle.x < POINTER_RANGE) &&
    (mouse.x - circle.x > -POINTER_RANGE) &&
    ((mouse.y - circle.y < POINTER_RANGE) && (mouse.y - circle.y > -POINTER_RANGE))
  ) {
    if (circle.radius < MAX_RADIUS) {
      circle.radius += 1;
    }
  } else if (circle.radius > circle.minRadius) {
    circle.radius -= 1;
  }

  draw(c, circle);
}

/**
 * Updates the circle properties to be drawn on Canvas.
 * If there's a collision, the circle will go to the opposite way from the axis that collided.
 * 
 * Also if the mouse is near the POINTER_RANGE(default 30px) the circle will grow, if it's further 
 * than POINTER_RANGE it'll shrink.
 * 
 * @param {Circle} circle The circle being updated in canvas.
 */
function draw(c, circle) {
  c.beginPath();
  c.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
  c.closePath();
  c.fillStyle = circle.colour;
  c.fill();
}