
const canvas = document.getElementById("canvas")

class Cell {
	constructor(alive=0){
		this.alive = alive
		this.nextStateLive = 0
	}

}

function make2dArray(w,h){
	var arr = []
	for (var i = 0; i < w; i++) {
		arr[i] = []
		for (var j = 0; j < h; j++) {
			arr[i][j] = new Cell()
		}
	}
	return arr
}


const world_size = {x:100, y:100}
let GRID_SIZE = 5;
var world = make2dArray(world_size.x, world_size.y);

function drawMap(map){ 
	for (var i = 0; i < map.length; i++) {
		for (var j = 0; j < map[i].length; j++) {
			var cell = map[i][j];
			if(cell.alive==1){
				fill(255)
				rect(i*GRID_SIZE,j*GRID_SIZE,GRID_SIZE,GRID_SIZE)
			}

		}
	}
}

function resetMap(map){ 
	for (var i = 0; i < map.length; i++) {
		for (var j = 0; j < map[i].length; j++) {
			map[i][j].alive=0
			map[i][j].nextStateLive=0
		}
	}
}

function randomPoints(map){
	for (var i = 0; i < map.length; i++) {
		for (var j = 0; j < map[i].length; j++) {
			if(random(1)>0.9){map[i][j].alive=1}
		}
	}
}

function life(map){
	for (var i = 1; i < map.length-1; i++) {
		for (var j = 1; j < map[i].length-1; j++) {
			var cell = map[i][j];
			var neighbors = (map[i+1][j].alive)+(map[i-1][j].alive)+(map[i][j+1].alive)+(map[i][j-1].alive) + (map[i+1][j+1].alive)+(map[i-1][j-1].alive)+(map[i+1][j-1].alive)+(map[i-1][j+1].alive)
			if (cell.alive) {
				if (neighbors<2) { map[i][j].nextStateLive = 0 }
				else if (neighbors==2 || neighbors==3) { map[i][j].nextStateLive = 1 }
				else if (neighbors>3) { map[i][j].nextStateLive = 0 }
			}else if (!cell.alive) {
				if (neighbors==3) { map[i][j].nextStateLive = 1 }
			}
		}
	}
}

function nextGen(map){
	for (var i = 0; i < map.length; i++) {
		for (var j = 0; j < map[i].length; j++) {
			map[i][j].alive = map[i][j].nextStateLive
		}
	}
}

var paused = true

function setup(){
	createCanvas(500, 500, canvas)
}

let mouseX = 0;
let mouseY = 0;

function draw(){
	background(12)
	drawMap(world)

	canvas.addEventListener("mousemove", (e) => {
		mouseX = (e.pageX - canvas.offsetLeft);
		mouseY = (e.pageY - canvas.offsetTop);
	})
	var cmx = floor((mouseX)/GRID_SIZE),
			cmy = floor((mouseY)/GRID_SIZE)

	if(mouseIsPressed){
		if (mouseButton === LEFT){
			if ((cmx < world_size.x && cmx >= 0) && (cmy<=world_size.y && cmy >= 0)) {
				world[cmx][cmy].alive=1
			}
		} 
			
    if (mouseButton === RIGHT && (cmx < world_size.x && cmx >= 0) && (cmy<=world_size.y && cmy >= 0)) {
			if ((cmx < world_size.x && cmx >= 0) && (cmy<=world_size.y && cmy >= 0)) {
				world[cmx][cmy].alive=0
			}
    }
	}

	if (!paused){
		if (frameCount%5==0) {
			life(world);
	    nextGen(world)
		}
	}

	if(paused){
		fill(200)
		textSize(30);
		textAlign(CENTER);
		text("Paused", width/2, height/2)
	}  

}

function keyPressed() {
  if (keyCode === 32) {
  	paused = !paused
  }
  if (keyCode === 82) {
  	randomPoints(world)
  }
  if(keyCode === 81) {
  	resetMap(world)
  }
}

document.addEventListener('contextmenu', event => event.preventDefault());
