class HealthStatusbars extends MovableObject {
    IMAGES_HEALTH_BARS = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH_BARS);
        this.setPercentage(100);
        this.x = 10;
        this.y = 10;
        this.height = 50;
        this.width = 120;
        this.percentage = 100;
    }

    /**
     * Sets the health percentage of the boss and updates its image accordingly.
     * @param {number} percentage - The health percentage of the boss.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        // Determine the path of the boss image based on the health percentage
        let path = this.IMAGES_HEALTH_BARS[this.resolveImageIndex()];
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
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
