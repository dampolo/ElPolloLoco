class ThrowableObject extends MovableObject {
    // newWorld = new World

    IMAGES_BOTTLE = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    IMAGES_BOTTLE_SPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
    };

    constructor(x, y) {
        super();
        this.loadImage(
            "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        );
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.energy = 5;
        this.bottleIsSplashingOnce = true;
        this.bottleIsFlyingOnce = true;

        this.throw();
        this.animate();
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        const direction = world.character.otherDirection;

        setInterval(() => {
            if (isGameOn === false) {
                return;
            }
            if (!direction) {
                //kierunek butelek w prawo
                this.flayingBottleToTheRight();
            } else {
                //kierunek butelek w lewo
                this.flayingBottleToTheLeft();
            }
        }, 50); //co 50 milisekund
    }

    flayingBottleToTheRight() {
        if (!this.isDead()) {
            this.x += 25;
        }
    }

    flayingBottleToTheLeft() {
        if (!this.isDead()) {
            this.x -= 25;
        }
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.splashingBottle();
            } else {
                this.flayingBottle();
            }
        }, 50);
    }

    splashingBottle() {
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        if (this.bottleIsSplashingOnce) {
            soundManager.playSound("bottleCrash");
        }
        this.bottleIsSplashingOnce = false;
    }

    flayingBottle() {
        this.playAnimation(this.IMAGES_BOTTLE);
        if (this.bottleIsFlyingOnce) {
            soundManager.playSound("flyingBottle");
        }
        this.bottleIsFlyingOnce = false;
    }
}
