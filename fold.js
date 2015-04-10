"use strict";

if(typeof exports === 'undefined'){
    var exports = window.fold = {};
}

(function ($f) {

    var isEmpty = function (arr) {
        return typeof arr === 'undefined' || arr.length === 0;
    };

    var destructor = function (arr) {
        // Check if array is not empty
        return {
            'hd': arr[0],
            'tl': arr.slice(1)
        };
    };

    var add = function (a, b) {
        return a + b;
    };

    var fill = function (e, n) {
        var arr = [];
        for (var i = 0; i < n; i++) {
            arr.push(e);
        }
        return arr;
    };

    $f.foldL = function _foldL (arr, f, init) {
        if (isEmpty(arr)) {
            return init;
        }
        else {
            var p = destructor(arr);
            return f(_foldL(p.tl, f, init), p.hd);
        }
    };

    $f.foldR = function _foldR (arr, f, init) {
        if (isEmpty(arr)) {
            return init;
        }
        else {
            var p = destructor(arr);
            return _foldR(p.tl, f, f(init, p.hd));
        }
    };

    $f.size = function (arr) {
        return $f.foldL(arr, function (a, x) { return a + 1; }, 0);
    };

    $f.sum = function (arr) {
        return $f.foldL(arr, add, 0);
    };

    $f.forEach = function (arr, f) {
        return $f.foldR(arr, function (a, x) { f(x); }, undefined);
    };

    $f.map = function (arr, f) {
        return $f.foldR(arr, function (a, x) {
            a.push(f(x));
            return a;
        }, []);
    };

    $f.filter = function (arr, f) {
        return $f.foldR(arr, function (a, x) {
            if (f(x)) {
                a.push(x);
            }

            return a;
        }, []);
    };

    $f.drop = function (arr, n) {
        var count = 1;

        return $f.foldR(arr, function (a, x) {
            if (count % n !== 0) {
                a.push(x);
            }
            count++;

            return a;
        }, []);
    };

    $f.take = function (arr, n) {
        var count = 1;

        return $f.foldR(arr, function (a, x) {
            if (count % n === 0) {
                a.push(x);
            }
            count++;

            return a;
        }, []);
    };

    $f.partition = function (arr, f) {
        return $f.foldR(arr, function (a, x) {

            if (f(x)) {
                a.T.push(x);
            }
            else {
                a.F.push(x);
            }

            return a;

        }, {'T': [], 'F': []});
    };

    $f.replicate = function (arr, n) {
        return $f.foldR(arr, function (a, x) {
            a.push(fill(x, n));

            return a;
        }, []);
    };

    $f.elimConsec = function (arr) {
        if (isEmpty(arr)) {
            return arr;
        }

        var cur = destructor(arr).hd,
            count = 0;

        return $f.foldR(arr, function (a, x) {
            if (count === 0) {
                a.push(x);
            }
            else {
                if (x !== cur) {
                    a.push(x);
                }
            }

            cur = x;
            count++;
            return a;
        }, []);
    };

    $f.max = function (arr) {

    };

    $f.min = function (arr) {

    };

})(typeof exports === 'undefined'? window.fold = {} : exports);

var f = require('./fold');
var n = f.elimConsec([]);

console.log(n);