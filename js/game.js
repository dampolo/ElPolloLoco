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
const breakInfo = document.querySelector(".break");
const embedElement = document.querySelector("embed");
const playAgainButtonYouLost = document.querySelector(".play-again");
const playAgainButtonYouWon = document.querySelector(".play-again-you-won");

/**
 * Adds a click event listener to the 'musicOnButton' element.
 * When the 'musicOnButton' element is clicked, it:
 * - Sets 'soundOn' flag to false.
 * - Hides the 'musicOnButton' by adding the "d-none" class.
 * - Shows the 'musicOffButton' by removing the "d-none" class.
 */
musicOnButton.addEventListener("click", () => {
    soundOn = false;
    musicOnButton.classList.add("d-none");
    musicOffButton.classList.remove("d-none");
});

/**
 * Adds a click event listener to the 'musicOffButton' element.
 * When the 'musicOffButton' element is clicked, it:
 * - Sets 'soundOn' flag to true.
 * - Shows the 'musicOnButton' by removing the "d-none" class.
 * - Hides the 'musicOffButton' by adding the "d-none" class.
 */
musicOffButton.addEventListener("click", () => {
    soundOn = true;
    musicOnButton.classList.remove("d-none");
    musicOffButton.classList.add("d-none");
});

/**
 * Begins the game.
 * - Hides the start screen and game over screen.
 * - Shows the break button and reset button.
 * - Hides the start game button and info screen.
 * - Shows the fullscreen button.
 * - Initializes the level.
 * - Gets the canvas element and creates a new World instance.
 */
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

/**
 * Adds a click event listener to the 'startGame' element.
 * When the 'startGame' element is clicked, it calls the 'start' function to begin the game.
 */
startGame.addEventListener("click", start);

/**
 * Clears all intervals and timeouts.
 * Iterates through a large range of interval and timeout IDs (1 to 9999999),
 * clearing them one by one using clearInterval and clearTimeout functions.
 * This effectively clears all intervals and timeouts that may have been set.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999999; i++) {
        window.clearInterval(i);
        clearTimeout(i);
    }
}

/**
 * Resets the game state.
 * - Resets and pauses the main sound.
 * - Pauses the 'sleep' sound.
 * - Shows the start screen and info button.
 * - Hides the reset button and start game button.
 * - Hides the break button and start button for break.
 * - Hides the fullscreen buttons.
 * - Hides the game over and you won screens.
 * - Exits fullscreen if the document is in fullscreen mode.
 * - Clears all intervals.
 * - Sets 'isGameOn' flag to true.
 */
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

/**
 * Adds a click event listener to the 'resetGame' element.
 * When the 'resetGame' element is clicked, it calls the 'reset' function to reset the game.
 */
resetGame.addEventListener("click", reset);

/**
 * Adds a click event listener to the 'playAgainButtonYouLost' element.
 * When the button is clicked, it performs several actions to reset the game after losing:
 * 1. Removes the "d-none" class from 'buttonsTop', 'buttonsBottom', 'playAgainButtonYouLost', and 'playAgainButtonYouWon', if present.
 * 2. Removes the "buttons-top-now-show" and "buttons-bottom-now-show" classes from 'buttonsTop' and 'buttonsBottom', respectively.
 * 3. Sets 'isGameOn' flag to true.
 * 4. Calls 'musicButtonOnOff' to manage music control buttons.
 * 5. Calls 'reset' to reset the game state.
 * 6. Calls 'start' to start the game again.
 */
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

/**
 * Toggles the state of the music control buttons.
 * If the 'musicOffButton' is hidden, it shows it and sets 'soundOn' to true.
 * If the 'musicOnButton' is hidden, it shows 'musicOffButton' and hides 'musicOnButton', setting 'soundOn' to false.
 */
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

/**
 * Adds a click event listener to the 'playAgainButtonYouWon' element.
 * When the button is clicked, it performs several actions to reset the game after winning:
 * 1. Removes the "d-none" class from 'buttonsTop', 'buttonsBottom', 'playAgainButtonYouLost', and 'playAgainButtonYouWon', if present.
 * 2. Removes the "buttons-top-now-show" and "buttons-bottom-now-show" classes from 'buttonsTop' and 'buttonsBottom', respectively.
 * 3. Sets 'isGameOn' flag to true.
 * 4. Calls 'musicButtonOnOff' to manage music control buttons.
 * 5. Calls 'reset' to reset the game state.
 * 6. Calls 'start' to start the game again.
 */
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

/**
 * Toggles the break mode.
 * This function toggles the visibility of break-related elements and manages game state.
 * - Toggles the visibility of 'breakButton' and 'startButtonBreak'.
 * - Toggles the 'play-again-show' class on 'breakInfo'.
 * - Calls 'musicButtonDisable' to manage music control buttons.
 * - Toggles the 'isGameOn' flag to indicate the game state.
 * - Toggles the 'soundOn' flag to indicate whether sound is on or off.
 *   If music is off, 'soundOn' is set to false regardless of the current state.
 */
const toggleBreak = () => {
    breakButton.classList.toggle("d-none");
    breakInfo.classList.toggle("play-again-show");
    startButtonBreak.classList.toggle("d-none");
    musicButtonDisable();
    isGameOn = !isGameOn; // Toggle the game state
    soundOn = !soundOn;
    if (musicOnButton.classList.contains("d-none")) {
        soundOn = false;
    }
};

/**
 * Adds a click event listener to the 'breakInfo' element.
 * When the 'breakInfo' element is clicked, it performs several actions:
 * 1. Removes the "play-again-show" class from 'breakInfo', if present.
 * 2. Removes the "d-none" class from 'breakButton', making it visible.
 * 3. Adds the "d-none" class to 'startButtonBreak', hiding it.
 * 4. Calls the 'musicButtonDisable' function to manage music control buttons.
 * 5. Sets 'isGameOn' flag to true.
 * 6. Checks if the music is on or off and updates the 'soundOn' flag accordingly.
 */
