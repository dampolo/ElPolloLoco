class BackgroundObject extends MovableObject{
    constructor(imagePath, x, y, z) {
        super().loadImage(imagePath);
        this.height = 480;
        this.width = 2000;
        this.x = x;
        this.y = 0;
    }
}