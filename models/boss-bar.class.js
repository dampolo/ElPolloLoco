class BossStatusbars extends MovableObject {
    IMAGES_HEALTH_BOSS_BARS = [
        "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH_BOSS_BARS);
        this.setPercentage(100);
        this.x = 550;
        this.y = 60;
        this.height = 40;
        this.width = 160;
        this.percentage;
    }

    /**
     * Sets the health percentage of the boss and updates its image accordingly.
     * @param {number} percentage - The health percentage of the boss.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        // Determine the path of the boss image based on the health percentage
        let path = this.IMAGES_HEALTH_BOSS_BARS[this.resolveImageIndex()];
        // Update the boss image using the image cache
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the boss image based on its health percentage.
     * @returns {number} The index of the boss image to be used.
     */
    resolveImageIndex() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
