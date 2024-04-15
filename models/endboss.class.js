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

  constructor() {
    super();
    this.loadImage(this.IMAGES_STAYING[0]);
    this.loadImages(this.IMAGES_STAYING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.y = 140;
    this.x = 3690;
    // this.x = 300;

    this.height = 300;
    this.width = 300;
    this.energy = 25;
    this.speed = 5;
    this.isWalking = false;
    this.isAttacking = false;
    this.turnOffStaying = false;
    this.animate();
  }

  isStayingBoss() {
    // bez this.stayingInterval niedziala poprawnie
    this.stayingInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_STAYING);
      // console.log("stay");
    }, 250);
  }

  isHurtBoss() {
    this.hurtInterval = setInterval(() => {
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        // console.log("hurt");
      }
    }, 500);
  }

  // ale to zakrecone
  stopStayingBoss() {
    clearInterval(this.stayingInterval);
    clearInterval(this.hurtInterval);
  }

  endbossSlower() {
    this.speed = 0;
    setTimeout(() => {
      this.speed = 5;
    }, 2000);
  }

  animate() {

	this.isStayingBoss();
	
    setInterval(() => {
      if (this.isWalking) {
        setTimeout(() => {
          this.stopStayingBoss();
          this.playAnimation(this.IMAGES_WALKING);
          this.moveLeft();
          // console.log("walk");
          if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.endbossSlower();
            // console.log("hurt");
          } else if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
          }
        }, 5000);
      }
    }, 250);

    //Tutaj jestem
  }
}
