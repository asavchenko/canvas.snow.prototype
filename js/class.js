if (!window.spero) {
    window.spero = {};
};
(function(s) {
'use strict';
s.Class = (function () {
    'use strict';
    var copyFromTo, create, argumentNames, extend;
    /**
     * 
     */ 
    copyFromTo = function (src, dst) {
        var o, x, p;
        o = {};
        for (x in src) {
            if ((typeof o[x] === 'undefined') || (o[x] !== src[x])) {
                dst[x] = src[x];
            }
        }

        if (document.all && !document.isOpera) {
            p = src.toString;
            if (typeof p === 'function' && p !== dst.toString && p !== o.toString && p !== '\nfunction toString() {\n    [native code]\n}\n') {
                dst.toString = src.toString;
            }
        }

        return dst;
    };
    
    /**
     * 
     */ 
    create = function (obj) {
        var f;
        obj = obj || function () {
        };

        f = function () {
            if (obj.initialize && typeof obj.initialize === 'function') {
                this.initialize = obj.initialize;
                this.initialize.apply(this, arguments);
                delete(this.initialize);
            }
        };

        copyFromTo(obj, f.prototype);
        f.prototype.$super = f.prototype.prototype;

        return f;
    };
    
    /**
     * 
     */ 
    argumentNames = function () {
        var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
            .replace(/\s+/g, '').split(',');
        return names.length === 1 && !names[0] ? [] : names;
    };
    
    /**
     * 
     */ 
    extend = function (Parent, obj) {
        var Child, updateSuperParam;
        /**
         * 
         */ 
        updateSuperParam = function () {
            var m, p, method;
            for (p in obj) if (typeof obj[p] === 'function') {
                m = obj[p];
                if (argumentNames.call(m)[0] === '$super') {
                    if (!Parent.prototype[p]) Parent.prototype[p] = function () {
                    };
                    obj[p] = function () {
                        var args = [];
                        args = copyFromTo(arguments, args);
                        args.unshift(Parent.prototype[p].bind(this));
                        m.apply(this, args);
                    };
                }
            }
        };
        /**
         * 
         */ 
        Child = function () {
            var args;
            if (obj.initialize && typeof obj.initialize === 'function') {
                this.initialize = obj.initialize;
                if (argumentNames.call(obj.initialize)[0] === '$super') {
                    args = [];
                    args = copyFromTo(arguments, args);
                    args.unshift(Parent.prototype.initialize.bind(this));
                    this.initialize.apply(this, args);
                } else {
                    this.initialize.apply(this, arguments);
                }
            } else {
                Parent.prototype.initialize.apply(this, arguments);
            }
        };
        var F = function () {
        };
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
        Child.prototype.$super = Parent.prototype;
        updateSuperParam.call(Child);
        copyFromTo(obj, Child.prototype);
        return Child;
    };

    return {
        create: create,
        extend: extend
    };
})();
})(window.spero);
