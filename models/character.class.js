class Character extends MovableObject {
    IMAGES_IDLE = [
        "img/2_character_pepe/1_idle/idle/I-1.png",
        "img/2_character_pepe/1_idle/idle/I-2.png",
        "img/2_character_pepe/1_idle/idle/I-3.png",
        "img/2_character_pepe/1_idle/idle/I-4.png",
        "img/2_character_pepe/1_idle/idle/I-5.png",
        "img/2_character_pepe/1_idle/idle/I-6.png",
        "img/2_character_pepe/1_idle/idle/I-7.png",
        "img/2_character_pepe/1_idle/idle/I-8.png",
        "img/2_character_pepe/1_idle/idle/I-9.png",
        "img/2_character_pepe/1_idle/idle/I-10.png",
    ];

    IMAGES_LONG_IDLE = [
        "img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img/2_character_pepe/1_idle/long_idle/I-15.png",
        "img/2_character_pepe/1_idle/long_idle/I-16.png",
        "img/2_character_pepe/1_idle/long_idle/I-17.png",
        "img/2_character_pepe/1_idle/long_idle/I-18.png",
        "img/2_character_pepe/1_idle/long_idle/I-19.png",
        "img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png",
    ];

    IMAGES_JUMPING_UP = [
        // 'img/2_character_pepe/3_jump/J-31.png',
        // 'img/2_character_pepe/3_jump/J-32.png',
        "img/2_character_pepe/3_jump/J-33.png",
        "img/2_character_pepe/3_jump/J-34.png",
    ];

    IMAGES_JUMPING_DOWN = [
        "img/2_character_pepe/3_jump/J-35.png",
        "img/2_character_pepe/3_jump/J-36.png",
        "img/2_character_pepe/3_jump/J-37.png",
        "img/2_character_pepe/3_jump/J-38.png",
        "img/2_character_pepe/3_jump/J-39.png",
    ];

    IMAGES_DEAD = [
        "img/2_character_pepe/5_dead/D-51.png",
        "img/2_character_pepe/5_dead/D-52.png",
        "img/2_character_pepe/5_dead/D-53.png",
        "img/2_character_pepe/5_dead/D-54.png",
        "img/2_character_pepe/5_dead/D-55.png",
        "img/2_character_pepe/5_dead/D-56.png",
        "img/2_character_pepe/5_dead/D-57.png",
    ];

    IMAGES_HURT = [
        "img/2_character_pepe/4_hurt/H-41.png",
        "img/2_character_pepe/4_hurt/H-42.png",
        "img/2_character_pepe/4_hurt/H-43.png",
    ];

    IMAGES_THROWING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
    ];

    IMAGE_GAME_OVER = ["img/9_intro_outro_screens/game_over/game over.png"];

    offset = {
        top: 100,
        left: 20,
        right: 20,
        bottom: 10,
    };

    constructor() {
        super();
        this.loadImage("img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING_UP);
        this.loadImages(this.IMAGES_JUMPING_DOWN);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_THROWING);
        this.animate();
        this.x = -50;
        this.y = 180;
        this.speed = 6;
        this.height = 250;
        this.width = 100;
        this.characterIsDead = true;
        this.characterIsDeadSound = true;
        this.applyGravity();
        this.counterCoint = 0;
        this.counterBottle = 5;
        this.maxCounterBottle = 5;
        this.energy = 100;
        this.characterIsSleeping = true;
        this.sleepTimeout = null;
    }

    animate() {
        setInterval(() => {
            soundManager.pauseSound("walk");

            if (isGameOn === false) {
                return;
            }

            if (this.isDead()) {
                return;
            }

            if (
                this.world.keyboard.RIGHT &&
                this.x < this.world.level.level_end_x
            ) {
                soundManager.pauseSound("sleep");
                this.characterIsMovingRight();
            }

            if (this.world.keyboard.LEFT && this.x > -1500) {
                soundManager.pauseSound("sleep");
                this.characterIsMovingLeft();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                soundManager.pauseSound("sleep");
                this.characterIsJumping();
            }

            if (this.world.keyboard.SPACE) {
                soundManager.pauseSound("sleep");
                this.resetAnimation();
            }

            this.world.camera_x = -this.x + 85;
        }, 1000 / 60);

        setInterval(() => {
            if (isGameOn === false) {
                return;
            }
            if (this.isDead()) {
                if (this.characterIsDead) {
                    soundManager.playSound("pepeDead");
                    this.characterIsDead = false;
                }
                this.displayGameOver();
                soundManager.playSound("lost");

                setTimeout(() => {
                    playAgainButtonYouLost.classList.add("play-again-show");
                }, 800);
                return;
            }

            if (this.isHurt()) {
                this.characterIsHurting();
            } else if (this.isAboveGround()) {
                this.characterIsJumpingAnimation();
            } else {
                this.characterIsSleepingWalkingStaying();
            }
        }, 50);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD, false);

                setTimeout(() => {
                    this.currentImage = this.IMAGES_DEAD.length - 1;
                }, 300);
            }
        }, 100);
    }

    characterIsMovingRight() {
        this.moveRight();
        this.otherDirection = false;
        soundManager.playSound("walk");
    }

    characterIsMovingLeft() {
        this.moveLeft();
        this.otherDirection = true;
        soundManager.playSound("walk");
    }

    characterIsJumping() {
        this.characterIsSleeping = false;
        this.sleepAgain();
        this.jump();
        soundManager.playSound("jump");
    }

    soundLost = new Audio("./audio/lost.mp3");

    displayGameOver() {
        this.displayGameOverSoundOff();
        this.displayGameOverScreen();
        soundOn = false;
        isGameOn = false;
    }

    characterIsSleepingWalkingStaying() {
        //Czemu to tu jest? on idze do word i sobie szuka pomimo ze to nie extends world.
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
            this.characterIsSleeping = false;
            this.sleepAgain();
        } else if (this.world.keyboard.D) {
            if (this.counterBottle != 0) {
                this.playAnimation(this.IMAGES_THROWING);
            }
            this.characterIsSleeping = false;
            this.sleepAgain();
        } else {
            this.characterIsSleepingStaying();
        }
    }

    characterIsSleepingStaying() {
        if (this.characterIsSleeping) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            soundManager.playSound("sleep");
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    characterIsHurting() {
        this.playAnimation(this.IMAGES_HURT);
        soundManager.playSound("pepeHit");
    }

    characterIsJumpingAnimation() {
        if (this.speedY < 0) {
            this.playAnimation(this.IMAGES_JUMPING_DOWN, false);
        } else {
            this.playAnimation(this.IMAGES_JUMPING_UP, false);
        }
    }

    sleepAgain() {
        this.cancelSleep();
        this.sleepTimeout = setTimeout(() => {
            this.characterIsSleeping = true;
        }, 5000);
    }

    cancelSleep() {
        if (this.sleepTimeout !== null) {
            clearTimeout(this.sleepTimeout);
            this.characterIsSleeping = false;
        }
    }

    displayGameOverSoundOff() {
        if (soundOn) {
            this.soundLost.play();
        }
    }

    displayGameOverScreen() {
        gameOverScreen.classList.remove("d-none");
        buttonsTop.classList.add("buttons-top-now-show");
        buttonsBottom.classList.add("buttons-bottom-now-show");
        youWonScreen.classList.add("d-none");
        playAgainButtonYouWon.classList.add("d-none");
    }
}
