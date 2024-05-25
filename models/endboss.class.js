class Endboss extends MovableObject {
    IMAGES_STAYING = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    IMAGES_HURT = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    IMAGES_DEAD = [
        "img/4_enemie_boss_chicken/5_dead/G24.png",
        "img/4_enemie_boss_chicken/5_dead/G25.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    IMAGES_WALKING = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    IMAGES_ATTACK = [
        "img/4_enemie_boss_chicken/3_attack/G13.png",
        "img/4_enemie_boss_chicken/3_attack/G14.png",
        "img/4_enemie_boss_chicken/3_attack/G15.png",
        "img/4_enemie_boss_chicken/3_attack/G16.png",
        "img/4_enemie_boss_chicken/3_attack/G17.png",
        "img/4_enemie_boss_chicken/3_attack/G18.png",
        "img/4_enemie_boss_chicken/3_attack/G19.png",
        "img/4_enemie_boss_chicken/3_attack/G20.png",
    ];

    offset = {
        top: 40,
        left: 40,
        right: 20,
        bottom: 20,
    };

    constructor() {
        super();
        this.loadImage(this.IMAGES_STAYING[0]);
        this.loadImages(this.IMAGES_STAYING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.y = 140;
        this.x = 3650;
        this.height = 300;
        this.width = 300;
        this.energy = 25;
        this.speed = 50;
        this.characterArrived = false;
        this.isAttacking = false;
        this.directionLeft = true;
        this.animate();
    }

    /**
     * Initiates the animation sequence.
     * Sets an interval to check if the character has arrived.
     * If the character has arrived, initiates the alert state of the end boss.
     */
    animate() {
        this.stopFirstAnimation = setInterval(() => {
            if (this.characterArrived) {
                this.enterAlertState();
            }
        }, 250);
    }

    /**
     * Initiates the alert state of the end boss.
     * Stops any existing interval for entering the alert state.
     * Sets an interval for staying animation, checking if the game is on.
     * Initiates the walking behavior of the boss after a delay.
     */
    enterAlertState() {
        this.stopEnterAlertState();
        this.stayingInterval = setInterval(() => {
            if (isGameOn === false) {
                return;
            }
            this.endbossStayingHurting();
        }, 250);

        setTimeout(() => {
            this.endbossWalking();
        }, 3000);
    }

    /**
     * Handles the staying animation of the end boss, considering whether it's hurting.
     * Plays the staying animation if the boss is not hurting.
     * Plays the hurt animation if the boss is hurting.
     */
    endbossStayingHurting() {
        if (!this.isHurt()) {
            this.playAnimation(this.IMAGES_STAYING);
        } else {
            this.playAnimation(this.IMAGES_HURT);
        }
    }

    /**
     * Stops the interval used for entering the alert state of the end boss.
     */
    stopEnterAlertState() {
        clearInterval(this.stopFirstAnimation);
    }

    /**
     * Stops the interval used for staying idle animation of the end boss.
     */
    stopStayingInterval() {
        clearInterval(this.stayingInterval);
    }

    /**
     * Temporarily increases the speed of the end boss.
     * - Stops the boss's current movement.
     * - Moves the boss to the right by 20 units.
     * - Restores the boss's speed after a delay of 2000 milliseconds (2 seconds).
     */
    endbossFaster() {
        this.speed = 0;
        this.x = this.x + 20;
        setTimeout(() => {
            this.speed = 25;
        }, 2000);
    }

    /**
     * Initiates the walking behavior of the end boss.
     * The boss alternates between moving left and right while playing the walking animation.
     * Stops animation if the game is off.
     */
    endbossWalking() {
        setInterval(() => {
            if (isGameOn === false) {
                return;
            }
            this.stopStayingInterval();
            this.y = this.y;
            this.playAnimation(this.IMAGES_WALKING);
            if (this.otherDirection) {
                this.moveRight();
            } else {
                this.moveLeft();
            }

            this.walkingBoss();
        }, 250);
    }

    /**
     * Handles the behavior of the walking boss.
     * If the boss is hurt, initiates the hurt animation.
     * If the boss is dead, initiates the "You Won" sequence.
     * If the boss is attacking, plays the attack animation.
     */
    walkingBoss() {
        if (this.isHurt()) {
            this.walkingBossHurt();
        } else if (this.isDead()) {
            this.displayYouWon();
        } else if (this.isAttacking) {
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }

    /**
     * Initiates the hurt animation for the walking boss and increases its speed.
     */
    walkingBossHurt() {
        this.endbossFaster();
        this.playAnimation(this.IMAGES_HURT);
    }

    soundWon = new Audio("./audio/won.mp3");

    /**
     * Initiates the "You Won" sequence.
     * Plays the dead animation of the character and then displays the "You Won" screen, sound, and button.
     * Updates game and sound states accordingly.
     */
    displayYouWon() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            this.displayYouWonSoundOff();
            this.displayYouWonButton();
            this.displayYouWonScreen();
            // Turn off sound and set game state to off
            soundOn = false;
            isGameOn = false;
        }, 400);
    }

    /**
     * Displays the play again button for winning after a delay.
     */
    displayYouWonButton() {
        setTimeout(() => {
            playAgainButtonYouWon.classList.add("play-again-show");
        }, 500);
    }

    /**
     * Displays the "You Won" sound if sound is on.
     */
    displayYouWonSoundOff() {
        if (soundOn) {
            this.soundWon.play();
        }
    }

    /**
     * Displays the "You Won" screen and hides elements related to losing.
     */
    displayYouWonScreen() {
        youWonScreen.classList.remove("d-none");
        buttonsTop.classList.add("buttons-top-now-show");
        buttonsBottom.classList.add("buttons-bottom-now-show");
        gameOverScreen.classList.add("d-none");
        playAgainButtonYouLost.classList.add("d-none");
    }
}
