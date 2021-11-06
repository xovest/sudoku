const easy = [
  "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
  "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
];
const medium = [
  "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
  "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
];
const hard = [
  "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
  "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
];

var timer, timeRemaining, lives, selectedNum, selectedTile, disableSelect;

window.onload = function() {
  //new game when u ckick the button
  id("start-btn").addEventListener('click', startGame);
}

function startGame() {
  //board diff
  let board;
  if (id("diff-1").checked) board = easy[0];
  else if (id("diff-2").checked) board = medium[0];
  else board = hard[0];

  //setting lives and selecting numbers and tiles
  lives = 3;
  disableSelect = false;
  id("lives").textContent = "Lives Remaining: 3";

  //generating board
  generateBoard(board);

  //starting the timer
  startTimer();

  //setting the theme
  if (id("theme-1").checked) {
    qs("body").classList.remove("dark");
  } else {
    qs("body").classList.add("dark");
  }

  //showing number container
  id("number-container").classList.remove("hidden");
}

function startTimer() {
  //setting the remaining based on input
  if (id("time-1").checked) timeRemaining = 180;
  else if (id("time-2").checked) timeRemaining = 300;
  else timeRemaining = 600;

  //setting the timer first sec
  id("timer").textContent = timeConversion(timeRemaining);

  timer = setInterval(function() {
    --timeRemaining;
    if (!timeRemaining) endGame();
    id("timer").textContent = timeConversion(timeRemaining);
  }, 1000);
}

function timeConversion(time) {
  //converting in mm:ss format
  let mins = Math.floor(time / 60);
  if (mins < 10) mins = '0' + mins;

  let secs = time % 60;
  if (secs < 10) secs = '0' + secs;
  return mins + ':' + secs; 
}

function generateBoard(board) {
  //clearing prev board
  clearPrevious();

  //counting the tile ids
  let idCount = 0;

  //creating the tiles
  for (let i = 0; i < 81; ++i) {
    let tile = document.createElement("p");
    if (board.charAt(i) != '-') { //blank
      tile.textContent = board.charAt(i);
    } else {

    }
    tile.id = idCount;
    ++idCount;
    tile.classList.add("tile");
    if ((tile.id > 17 && tile.id < 27) || (tile.id > 44 && tile.id < 54)) {
      tile.classList.add("bottomBorder");
    }
    if ((tile.id + 1) % 9 == 3 || (tile.id + 1) % 9 == 6) {
      tile.classList.add("rightBorder");
    }

    //adding tile to board
    id("board").appendChild(tile);
  }
}

function clearPrevious() {
  let tiles = qsa(".tile");

  //removing tiles
  for (let i = 0; i < tiles.length; ++i) {
    tiles[i].remove();
  }

  //clearing the timer
  if (timer) clearTimeout(timer);

  //deselect numbers
  for (let i = 0; i < id("number-container").children.length; ++i) {
    id("number-container").children[i].classList.remove("selected");
  }

  //clear selected vars
  selectedTile = null;
  selectedNum = null;

}

//helper functions
function id(id) {
  return document.getElementById(id);
}

function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return document.querySelectorAll(selector);
}