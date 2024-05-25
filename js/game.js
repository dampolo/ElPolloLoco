let canvas;
let world;
let keyboard = new Keyboards();
let soundManager = new SoundManager();

let isGameOn = true;
let soundOn = true;
let throwingBottle = false;

const bodyMusic = document.querySelector(".body");
const startGame = document.querySelector(".start-button");
const resetGame = document.querySelector(".reset-button");
const breakButton = document.querySelector(".break-button");
const startButtonBreak = document.querySelector(".start-button-break");
const infoButtonBottom = document.querySelector(".info-button-bottom");
const infoButtonTop = document.querySelector(".info-button-top");

const startScreen = document.querySelector(".start");
const gameOverScreen = document.querySelector(".game-over");
const youWonScreen = document.querySelector(".you-won");

const musicOnButton = document.querySelector(".music-on");
const musicOffButton = document.querySelector(".music-off");
const fullScreen = document.querySelector(".maximize");
const fullScreenOff = document.querySelector(".maximize-off");
const buttonsTop = document.querySelector(".buttons-top");
const buttonsBottom = document.querySelector(".buttons-bottom");

const canvasCloseInfo = document.querySelector("canvas");
const playGame = document.querySelector(".play-game");
const infoScreen = document.querySelector(".description-on-canvas");
const closeButton = document.querySelector(".close");
const embedElement = document.querySelector("embed");
const playAgainButtonYouLost = document.querySelector(".play-again");
const playAgainButtonYouWon = document.querySelector(".play-again-you-won");

musicOnButton.addEventListener("click", () => {
    soundOn = false;
    musicOnButton.classList.add("d-none");
    musicOffButton.classList.remove("d-none");
});

musicOffButton.addEventListener("click", () => {
    soundOn = true;
    musicOnButton.classList.remove("d-none");
    musicOffButton.classList.add("d-none");
});

const start = () => {
    startScreen.classList.add("d-none");
    gameOverScreen.classList.add("d-none");
    breakButton.classList.remove("d-none");
    startGame.classList.add("d-none");
    resetGame.classList.remove("d-none");
    infoScreen.classList.add("d-none");
    fullScreen.classList.remove("d-none");
    infoButtonTop.classList.add("d-none");
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
};

startGame.addEventListener("click", start);

function clearAllIntervals() {
    for (let i = 1; i < 9999999; i++) {
        window.clearInterval(i);
        clearTimeout(i);
    }
}

const reset = () => {
    soundManager.resetSound("mainSound");
    soundManager.pauseSound("mainSound");
    soundManager.pauseSound("sleep");
    startScreen.classList.remove("d-none");
    infoButtonTop.classList.remove("d-none");
    resetGame.classList.add("d-none");
    startGame.classList.remove("d-none");
    breakButton.classList.add("d-none");
    startButtonBreak.classList.add("d-none");
    fullScreen.classList.add("d-none");
    fullScreenOff.classList.add("d-none");
    gameOverScreen.classList.add("d-none");
    youWonScreen.classList.add("d-none");
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    clearAllIntervals();
    isGameOn = true;
};

resetGame.addEventListener("click", reset);

playAgainButtonYouLost.addEventListener("click", () => {
    buttonsTop.classList.remove("d-none");
    buttonsTop.classList.remove("buttons-top-now-show");
    buttonsBottom.classList.remove("buttons-bottom-now-show");
    playAgainButtonYouLost.classList.remove("play-again-show");
    playAgainButtonYouLost.classList.remove("d-none");
    playAgainButtonYouWon.classList.remove("play-again-show");
    playAgainButtonYouWon.classList.remove("d-none");
    isGameOn = true;
    musicButtonOnOff();
    reset();
    start();
});

const musicButtonOnOff = () => {
    if (musicOffButton.classList.contains("d-none")) {
        musicOffButton.classList.add("d-none");
        soundOn = true;
    } else {
        musicOnButton.classList.add("d-none");
        musicOffButton.classList.remove("d-none");
        soundOn = false;
    }
};

playAgainButtonYouWon.addEventListener("click", () => {
    buttonsTop.classList.remove("d-none");
    buttonsTop.classList.remove("buttons-top-now-show");
    buttonsBottom.classList.remove("buttons-bottom-now-show");
    playAgainButtonYouLost.classList.remove("play-again-show");
    playAgainButtonYouLost.classList.remove("d-none");
    playAgainButtonYouWon.classList.remove("play-again-show");
    playAgainButtonYouWon.classList.remove("d-none");
    isGameOn = true;
    musicButtonOnOff();
    reset();
    start();
});

const toggleBreak = () => {
    breakButton.classList.toggle("d-none");
    startButtonBreak.classList.toggle("d-none");
    musicButtonDisable();
    isGameOn = !isGameOn; // Toggle the game state
    soundOn = !soundOn;
    if (musicOnButton.classList.contains("d-none")) {
        soundOn = false;
    }
};

breakButton.addEventListener("click", toggleBreak);
startButtonBreak.addEventListener("click", toggleBreak);

const musicButtonDisable = () => {
    if (
        musicOnButton.hasAttribute("disabled") ||
        musicOffButton.hasAttribute("disabled")
    ) {
        musicOnButton.removeAttribute("disabled");
        musicOffButton.removeAttribute("disabled");
    } else {
        musicOnButton.setAttribute("disabled", "true");
        musicOffButton.setAttribute("disabled", "true");
    }
}

fullScreen.addEventListener("click", () => {
    fullScreen.classList.add("d-none");
    fullScreenOff.classList.remove("d-none");
});

fullScreenOff.addEventListener("click", () => {
    fullScreen.classList.remove("d-none");
    fullScreenOff.classList.add("d-none");
});

infoButtonBottom.addEventListener("click", () => {
    infoScreen.classList.toggle("d-none");
    if (isGameOn) {
        toggleBreak();
    }
});

infoButtonTop.addEventListener("click", () => {
    infoScreen.classList.toggle("d-none");
});

closeButton.addEventListener("click", () => {
    infoScreen.classList.toggle("d-none");
    if (startScreen.classList.contains("d-none")) {
        if (isGameOn) {
            toggleBreak();
        }
    }
});

startScreen.addEventListener("click", () => {
    infoScreen.classList.add("d-none");
});

const toggleFullscreen = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        playGame.requestFullscreen();
    }
};

fullScreen.addEventListener("click", toggleFullscreen);
fullScreenOff.addEventListener("click", toggleFullscreen);

const onChange = () => {
    if (playGame) {
        if (document.fullscreenElement) {
            playGame.className = "fullscreen";
        } else {
            playGame.className = "play-game"; // Change to whatever class represents normal state
        }
    }
};

document.addEventListener("fullscreenchange", onChange);
