if (typeof window.Speroteck == 'undefined') {
        // Initiliaze namespace if it isn't defined yet
    window.Speroteck = {};
}


Speroteck.Snow = Class.create({
    x: 0,

    y: 0,

    type: 0,

    shape: [],

    speed: 1,

    color: 0,

    dir: 1,

    canvas: {},

    app: {},

    initialize: function (canvas, app) {
        this.canvas = canvas;
        this.app = app;
        this.reset();
    },

    move: function() {
        this.hide();
        this.colorLogic();
        this.directionLogic();
        this.moveLogic();
        this.show();
    },
    
    colorLogic: function() {
        if (this.color > 0) {
            if (random(5) == 2) {
                this.color--;
            }
        } else {
            this.y = -random(50);
            this.color = random(255);
        }
    },

    directionLogic: function() {
        if (this.dir > 0 && random(150) == 2) {
            this.dir--;
        }

        if (this.dir < 0 && random(150) == 2) {
            this.dir++;
        }
        
        if (this.dir == 0) {
            if (this.app.dir > 0) {
                this.dir = this.app.dir + random(this.app.dir);
            } else {
                this.dir = this.app.dir - random(1-this.app.dir);
            }
        }
    },

    moveLogic: function() {
        if (this.y + this.speed < this.canvas.screenHeight) {
            this.y += this.speed;
            this.x += this.dir;
            if (this.x < 0) {
                this.x = -random(50);
            } else if (this.x > this.canvas.screenWidth) {
                this.x = this.canvas.screenWidth + random(50);
            }
        } else {
            this.reset();
        }
    },

    reset: function() {
        this.x = random(this.canvas.screenWidth);
        this.y = -random(50);
        this.type = random(5);
        this.initType();
        this.speed = random(5);
        this.dir = srandom(1);
        this.color = random(255);
    },
    
    initType: function() {
        switch(this.type) {
            case 1:
                this.shape = [1];
                break;
            case 2:
                this.shape = [[1, 0],
                              [0, 1]];
                break;
            case 3:
                this.shape = [[1, 0, 1],
                              [0, 1, 0],
                              [1, 0, 1]];
                break;
            case 4:
                this.shape = [[1, 0, 0, 1],
                              [0, 1, 1, 0],
                              [0, 1, 1, 0],
                              [1, 0, 0, 1]];
                break;
            case 5:
                this.shape = [[1, 0, 1, 0, 1],
                              [0, 1, 0, 1, 0],
                              [0, 0, 1, 0, 0],
                              [0, 1, 0, 1, 0],
                              [1, 0, 1, 0, 1]];
                break;
            default:
                this.shape = [1];
        }
    },

    hide: function() {
        this.draw({'r': 0, 'g': 0, 'b': 0});
    },

    show: function() {
        this.draw({'r': this.color, 'g': this.color, 'b': this.color});
    },

    draw: function(color) {
        this.canvas.setColor(color.r, color.g, color.b);
        for (var i=0; i<this.type; ++i) {
            for (var j=0; j<this.type; ++j) {
                if (this.shape[i][j]) {
                    this.canvas.putPixel(this.x + i, this.y + j);
                }
            }
        }
    }
});

