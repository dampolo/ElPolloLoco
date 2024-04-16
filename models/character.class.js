class Character extends MovableObject {
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',        
    ]

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png' 
    ]

    IMAGES_JUMPING_UP = [
        // 'img/2_character_pepe/3_jump/J-31.png',
        // 'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
    ]
    
    IMAGES_JUMPING_DOWN = [
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',  
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ]

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ]

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]

    IMAGE_GAME_OVER = [
        'img/9_intro_outro_screens/game_over/game over.png'
    ]

    world;

    walkingSound = new Audio('./audio/walk.mp3')

    constructor() {
        super()
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING_UP);
        this.loadImages(this.IMAGES_JUMPING_DOWN);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);

        this.animate();
        this.x = -50;
        this.y = 180;
        this.speed = 10
        this.height= 250;
        this.width= 100;
        this.applyGravity();
        this.counterCoint = 0;
        this.counterBottle = 5;
        this.maxCounterBottle = 5;
        this.energy = 100; 
      }


    animate() {

        setInterval(() => {
            // this.walkingSound.pause()

            if(this.isDead()) {
                return;
            }

            if(this.world.keyboard.RIGHT && this.x <  this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                // this.walkingSound.play();
            }

            if(this.world.keyboard.LEFT && this.x > -1500) {
                this.moveLeft();
                this.otherDirection = true;
                // this.walkingSound.play();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }

            if (this.world.keyboard.SPACE) {
                this.resetAnimation();
            }

            this.world.camera_x = -this.x + 85;


            // if (this.x > 180) {
            // this.world.camera_x = -this.x + 180;
            // } else if (this.x < 50){
            // this.world.camera_x = -this.x + 50;
            // }


            // if (this.x >= 3360) {
            //     this.world.camera_x = -this.x + 180;
            // }


        }, 1000 / 60);
 

        setInterval(() => {
            if(this.isDead()) {
                return;
            }
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT)
            } else if(this.isAboveGround()) {
                if (this.speedY < 0 ) {
                    this.playAnimation(this.IMAGES_JUMPING_DOWN, false)
                } else {
                    this.playAnimation(this.IMAGES_JUMPING_UP, false); 
                } 
                // this.resetAnimation();
            } else {
                if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // Walk animation
                    this.playAnimation(this.IMAGES_WALKING); 
                } else {
                    this.playAnimation(this.IMAGES_IDLE)
                }
            }

        }, 50);


        setInterval(() => {
            if(this.isDead()) {
                // console.log(this.currentImage);
                this.playAnimation(this.IMAGES_DEAD, false);

                setTimeout(() => {
                    this.currentImage = this.IMAGES_DEAD.length -1
                    // this.loadImage(this.IMAGES_DEAD[this.IMAGES_DEAD.length -1])
                }, 300)
            }
        }, 100)
    }
}