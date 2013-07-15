if (typeof window.Speroteck == 'undefined') {
    window.Speroteck = {};
}

Speroteck.Canvas = Class.create({
    main: {},

    off: {},

    screenWidth: 0,

    screenHeight: 0,

    color: {},

    imgData: {},

    ctxMain: {},

    ctxOff: {},

    doubleBufferOn: false,

    initialize: function(id) {
        this.main = $(id);
        this.screenWidth = this.main.width;
        this.screenHeight = this.main.height;
        this.color.r = 0;
        this.color.g = 0;
        this.color.b = 0;
        this.ctxMain = this.main.getContext('2d');
        if (this.doubleBufferOn) {
            this.off = document.createElement('canvas');
            this.off.width = this.screenWidth;
            this.off.height = this.screenHeight;
            this.ctxOff = this.off.getContext('2d');
            this.imgData = this.ctxOff.createImageData(this.screenWidth, this.screenHeight);
        } else {
            this.imgData = this.ctxMain.createImageData(this.screenWidth, this.screenHeight);
            for (var i=0; i<this.screenWidth; ++i) {
                for (var j=0; j< this.screenHeight; ++j) {
                    this.putPixel(i, j);
                }
            }
        }
        this.clearScreen();
        this.showScreen();
    },

    clearScreen: function() {
        if (this.doubleBufferOn) {
            this.ctxOff.fillStyle = '#000000';
            this.ctxOff.fillRect(0, 0, this.off.width, this.off.height);
        } else {
            this.ctxMain.fillStyle = '#000000';
            console.log(this);
            this.ctxMain.fillRect(0, 0, this.screenWidth, this.screenHeight);
        }
    },

    putPixel: function(x, y) {
        if (x < 0 || x >= this.screenWidth) {
            return;
        }
        if (y < 0 || y >= this.screenHeight) {
            return;
        }
        var index = (x + y*this.imgData.width)*4;
        this.imgData.data[index] = this.color.r;
        this.imgData.data[index+1] = this.color.g;
        this.imgData.data[index+2] = this.color.b;
        this.imgData.data[index+3] = 255;
    },

    showScreen: function() {
        if (this.doubleBufferOn) {
            this.ctxOff.putImageData(this.imgData, 0, 0);
            this.ctxMain.drawImage(this.off, 0, 0);
        } else {
            this.ctxMain.putImageData(this.imgData, 0, 0);
        }
    },

    setColor: function(r, g, b) {
        this.color.r = r;
        this.color.g = g;
        this.color.b = b;
    }
});
