class Coins extends MovableObject {
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ]

    constructor(x, y) {
        super().loadImage(this.IMAGES_COINS[0]);

        this.loadImages(this.IMAGES_COINS)
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS)
        }, 250 + Math.random() * 100);
    }
    
}