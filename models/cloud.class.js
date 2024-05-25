class Cloud extends MovableObject {
    CLOUD_IMAGES = ["img/5_background/layers/4_clouds/1.png"];

    constructor(y) {
        super().loadImage(this.CLOUD_IMAGES);
        this.loadImages(this.CLOUD_IMAGES);
        this.y = y + Math.random() * 50;
        this.x = -1000 + Math.random() * 5000;
        this.height = 200;
        this.width = 500;
        this.speed = 0.1 + Math.random() * 0.1;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (isGameOn === false) {
                return;
            }

            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (isGameOn === false) {
                return;
            }

            this.playAnimation(this.CLOUD_IMAGES);
        }, 250);
    }
}
