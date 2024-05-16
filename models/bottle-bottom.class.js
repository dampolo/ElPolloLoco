class BottleBottom extends MovableObject {
    IMAGES_BOTTLE = [
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ];

    constructor(x) {
        super();
        const randomIndex = this.displayRandomBottle();
        this.loadImage(this.IMAGES_BOTTLE[randomIndex]);
        this.x = x + Math.random() * 500;
        this.y = 375;
        this.height = 50;
        this.width = 50;
    }

    displayRandomBottle() {
        const randomIndex = Math.floor(
            Math.random() * this.IMAGES_BOTTLE.length,
        );
        return randomIndex;
    }
}
