class Chicken extends MovableObject {
    IMAGES_WALKING =[
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ]

    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    };

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]); //Musi to tak byc z tym super?
        this.loadImages(this.IMAGES_WALKING)
        this.loadImage(this.IMAGES_DEAD[0])
        this.y = 350;
        this.x = 500 + Math.random() * 3000;
        this.height = 80;
        this.width = 50;
        this.speed = 0.15 + Math.random() * 0.1
        this.energy = 5;
        this.animate()
    }

    animate() {
        setInterval(() => {
                if(!this.isDead()) {
                    this.moveLeft()
                }
            }, 1000 / 60);


        setInterval(() => {
            if(!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING) 
            } else {
                this.loadImage(this.IMAGES_DEAD[0])
            }
        }, 250);
    }
}