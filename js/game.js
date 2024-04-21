let canvas;
let world;
let keyboard = new Keyboards();


const startGame = document.querySelector('.start-button')
const resetGame = document.querySelector('.reset-button')


// startGame.addEventListener('click', () => {
//     document.querySelector('.start').classList.add('d-none');
//     document.querySelector('.start-button').classList.add('d-none')
//     canvas = document.getElementById('canvas');
//     world = new World(canvas, keyboard);
// })

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}