breakInfo.addEventListener("click", () => {
    breakInfo.classList.remove("play-again-show");
    breakButton.classList.remove("d-none");
    startButtonBreak.classList.add("d-none");
    musicButtonDisable();
    isGameOn = true;
    if (musicOnButton.classList.contains("d-none")) {
        soundOn = false;
    } else {
        soundOn = true;
    }
});

/**
 * Adds a click event listener to the 'breakButton' element.
 * When the 'breakButton' element is clicked, it invokes the 'toggleBreak' function.
 */
breakButton.addEventListener("click", toggleBreak);

/**
 * Adds a click event listener to the 'startButtonBreak' element.
 * When the 'startButtonBreak' element is clicked, it invokes the 'toggleBreak' function.
 */
startButtonBreak.addEventListener("click", toggleBreak);

/**
 * Toggles the disabled attribute of music control buttons.
 * If either 'musicOnButton' or 'musicOffButton' has the 'disabled' attribute,
 * it removes the attribute from both buttons, enabling them.
 * Otherwise, it sets the 'disabled' attribute to true for both buttons, disabling them.
 */
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
};

/**
 * Adds a click event listener to the 'fullScreen' element.
 * When the 'fullScreen' element is clicked, it adds the 'd-none' class to the 'fullScreen' element,
 * effectively hiding it.
 * It also removes the 'd-none' class from the 'fullScreenOff' element, making it visible.
 */
fullScreen.addEventListener("click", () => {
    fullScreen.classList.add("d-none");
    fullScreenOff.classList.remove("d-none");
});

/**
 * Adds a click event listener to the 'fullScreenOff' element.
 * When the 'fullScreenOff' element is clicked, it removes the 'd-none' class from the 'fullScreen' element,
 * making the 'fullScreen' element visible.
 * It also adds the 'd-none' class to the 'fullScreenOff' element, effectively hiding it.
 */
fullScreenOff.addEventListener("click", () => {
    fullScreen.classList.remove("d-none");
    fullScreenOff.classList.add("d-none");
});

/**
 * Adds a click event listener to the 'infoButtonBottom' element.
 * When the 'infoButtonBottom' element is clicked, it toggles the 'd-none' class on the 'infoScreen' element,
 * effectively showing or hiding the 'infoScreen'.
 * If the game is currently on (indicated by 'isGameOn'), it calls the 'toggleBreak' function.
 */
infoButtonBottom.addEventListener("click", () => {
    infoScreen.classList.toggle("d-none");
    if (isGameOn) {
        toggleBreak();
    }
});

/**
 * Adds a click event listener to the 'infoButtonTop' element.
 * When the 'infoButtonTop' element is clicked, it toggles the 'd-none' class on the 'infoScreen' element,
 * effectively showing or hiding the 'infoScreen'.
 */
infoButtonTop.addEventListener("click", () => {
    infoScreen.classList.toggle("d-none");
});

/**
 * Adds a click event listener to the 'closeButton' element.
 * When the 'closeButton' element is clicked, it toggles the 'd-none' class on the 'infoScreen' element,
 * effectively showing or hiding the 'infoScreen'.
 * If the 'startScreen' element contains the 'd-none' class (i.e., it is hidden),
 * and the game is currently on (indicated by 'isGameOn'), it calls the 'toggleBreak' function.
 */
closeButton.addEventListener("click", () => {
    infoScreen.classList.toggle("d-none");
    if (startScreen.classList.contains("d-none")) {
        if (isGameOn) {
            toggleBreak();
        }
    }
});

/**
 * Adds a click event listener to the 'startScreen' element.
 * When the 'startScreen' element is clicked, the 'd-none' class is added to the 'infoScreen' element,
 * effectively hiding the 'infoScreen' by applying the 'd-none' class.
 */
startScreen.addEventListener("click", () => {
    infoScreen.classList.add("d-none");
});

/**
 * Function to toggle the fullscreen mode.
 * If the document is currently in fullscreen mode, exits fullscreen.
 * If the document is not in fullscreen mode, requests fullscreen for the 'playGame' element.
 */
const toggleFullscreen = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        playGame.requestFullscreen();
    }
};

/**
 * Adds a click event listener to the 'fullScreen' element.
 * When the 'fullScreen' element is clicked, the 'toggleFullscreen' function will be executed.
 */
fullScreen.addEventListener("click", toggleFullscreen);

/**
 * Adds a click event listener to the 'fullScreenOff' element.
 * When the 'fullScreenOff' element is clicked, the 'toggleFullscreen' function will be executed.
 */
fullScreenOff.addEventListener("click", toggleFullscreen);

/**
 * Function to handle the 'fullscreenchange' event.
 * Checks if the 'playGame' element exists and is currently in fullscreen mode.
 * If in fullscreen mode, sets the class name of 'playGame' to "fullscreen".
 * If not in fullscreen mode, sets the class name of 'playGame' to "play-game" or any class that represents the normal state.
 */
const onChange = () => {
    if (playGame) {
        if (document.fullscreenElement) {
            playGame.className = "fullscreen";
        } else {
            playGame.className = "play-game"; // Change to whatever class represents normal state
        }
    }
};

/**
 * Adds an event listener to detect changes in the fullscreen state of the document.
 * The 'fullscreenchange' event is triggered when the document enters or exits fullscreen mode,
 * and the 'onChange' function will be executed in response to these changes.
 */
document.addEventListener("fullscreenchange", onChange);
