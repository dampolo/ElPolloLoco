class SoundManager {
    constructor() {
        this.loadSounds();
    }

    loadSounds() {
        this.sounds = {
            mainSound: new Audio("./audio/desperado.mp3"),
            walk: new Audio("./audio/walk.mp3"),
            takeBottle: new Audio("./audio/take-bottle.mp3"),
            coin: new Audio("./audio/coin.mp3"),
            jump: new Audio("./audio/jump.mp3"),
            flyingBottle: new Audio("./audio/flying-bottle.mp3"),
            bottleCrash: new Audio("./audio/bottle-crash.mp3"),
            chickenDead: new Audio("./audio/chicken-dead.mp3"),
            pepeHit: new Audio("./audio/pepe-hit.mp3"),
            pepeDead: new Audio("./audio/pepe-dead.mp3"),
            won: new Audio("./audio/won.mp3"),
            lost: new Audio("./audio/lost.mp3"),
            sleep: new Audio("./audio/snoring.mp3"),
        };
    }

    /**
     * Plays the specified sound with optional volume control.
     * @param {string} sound - The key of the sound in the 'sounds' object.
     * @param {number} [volume=1] - The volume level (default is 1).
     * @returns {void}
     */
    playSound(sound, volume = 1) {
        // If sound is off, return early
        if (!soundOn) {
            return;
        } else {
            // Set the volume and play the specified sound
            this.sounds[sound].volume = volume;
            this.sounds[sound].play();
        }
    }

    /**
     * Pauses the specified sound.
     * @param {string} sound - The key of the sound in the 'sounds' object.
     */
    pauseSound(sound) {
        // Pause the specified sound
        this.sounds[sound].pause();
    }

    /**
     * Resets the playback position of the specified sound to the beginning.
     * @param {string} sound - The key of the sound in the 'sounds' object.
     */
    resetSound(sound) {
        // Set the current playback time of the specified sound to 0
        this.sounds[sound].currentTime = 0;
    }
}
