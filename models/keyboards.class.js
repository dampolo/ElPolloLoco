class Keyboards {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    constructor() {
        this.buttonPressEvents();
        this.keyPressEvents();

    }

    buttonPressEvents() {
        document.querySelector('.left').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true
        })
        
        document.querySelector('.left').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false
        })
        
        document.querySelector('.right').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true
        })
        
        document.querySelector('.right').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false
        })
        
        document.querySelector('.up').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true
        })
        
        document.querySelector('.up').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false
        })
        
        document.querySelector('.bottle').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true
        })
        
        document.querySelector('.bottle').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false
        })
    }

    keyPressEvents() {
        window.addEventListener('keydown', (e) => { 
            if(e.keyCode === 39) {
                this.RIGHT = true;
            }
        
            if(e.keyCode === 37) {
                this.LEFT = true;
            }
        
            if(e.keyCode === 38) {
                this.UP = true;
            }
        
            if(e.keyCode === 40) {
                this.DOWN = true;
            }
        
            if(e.keyCode === 32) {
                e.preventDefault()
                this.SPACE = true;
            }
            if(e.keyCode === 68) {
                this.D = true;
            }
        });
        
        window.addEventListener('keyup', (e) => {
            if(e.keyCode === 39) {
                this.RIGHT = false;
            }
        
            if(e.keyCode === 37) {
                this.LEFT = false;
            }
            
            if(e.keyCode === 38) {
                this.UP = false;
            }
        
            if(e.keyCode === 40) {
                this.DOWN = false;
            }
        
            if(e.keyCode === 32) {
                this.SPACE = false;
            }
        
            if(e.keyCode === 68) {
                this.D = false;
            }
        });
    }
}