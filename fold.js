"use strict";

if(typeof exports === 'undefined'){
    var exports = window.fold = {};
}

(function ($f) {

    var isEmpty = function (arr) {
        return typeof arr === 'undefined' || arr.length === 0;
    };

    var hdtl = function (arr) {
        // Check if array is not empty
        return {
            'hd': arr[0],
            'tl': arr.slice(1)
        };
    };

    var add = function (a, b) {
        return a + b;
    };

    $f.test = function () {
        return 'hello';
    };

    $f.foldL = function _foldL (arr, f, init) {
        if (isEmpty(arr)) {
            return init;
        }
        else {
            var p = hdtl(arr);
            return f(_foldL(p.tl, f, init), p.hd);
        }
    };

    $f.size = function (arr) {

    };

    $f.sum = function (arr) {
        return this.foldL(arr, add, 0);
    };

    $f.forEach = function (arr) {

    };

    $f.map = function (arr) {

    };

    $f.filter = function (arr) {

    };

})(typeof exports === 'undefined'? window.fold = {} : exports);