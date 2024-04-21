class ThrowableObject extends MovableObject {
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
    bottom: 10
};

  constructor(x, y, value) {
    super()
    this.loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.IMAGES_BOTTLE);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    // this.value = value
    this.height = 50;
    this.width = 50;
    this.energy = 5;
    this.throw();
    this.animate();
  }

  throw() {
    this.speedY = 20;
    this.applyGravity();

    const direction = world.character.otherDirection;

    setInterval(() => {
      if(!direction) { //kierunek butelek w prawo
        if (!this.isDead()) {
          this.x += 25;
        }
      } else { //kierunek butelek w lewo
        if (!this.isDead()) {
          this.x -= 25;
        }
      }
    }, 50); //co 50 milisekund
  }

  animate() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
      } else {
        this.playAnimation(this.IMAGES_BOTTLE);
      }
    }, 50);
  }
}
