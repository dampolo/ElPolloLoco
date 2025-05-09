class BottleBottom extends MovableObject {
    IMAGES_BOTTLE = [
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ];

    offset = {
        top: 5,
        left: 20,
        right: 10,
        bottom: 5,
    };

    constructor(x) {
        super();
        const randomIndex = this.displayRandomBottle();
        this.loadImage(this.IMAGES_BOTTLE[randomIndex]);
        this.x = x + Math.random() * 500;
        this.y = 375;
        this.height = 50;
        this.width = 50;
    }

    /**
     * Displays a random bottle image by selecting a random index from the IMAGES_BOTTLE array.
     * @returns {number} The random index selected.
     */
    displayRandomBottle() {
        const randomIndex = Math.floor(
            Math.random() * this.IMAGES_BOTTLE.length,
        );
        return randomIndex;
    }
}
