let boxContainer = document.querySelector(".box");
let canvas = document.createElement("canvas");
canvas.classList.add("myCanvas");
boxContainer.append(canvas);


// ------Random auto-drawing of trails---------------

// get a 2d context of the canvas for auto drawing
let drawRandomCtx = canvas.getContext('2d'); 
let img = new Image();
img.src = ['/img/front-image.jpeg'];

//draw the front-image into the context
const upload = () => {
  let width = window.innerWidth;
  let height = img.height * (width / img.width);
  canvas.width = width;
  canvas.height = height;
  drawRandomCtx.drawImage(img, 0, 0, width, height);
};
window.addEventListener("load", upload, false);
window.addEventListener("resize", upload, false);

	//use Trail class to draw random object (trail) into the drawRandomCtx context
class Trail {
	constructor(x, y, dx, dy, radius) {
		this.x = x;
		this.y = y;
		//trail's movement on the x axis
		this.dx = dx;
		//trail's movement on the y axis
		this.dy = dy;
		this.radius = radius;
		this.drawTrail = function() {
			//create a new path
			drawRandomCtx.beginPath();
			// add a circular arc to the current path where:
			//  arc(x, y, radius, startAngle, endAngle, counterclockwise/default false)
			drawRandomCtx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
			drawRandomCtx.fill();
		};
		//to update the object's movement when touches any edge of the canvas
		this.updateTrail = function() {
			if(this.x + this.dx > canvas.width - this.radius || this.x + this.dx < this.radius) {
			//if the object touches the the right or the left edge of the Canvas 
				//reverse the object's movement direction
        		this.dx = -this.dx;
   			}
			//if the object touches the the bottom or the top edge of the Canvas 
				//reverse the object's movement direction
    		if(this.y + this.dy > canvas.height - this.radius || this.y + this.dy < this.radius) {
       			this.dy = -this.dy;
    		}
			this.x += this.dx;
			this.y += this.dy;
			this.drawTrail();
		};
	}
}
	//push not more than 20 trails objects with a random trail size
let trailArray = [];
for(let i = 0; i < 20; i++) {
	let radius = Math.random() * 3 + 1;
	let x = Math.random() * (window.innerWidth - radius * 2); 
	let y = Math.random() * (window.innerHeight/1.5 - radius * 2);
	let dx = (Math.random() - 0.5) * 2; 
	let dy = (Math.random() - 0.5) * 2;
	trailArray.push(new Trail(x, y, dx, dy, radius));
}
let repaintRandom;
const animateTrail = () => {
	drawRandomCtx.globalCompositeOperation = 'destination-out';
	repaintRandom = requestAnimationFrame(animateTrail);
	/* use the drawn trails objects as the mask to render the back image
	  to the canvas, and erase the overlapping layer */
	for (let i = 0; i < trailArray.length; i++) {
		trailArray[i].updateTrail();  
	}
	// console.log("im drawing");
}
animateTrail();
console.log("trails: ", trailArray);

// ------User-Drawing front trails---------------

// get a 2d context of the canvas for user's drawing
let drawUserCtx = canvas.getContext('2d');

// position of a mouse event relative to the canvas
const getMousePos = (canvasDom, mouseEvent) => {
  let rect = canvasDom.getBoundingClientRect();
  return {
    x: mouseEvent.clientX - rect.left,
    y: mouseEvent.clientY - rect.top
  };
}
// mouse events for user drawing into the drawUserCtx context
let drawing = false;
let mousePos = { x:0, y:0 };
let lastPos = mousePos;
canvas.addEventListener("mousemove", (e) => {
	mousePos = getMousePos(canvas, e);
	// console.log("mouse on X: ", e.clientX)
	}, false);
canvas.addEventListener("mousedown", (e) => {
	drawing = true;
	lastPos = getMousePos(canvas, e);
	}, false);
//stop drawing - release the pointer (e.g. mouse) when it's located inside the canvas
canvas.addEventListener("mouseup", () => {
	drawing = false;
	}, false);
//release the pointer (e.g. mouse) when it moves off the canvas	
canvas.addEventListener("mouseout", () => {
	drawing = false;
	}, false);

//position of a touch event relative to the canvas
const getTouchPos = (canvasDom, touchEvent) => {
	let rect = canvasDom.getBoundingClientRect();
  	return {
    	x: touchEvent.touches[0].clientX - rect.left,
    	y: touchEvent.touches[0].clientY - rect.top
  	};
}
// touch events for drawing circles to the drawUserCtx context
canvas.addEventListener("touchstart", (e) => {
	mousePos = getTouchPos(canvas, e);
    let touch = e.touches[0];
  	var mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  	canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", () => {
  	var mouseEvent = new MouseEvent("mouseup", {});
  	canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", (e) => {
	let touch = e.touches[0];
	let mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
	canvas.dispatchEvent(mouseEvent);
}, false);

//touch events on the canvas - prevent scrolling
const scroll = (e) => {
	if (e.target == canvas) {
    e.preventDefault();
  }
}
document.body.addEventListener("touchstart", scroll, {passive: false});
document.body.addEventListener("touchend", scroll, {passive: false});
document.body.addEventListener("touchmove", scroll, {passive: false});


// Drawing to the canvas into drawUserCtx context (mouse, touch)
const drawRubber = () => {
	drawUserCtx.beginPath();
	drawUserCtx.arc(lastPos.x, lastPos.y, 20, 0, 2 * Math.PI, false);
	drawUserCtx.fill();
	drawUserCtx.lineWidth = 20;
	drawUserCtx.moveTo(lastPos.x, lastPos.y);
	drawUserCtx.lineTo(mousePos.x, mousePos.y);
	drawUserCtx.stroke();
	lastPos = mousePos;
}
//enable animation
let repaintUser;		
function animateRubber () {
	drawUserCtx.globalCompositeOperation = 'destination-out';
	repaintUser = requestAnimationFrame(animateRubber);
	if (drawing) {
  	drawRubber();
	}
};
animateRubber();


// ---------- Uncover back-image by clickking 'See it better' btn
let info = document.querySelector('#box-info');
let eyeBtn = document.querySelector('#box-eye');
info.style.visibility = 'hidden';
const getMessage = () => {
	drawRandomCtx.clearRect(0, 0, canvas.width, canvas.height);
	drawUserCtx.clearRect(0, 0, canvas.width, canvas.height);
	cancelAnimationFrame(repaintRandom);
	cancelAnimationFrame(repaintUser);
	eyeBtn.style.visibility = 'hidden'; 
	canvas.style.cursor = 'auto';
	info.style.visibility = 'visible';
	setTimeout(() => {
        info.style.display = 'none';
    }, 3000);
}
eyeBtn.addEventListener('click', getMessage, false);
