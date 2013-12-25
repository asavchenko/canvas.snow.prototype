if (!window.spero) {
    window.spero = {};
}
(function(s) {
'use strict';
var random,signum, srandom;
/**
 * 
 */
random = function(n) {
    return Math.floor((Math.random()*n) + 1);
};


/**
 * 
 */ 
signum = function(x) {
    return x >= 0 ? 1 : -1;
};


/**
 * 
 */ 
srandom = function(n) {
    if (random(2) === 1) {
        return -random(n);
    }

    return random(n);
};
s.math = {
    srandom: srandom,
    random: random,
    signum: signum
};
})(window.spero);

(function (s, document) {
'use strict';
s.Canvas = s.Class.create({
    /**
     * @constructor
     */
    initialize: function(id) {
        var i, j;
        this.main = document.getElementById(id);
        this.screenWidth = this.main.width;
        this.screenHeight = this.main.height;
        this.color = {r: 0, g: 0, b: 0};
        this.ctxMain = this.main.getContext('2d');
        this.imgData = this.ctxMain.createImageData(this.screenWidth, this.screenHeight);
        i = this.screenWidth;
        while (i--) {
            j = this.screenHeight;
            while (j--) {
                this.putPixel(i, j);
            }
        }
        this.clearScreen();
        this.showScreen();
    },
    
    /**
     * 
     */
    clearScreen: function() {
        this.ctxMain.fillStyle = '#000000';
        this.ctxMain.fillRect(0, 0, this.screenWidth, this.screenHeight);
    },

    /**
     * 
     */ 
    putPixel: function(x, y) {
        var index;
        if (x < 0 || x >= this.screenWidth) {
            return;
        }
        if (y < 0 || y >= this.screenHeight) {
            return;
        }
         index = (x + y * this.imgData.width) * 4;
        this.imgData.data[index] = this.color.r;
        this.imgData.data[index+1] = this.color.g;
        this.imgData.data[index+2] = this.color.b;
        this.imgData.data[index+3] = 255;
    },

    /**
     * 
     */ 
    showScreen: function() {
        this.ctxMain.putImageData(this.imgData, 0, 0);
    },

    /**
     * 
     */
    setColor: function(r, g, b) {
        this.color.r = r;
        this.color.g = g;
        this.color.b = b;
    }
});
})(window.spero, document);


(function(s) {
'use strict';
var random = s.math.random,
    srandom = s.math.srandom;
s.Snowflake = s.Class.create({
    /**
     * @constructor
     */ 
    initialize: function (canvas, app) {
        this.canvas = canvas;
        this.app = app;
        this.reset();
    },

    /**
     * 
     */ 
    move: function() {
        this.hide();
        this.colorLogic();
        this.directionLogic();
        this.moveLogic();
        this.show();
    },
    
    /**
     * 
     */ 
    colorLogic: function() {
        if (this.color > 0) {
            if (random(5) === 2) {
                this.color--;
            }
        } else {
            this.y = -random(50);
            this.color = random(255);
        }
    },

    /**
     * 
     */ 
    directionLogic: function() {
        if (this.dir > 0 && random(150) === 2) {
            this.dir--;
        }

        if (this.dir < 0 && random(150) === 2) {
            this.dir++;
        }
        
        if (this.dir === 0) {
            if (this.app.dir > 0) {
                this.dir = this.app.dir + random(this.app.dir);
            } else {
                this.dir = this.app.dir - random(1 - this.app.dir);
            }
        }
    },

    /**
     * 
     */ 
    moveLogic: function() {
        if (this.y + this.speed < this.canvas.screenHeight) {
            this.y += this.speed;
            this.x += this.dir;
        } else {
            this.reset();
        }
    },

    reset: function() {
        this.x = random(this.canvas.screenWidth);
        this.y = -random(500);
        this.type = random(5);
        this.initType();
        this.speed = random(5);
        this.dir = srandom(1);
        this.color = random(255);
    },
    
    /**
     * 
     */ 
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

    /**
     * 
     */ 
    hide: function() {
        this.draw({'r': 0, 'g': 0, 'b': 0});
    },

    /**
     * 
     */ 
    show: function() {
        this.draw({'r': this.color, 'g': this.color, 'b': this.color});
    },

    /**
     * 
     */ 
    draw: function(color) {
        var i, j;
        this.canvas.setColor(color.r, color.g, color.b);
        i = this.type;
        while (i--) {
            j = this.type;
            while (j--) {
                if (this.shape[i][j]) {
                    this.canvas.putPixel(this.x + i, this.y + j);
                }  
            }
        }
    }
});
})(window.spero);
(function(s, window) {
'use strict';
var canvas = new s.Canvas('myCanvas'),
    snowArr = [],
    app = {'dir': 5},
    random = s.math.random,
    srandom = s.math.srandom,
    i = 2000;
while(i--) {
    snowArr[i] = new s.Snowflake(canvas, app);
}
window.setInterval(function() {
    var i = 2000;
    if (random(150) == 25) {
        app.dir = srandom(5); 
    }
    while(i--) {
        snowArr[i].move();
    }
    canvas.showScreen();
},30);
})(window.spero, window);