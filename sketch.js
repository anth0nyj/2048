let grid;

function setup() {
  createCanvas(400, 400);
  grid = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];
  addNumber();
  addNumber();
  // console.table(grid);
}

function addNumber() {
  let options = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) {
        options.push({
          x: i,
          y: j
        });
      }
    }
  }
  if (options.length > 0);
  let spot = random(options)
  let r = random(1);
  grid[spot.x][spot.y] = r > 0.5 ? 2 : 4;
}

// One "Move"
function keyPressed() {
  if (key == " ") {
    for (let i = 0; i < 4; i++) {
      row = operate(row);
    }
  }
  addNumber();
}

function operate(row) {
  row = slide(row);
  row = combine(row);
  row = slide(row);
  return row;
}

function draw() {
  background(255);
  drawGrid();
}

// Making new array
function slide(row) {
  let arr = row.filter(val => val);
  let missing = 4 - arr.length;
  let zeros = Array(missing).fill(0);
  // !arr.concat(zeros);
  arr = zeros.concat(arr);
  return arr;
}

// Operating on array itself
function combine(row) {
  for (let i = 3; i >= 1; i--) {
    let a = row[i];
    let b = row[i-1];
    if (a == b) {
      row[i] = a + b;
      row[i-1] = 0;
      break;
    }
  }
  return row;
}

function drawGrid() {
  let w = 100;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      noFill();
      strokeWeight(2);
      stroke(0);
      rect(i * w, j * w, w, w);
      let val = grid[i][j];
      if (grid[i][j] !== 0) {
        textAlign(CENTER, CENTER);
        textSize(64);
        fill(0);
        noStroke();
        // text(i + "," + j, i * w + w / 2, j * w + w / 2);
        text(val, i * w + w / 2, j * w + w / 2);
      }
    }
  }
}
