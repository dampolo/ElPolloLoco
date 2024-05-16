class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image() // this.img = document.getElementById('image') <img id="image" src>
        this.img.src = path
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // drawFrame(ctx) {
    //     if(this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coins || this instanceof ChickenBaby) {
    //         ctx.beginPath();
    //         ctx.lineWidth = '2';
    //         ctx.strokeStyle = 'blue';
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();

    //         ctx.beginPath();
    //         ctx.lineWidth = '1';
    //         ctx.strokeStyle = 'red';
    //         ctx.rect(this.x + this.offset.left,
    //             this.y + this.offset.top,
    //             this.width - this.offset.right - this.offset.left,
    //             this.height - this.offset.bottom - this.offset.top);
    //         ctx.stroke();
    //     }
    // }

    loadImages(arr){
        arr.forEach((path) => { 
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


}