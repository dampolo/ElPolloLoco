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
        right: 30,
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
        this.speed = 10;
        this.height = 250;
        this.width = 100;
        this.characterIsDead = true;
        this.characterIsDeadSound = true;
        this.applyGravity();
        this.counterCoint = 0;
        this.counterBottle = 0;
        this.maxCounterBottle = 6;
        this.maxEnergy = 300;
        this.energy = 300;
        this.characterIsSleeping = true;
        this.sleepTimeout = null;
    }

    /**
     * Animates the character and updates game state periodically.
     * - Pauses the walking sound.
     * - Checks if the game is on, character is dead, or if the character is moving.
     * - Updates the camera position based on the character's movement.
     * - Checks and handles character death animation if the character is dead.
     */

    animate() {
        setInterval(() => {
            soundManager.pauseSound("walk");

            if (isGameOn === false) {
                return;
            }

            if (this.isDead()) {
                return;
            }

            this.characterIsMoving();

            // Update camera position based on character movement
            this.world.camera_x = -this.x + 85;
        }, 1000 / 60);

        this.characterIsDeadOrHit();

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD, false);

                setTimeout(() => {
                    this.currentImage = this.IMAGES_DEAD.length - 1;
                }, 300);
            }
        }, 100);
    }

    /**
     * Handles character movement based on keyboard input.
     * - If the right arrow key is pressed and the character is within level bounds, initiate moving right.
     * - If the left arrow key is pressed and the character is within level bounds, initiate moving left.
     * - If the spacebar is pressed and the character is on the ground, initiate jumping.
     * - If the spacebar is pressed, reset character animation.
     */
    characterIsMoving() {
        // If the right arrow key is pressed and character is within level bounds, move right
        if (
            this.world.keyboard.RIGHT &&
            this.x < this.world.level.level_end_x
        ) {
            soundManager.pauseSound("sleep");
            this.characterIsMovingRight();
        }

        // If the left arrow key is pressed and character is within level bounds, move left
        if (this.world.keyboard.LEFT && this.x > -1500) {
            soundManager.pauseSound("sleep");
            this.characterIsMovingLeft();
        }

        // If the spacebar is pressed and character is on the ground, initiate jumping
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            soundManager.pauseSound("sleep");
            this.characterIsJumping();
        }

        // If the spacebar is pressed, reset character animation
        if (this.world.keyboard.SPACE) {
            soundManager.pauseSound("sleep");
            this.resetAnimation();
        }
    }

    /**
     * Checks and updates the character's state periodically.
     * Checks if the game is on and updates the character's state accordingly:
     * - Checks if the character is dead and handles game over.
     * - Checks if the character is hurt and initiates the hurting animation.
     * - Checks if the character is jumping or falling and initiates the corresponding animation.
     * - Otherwise, handles sleeping, walking, or staying idle animation.
     */
    characterIsDeadOrHit() {
        setInterval(() => {
            if (isGameOn === false) {
                return;
            }
            this.characterDead();

            if (this.isHurt()) {
                this.characterIsHurting();
            } else if (this.isAboveGround()) {
                this.characterIsJumpingAnimation();
            } else {
                this.characterIsSleepingWalkingStaying();
            }
        }, 50);
    }

    /**
     * Checks if the character is dead and handles game over accordingly.
     * If the character is dead and the death animation hasn't played yet:
     * - Plays the death sound.
     * - Displays the game over screen.
     * - Plays the lost sound.
     * - Shows the play again button for losing after a delay.
     * @returns {void}
     */
    characterDead() {
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
    }

    /**
     * Initiates the character moving right action and plays the walking sound.
     * Performs the right movement, sets the 'otherDirection' flag to false, and plays the walk sound.
     */
    characterIsMovingRight() {
        // Move the character right
        this.moveRight();
        this.otherDirection = false;
        soundManager.playSound("walk");
    }

    /**
     * Initiates the character moving left action and plays the walking sound.
     * Performs the left movement, sets the 'otherDirection' flag to true, and plays the walk sound.
     */
    characterIsMovingLeft() {
        this.moveLeft();
        this.otherDirection = true;
        soundManager.playSound("walk");
    }

    /**
     * Initiates the character jumping action and plays the jumping sound.
     * Resets sleeping state and sleep timeout, performs the jump animation, and plays the jump sound.
     */
    characterIsJumping() {
        // Reset sleeping state and sleep timeout
        this.characterIsSleeping = false;
        this.sleepAgain();
        // Perform the jump action
        this.jump();
        // Play the jump sound
        soundManager.playSound("jump");
    }

    soundLost = new Audio("./audio/lost.mp3");

    /**
     * Displays the game over screen and sound, and updates game state.
     * Stops all sounds if sound is on, displays the game over screen, turns off sound, and sets game state to off.
     */
    displayGameOver() {
        this.displayGameOverSoundOff();
        this.displayGameOverScreen();
        soundOn = false;
        isGameOn = false;
    }

    /**
     * Initiates the character animation based on its actions when it's sleeping, walking, or staying idle.
     * If the character is moving left or right, plays the walking animation and resets the sleep timeout.
     * If the character is throwing a bottle (using the 'D' key) and has bottles available, plays the throwing animation and resets the sleep timeout.
     * Otherwise, initiates the sleeping or staying idle animation.
     */
    characterIsSleepingWalkingStaying() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            // If character is moving left or right, play walking animation and reset sleep timeout
            this.playAnimation(this.IMAGES_WALKING);
            this.characterIsSleeping = false;
            this.sleepAgain();
        } else if (this.world.keyboard.D) {
            // If character is throwing a bottle, play throwing animation and reset sleep timeout if bottles are available
            if (this.counterBottle != 0) {
                this.playAnimation(this.IMAGES_THROWING);
            }
            this.characterIsSleeping = false;
            this.sleepAgain();
        } else {
            // If character is not moving or throwing, initiate sleeping or staying idle animation
            this.characterIsSleepingStaying();
        }
    }

    /**
     * Initiates the character sleeping or staying idle animation and plays the corresponding sound.
     * If the character is sleeping, plays the long idle animation and the "sleep" sound.
     * If the character is not sleeping, plays the regular idle animation.
     */
    characterIsSleepingStaying() {
        // Check if the character is sleeping
        if (this.characterIsSleeping) {
            // Play the long idle animation and the "sleep" sound
            this.playAnimation(this.IMAGES_LONG_IDLE);
            soundManager.playSound("sleep");
        } else {
            // Play the regular idle animation
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * Initiates the character hurting animation and plays the corresponding sound.
     */
    characterIsHurting() {
        // Play the hurting animation
        this.playAnimation(this.IMAGES_HURT);
        // Play the "pepeHit" sound
        soundManager.playSound("pepeHit");
    }

    /**
     * Initiates the character jumping animation based on the vertical speed.
     * Plays the appropriate animation sequence for jumping up or down.
     */
    characterIsJumpingAnimation() {
        // Check if the character is moving upwards
        if (this.speedY < 0) {
            // Play the jumping down animation
            this.playAnimation(this.IMAGES_JUMPING_DOWN, false);
        } else {
            // Play the jumping up animation
            this.playAnimation(this.IMAGES_JUMPING_UP, false);
        }
    }

    /**
     * Initiates the sleep timeout again.
     * Cancels any existing sleep timeout before setting a new one.
     */
    sleepAgain() {
        // Cancel any existing sleep timeout
        this.cancelSleep();
        // Set a new sleep timeout to trigger character sleeping after 5 seconds
        this.sleepTimeout = setTimeout(() => {
            this.characterIsSleeping = true;
        }, 5000);
    }

    /**
     * Cancels the sleep timeout if it's set.
     * Resets the character's sleeping state.
     */
    cancelSleep() {
        // If a sleep timeout is set, clear it and reset the character's sleeping state
        if (this.sleepTimeout !== null) {
            clearTimeout(this.sleepTimeout);
            this.characterIsSleeping = false;
        }
    }

    /**
     * Displays the game over sound if sound is on.
     */
    displayGameOverSoundOff() {
        // If sound is on, play the game over sound
        if (soundOn) {
            this.soundLost.play();
        }
    }

    /**
     * Displays the game over screen and hides elements related to winning.
     */
    displayGameOverScreen() {
        // Show the game over screen
        gameOverScreen.classList.remove("d-none");
        // Show the buttons and indicate they are now visible
        buttonsTop.classList.add("buttons-top-now-show");
        buttonsBottom.classList.add("buttons-bottom-now-show");
        // Hide the you won screen and play again button for winning
        youWonScreen.classList.add("d-none");
        playAgainButtonYouWon.classList.add("d-none");
    }
}
