let canvas;
let world;
let keyboard = new Keyboards();

const startGame = document.querySelector(".start-button");
const resetGame = document.querySelector(".reset-button");
const musicOn = document.querySelector(".music-on");
const musicOff = document.querySelector(".music-off");
const breakButton = document.querySelector(".break-button");

startGame.addEventListener("click", () => {
  document.querySelector(".start").classList.add("d-none");
  document.querySelector(".break-button").classList.remove("d-none");
  startGame.classList.toggle("d-none");
  resetGame.classList.toggle("d-none");
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
});

breakButton.addEventListener("click", () => {
  world.isGameOn = !world.isGameOn; //taki toggle
});

resetGame.addEventListener("click", () => {
  startGame.classList.toggle("d-none");
  resetGame.classList.toggle("d-none");
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
});

musicOn.addEventListener("click", () => {
  musicOn.classList.add("d-none");
  musicOff.classList.remove("d-none");
});

musicOff.addEventListener("click", () => {
  musicOn.classList.toggle("d-none");
  musicOff.classList.toggle("d-none");
});


