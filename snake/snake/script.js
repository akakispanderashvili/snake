// for (let i = 0; i < 441; i++) {
//     let insideDiv = document.createElement("div");
//     grid.appendChild(insideDiv);
//   }

// for (let i = 0; i < 441; i++) {
//   const gridPart = document.createElement("div");
//   document.getElementById("grid").appendChild(gridPart);
// }

// var grid = document.getElementById("grid");
// div.className = "div";
// var div = document.getElementById("div");

// for (var i = 0; i < 441; i++) {
//  grid.appendChild(div.cloneNode(true));
// }

// createDiv() {
//     let div = document.createElement('div');
//     div.classList.add('grid');
//     grid.appendChild(div);

// }

// var grid = document.getElementById("grid");
// var insideDiv = document.createElement("div");
// for (var i = 0; i < 441; i++) {
//   grid.appendChild(insideDiv);
// }

document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  const scoreDisplay = document.querySelector("span");
  const startBtn = document.querySelector(".start");

  const width = 21;
  let currentIndex = 0;
  let appleIndex = 0;
  let currentSnake = [1, 0];
  let direction = 1;
  let score = 0;
  let speed = 1;
  let intervalTime = 0;
  let interval = 0;
  let randomPosition = Math.floor(Math.random() * 440 + 1);

  function startGame() {
    currentSnake.forEach((index) => squares[index].classList.remove("snake"));
    squares[appleIndex].classList.remove("apple");
    score = 0;
    randomApple();
    direction = 1;
    scoreDisplay.innerText = score;
    intervalTime = 200;
    let randomPosition = Math.floor(Math.random() * 440 + 1);
    currentSnake = [randomPosition + 1, randomPosition];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcomes, intervalTime);
  }

  function moveOutcomes() {
    if (
      (currentSnake[0] + width >= width * width && direction === width) ||
      (currentSnake[0] % width === width - 1 && direction === 1) ||
      (currentSnake[0] % width === 0 && direction === -1) ||
      (currentSnake[0] - width < 0 && direction === -width) ||
      squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
      confirm("You lost. Press button to restart.");
      return clearInterval(interval);
    }

    const tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);

    if (squares[currentSnake[0]].classList.contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      currentSnake.push(tail);
      randomApple();
      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcomes, intervalTime);
    }
    squares[currentSnake[0]].classList.add("snake");
  }

  //   function randomApple() {
  //     while (squares[appleIndex].classList.contains("snake"));
  //     squares[appleIndex].classList.add("apple");
  //     {
  //       appleIndex = Math.floor(Math.random() * squares.length);
  //     }
  //   }
  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
  }

  function control(e) {
    squares[currentIndex].classList.remove("snake");

    if (e.keyCode === 39) {
      direction = 1;
    } else if (e.keyCode === 38) {
      direction = -width;
    } else if (e.keyCode === 37) {
      direction = -1;
    } else if (e.keyCode === 40) {
      direction = +width;
    }
  }

  document.addEventListener("keyup", control);
  startBtn.addEventListener("click", startGame);
});
