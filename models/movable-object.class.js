 class MovableObject extends DrawableObject {
    speed = 0.15
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }


    isAboveGround(){
        if(this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 165;
        }
    }

    // Bessere Formel zur Kollisionsberechnung (Genauer)
    isColliding(mo) {
        return  this.x + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x + mo.width &&
                this.y < mo.y + mo.height;
    }

    hit() {
        this.energy -= 5;
        if(this.energy <= 0) {
            this.currentImage = 0
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //Difference in ms
        timepassed = timepassed / 1000; //Difference in s.
        return timepassed < 1;
    }

    isDead() {
        return this.energy === 0;
    }

    playAnimation(images, infinityLoop = true) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        if(infinityLoop) {
            this.currentImage++
        } else if (this.currentImage <= images.length) {
            this.currentImage++
        }
    }

    resetAnimation() {
        this.currentImage = 0;
    }

    moveRight() {
        this.x += this.speed;
    }

    //FPS - frames per second
    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 30;
        }
    
}