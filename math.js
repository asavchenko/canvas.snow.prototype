    random = function(n) {
        return Math.floor((Math.random()*n) + 1);
    };

    signum = function(x) {
        return (x >= 0) ? 1 : -1;
    };

    srandom = function(n) {
        if (random(2) == 1) {
            return random(n);
        } 
        
        return -random(n);
    };
