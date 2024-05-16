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

    playSound(sound) {
        if(!soundOn) {
            return
        } else {
            this.sounds[sound].play();
        }
    }

    pauseSound(sound) {
        this.sounds[sound].pause();
    }

    resetSound(sound) {
            this.sounds[sound].currentTime = 0;
    }

} 
