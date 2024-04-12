let canvas;
let world;
let keyboard = new Keyboards();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}
