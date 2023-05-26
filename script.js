const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ballRadius = 10;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = 2;
const numberOfBricks = 30;
let activeBricks = numberOfBricks;
let numberOfColumns = 5;
let numberOfRows = 3;
let bricks = [];
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var scoreContainer = document.getElementById("score");
scoreContainer.innerText = "Score :- 0";

function updateScore() {
  const score = getScore();

  scoreContainer.innerText = `Score :- ${score}`;
  if (score === numberOfColumns * numberOfRows) {
    alert("Congratulations you won the game");
    window.location.reload();
    clearInterval(interval);
  }
}

function getScore() {
  var score = 0;
  for (var r = 0; r < numberOfRows; r++) {
    for (var c = 0; c < numberOfColumns; c++) {
      if (bricks[r][c].status === 0) score++;
    }
  }

  return score;
}

function generateAllBricks() {
  for (var r = 0; r < numberOfRows; r++) {
    bricks[r] = [];
    for (var c = 0; c < numberOfColumns; c++) {
      bricks[r][c] = { x: r, y: c, status: 1 }; 
    }
  }
  console.log(bricks);
}

function drawAllBricks() {
  for (var r = 0; r < numberOfRows; r++) {
    for (var c = 0; c < numberOfColumns; c++) {
      var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
      var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
      if (!bricks[r][c]) bricks[r][c] = { x: brickX, y: brickY };
      else {
        bricks[r][c].x = brickX;
        bricks[r][c].y = brickY;
      }
      if (bricks[r][c].status) {
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function checkBoundaryHit() {
  if (x + dx + ballRadius >= canvasWidth || x + dx <= ballRadius) dx = -dx;
  if (y + dy <= ballRadius) dy = -dy;
  else if (y + dy > canvasHeight - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) dy = -dy;
    else handleGameOver();
  }
}

function handleGameOver() {
  alert("Game over, your score is " + getScore());
  updateScore();
  window.location.reload();
  clearInterval(interval);