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

    animate() {
        this.stopFirstAnimation = setInterval(() => {
            if (this.characterArrived) {
                this.enterAlertState();
            }
        }, 250);
    }

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

    endbossStayingHurting() {
        if (!this.isHurt()) {
            this.playAnimation(this.IMAGES_STAYING);
        } else {
            this.playAnimation(this.IMAGES_HURT);
        }
    }

    stopEnterAlertState() {
        clearInterval(this.stopFirstAnimation);
    }

    stopStayingInterval() {
        clearInterval(this.stayingInterval);
    }

    endbossFaster() {
        this.speed = 0;
        this.x = this.x + 20;
        setTimeout(() => {
            this.speed = 25;
        }, 2000);
    }

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

    walkingBoss() {
        if (this.isHurt()) {
            this.walkingBossHurt();
        } else if (this.isDead()) {
            this.displayYouWon();
        } else if (this.isAttacking) {
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }

    walkingBossHurt() {
        this.endbossFaster();
        this.playAnimation(this.IMAGES_HURT);
    }

    soundWon = new Audio("./audio/won.mp3");

    displayYouWon() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            this.displayYouWonSoundOff();
            this.displayYouWonButton();
            this.displayYouWonScreen();
            soundOn = false;
            isGameOn = false;
        }, 400);
    }

    displayYouWonButton() {
        setTimeout(() => {
            playAgainButtonYouWon.classList.add("play-again-show");
        }, 500);
    }

    displayYouWonSoundOff() {
        if (soundOn) {
            this.soundWon.play();
        }
    }

    displayYouWonScreen() {
        youWonScreen.classList.remove("d-none");
        buttonsTop.classList.add("buttons-top-now-show");
        buttonsBottom.classList.add("buttons-bottom-now-show");
        gameOverScreen.classList.add("d-none");
        playAgainButtonYouLost.classList.add("d-none");
    }
}
