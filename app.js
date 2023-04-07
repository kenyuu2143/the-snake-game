const canvasEl = document.querySelector("canvas");
const conX = canvasEl.getContext("2d");

canvasEl.height = 440;
canvasEl.width = 440;

// Game Parameters
let speed = 7;
let tileCount = 20;
let snakeHeadX = 10;
let snakeHeadY = 10;
let xV = 0;
let yV = 0;
let snackX = 5;
let snackY = 5;
let snakeTailLength = 2;
let score = 0;

// Derived Dimension
let tileSize = canvasEl.width / tileCount;

// snakeBody Array
const snakeBody = [];

// Arrow Keys Event Listener
document.addEventListener("keydown", changeDirection);

const eatSnack = new Audio("eat.wav");

// The Game Loop
function playGame() {
  changeSnakePosition();

  // handling gameOver
  if (gameOver()) {
    conX.fillStyle = "white";
    conX.font = "50px Arial";
    conX.textAlign = "center";
    conX.fillText(
      "GAME OVER! Press Space to Restart",
      canvasEl.width / 2,
      canvasEl.height / 2
    );
    document.addEventListener("keydown", restartGame);
    return;
  }

  clearScreen();
  snackColiDete();
  drawSnack();
  drawSnake();
  drawScore();

  setTimeout(playGame, 1000 / speed);
}

// Restart Game
function restartGame(e) {
  if (e.keyCode === 32) {
    window.location.reload();
  }
}

// GameOver Function
function gameOver() {
  let isGameOver = false;

  if (xV === 0 && yV === 0) return false;

  // Checking for wall collision
  if (
    snakeHeadX < 0 ||
    snakeHeadX === tileCount ||
    snakeHeadY < 0 ||
    snakeHeadY === tileCount
  ) {
    isGameOver = true;
  }

  // Checking the snake body collision
  for (let i = 0; i < snakeBody.length; i++) {
    let part = snakeBody[i];
    if (part.x === snakeHeadX && part.y === snakeHeadY) {
      isGameOver = true;
      break;
    }
  }
  if (isGameOver) {
    return true;
  }

  return false;
}

// drawScore Function
function drawScore() {
  conX.fillStyle = "white";
  conX.font = "20px Arial";
  conX.fillText(`Score: ${score}`, 10, 25);
}

// clearScreen Function
function clearScreen() {
  conX.fillStyle = "black";
  conX.fillRect(0, 0, canvasEl.width, canvasEl.height);
}

// drawSnake Function
function drawSnake() {
  conX.fillStyle = "#9acd32";
  for (let i = 0; i < snakeBody.length; i++) {
    let part = snakeBody[i];
    conX.fillRect(part.x * tileSize, part.y * tileSize, tileSize, tileSize);
  }

  snakeBody.push(new SnakeBody(snakeHeadX, snakeHeadY));

  if (snakeBody.length > snakeTailLength) {
    snakeBody.shift();
  }

  conX.fillStyle = "#ffa500";
  conX.fillRect(
    snakeHeadX * tileSize,
    snakeHeadY * tileSize,
    tileSize,
    tileSize
  );
}

// changeSnakePosition Function
function changeSnakePosition() {
  snakeHeadX += xV;
  snakeHeadY += yV;
}

// drawSnack Function
function drawSnack() {
  conX.fillStyle = "red";
  conX.fillRect(snackX * tileSize, snackY * tileSize, tileSize, tileSize);
}

// snackColiDete Function
function snackColiDete() {
  if (snackX === snakeHeadX && snackY === snakeHeadY) {
    snackX = Math.floor(Math.random() * tileCount);
    snackY = Math.floor(Math.random() * tileCount);
    snakeTailLength++;
    score++;
    speed++;
    eatSnack.play();
  }
}

// keyDown Function
function changeDirection(e) {
  // moving up
  if (e.keyCode === 38 && yV !== 1) {
    yV = -1;
    xV = 0;
  }

  // moving down
  if (e.keyCode === 40 && yV !== -1) {
    yV = 1;
    xV = 0;
  }

  // moving left
  if (e.keyCode === 37 && xV !== 1) {
    xV = -1;
    yV = 0;
  }
  // moving right
  if (e.keyCode === 39 && xV !== -1) {
    xV = 1;
    yV = 0;
  }
}

// The SnakeBody Class
class SnakeBody {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

playGame();

