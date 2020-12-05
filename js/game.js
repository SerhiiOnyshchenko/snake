const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png";
const sprite = new Image();
sprite.src = "img/snake-graphics.png";

let box = 32;
let score = 0;

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

let key = [];

let snake = [
  {
    x: 288,
    y: 320,
  }
];

function remuvkey(el) {
  key[0] = el;
}

document.addEventListener("keydown", direction);

let dir = "";

function direction(el) {
  if (el.keyCode === 37 && dir != "right" && dir != "left") {
    remuvkey(dir);
    dir = "left";
  } else if (el.keyCode === 38 && dir != "down" && dir != "up") {
    remuvkey(dir);
    dir = "up";
  } else if (el.keyCode === 39 && dir != "left" && dir != "right") {
    remuvkey(dir);
    dir = "right";
  } else if (el.keyCode === 40 && dir != "up" && dir != "down") {
    remuvkey(dir);
    dir = "down";
  }
  drawGame();
}

function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x === arr[i].x && head.y === arr[i].y) {
      clearInterval(game);
    }
  }
}

function grawSnakeTail(el1, el2) {
  ctx.drawImage(
    sprite,
    el1,
    el2,
    box,
    box,
    snake[snake.length - 1].x,
    snake[snake.length - 1].y,
    box,
    box
  );
}

function grawSnakeHead(el1, el2) {
  ctx.drawImage(sprite, el1, el2, box, box, snake[0].x, snake[0].y, box, box);
}

function drawGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(sprite, 0, 96, box, box, food.x, food.y, box, box);

  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      if (dir === "left") {
        grawSnakeHead(96, 32);
      } else if (dir === "right") {
        grawSnakeHead(128, 0);
      } else if (dir === "up") {
        grawSnakeHead(96, 0);
      } else if (dir === "down") {
        grawSnakeHead(128, 32);
      } else {
        grawSnakeHead(96, 0);
      }
    } else if (i === snake.length - 1) {
      if (key[key.length - 2] === "left") {
        grawSnakeTail(96, 96);
      } else if (key[key.length - 2] === "right") {
        grawSnakeTail(128, 64);
      } else if (key[key.length - 2] === "up") {
        grawSnakeTail(96, 64);
      } else if (key[key.length - 2] === "down") {
        grawSnakeTail(128, 96);
      } else {
        grawSnakeTail(96, 64);
      }
    } else {
      if (
        (key[i] === "left" && key[i - 1] === "up") ||
        (key[i] === "down" && key[i - 1] === "right")
      ) {
        ctx.drawImage(
          sprite,
          0,
          32,
          box,
          box,
          snake[i].x,
          snake[i].y,
          box,
          box
        );
      } else if (
        (key[i] === "up" && key[i - 1] === "right") ||
        (key[i] === "left" && key[i - 1] === "down")
      ) {
        ctx.drawImage(sprite, 0, 0, box, box, snake[i].x, snake[i].y, box, box);
      } else if (
        (key[i] === "up" && key[i - 1] === "left") ||
        (key[i] === "right" && key[i - 1] === "down")
      ) {
        ctx.drawImage(
          sprite,
          64,
          0,
          box,
          box,
          snake[i].x,
          snake[i].y,
          box,
          box
        );
      } else if (
        (key[i] === "down" && key[i - 1] === "left") ||
        (key[i] === "right" && key[i - 1] === "up")
      ) {
        ctx.drawImage(
          sprite,
          64,
          64,
          box,
          box,
          snake[i].x,
          snake[i].y,
          box,
          box
        );
      } else {
        if (key[i] === "left" || key[i] === "right") {
          ctx.drawImage(
            sprite,
            32,
            0,
            box,
            box,
            snake[i].x,
            snake[i].y,
            box,
            box
          );
        } else {
          newKey = key[i];
          ctx.drawImage(
            sprite,
            64,
            32,
            box,
            box,
            snake[i].x,
            snake[i].y,
            box,
            box
          );
        }
      }
    }
  }

  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.fillText(score, box * 2.5, box * 1.7);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }

  if (dir === "left") snakeX -= box;
  if (dir === "right") snakeX += box;
  if (dir === "up") snakeY -= box;
  if (dir === "down") snakeY += box;

  if (snakeX < box) {
    snakeX = box * 17;
  } else if (snakeX > box * 17) {
    snakeX = box;
  } else if (snakeY < box * 3) {
    snakeY = box * 17;
  } else if (snakeY > box * 17) {
    snakeY = box * 3;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake);
  snake.unshift(newHead);

  if (key.length >= snake.length) {
    key.pop();
    key.unshift(dir);
  } else {
    key.unshift(dir);
  }
}

let game = setInterval(drawGame, 150);
