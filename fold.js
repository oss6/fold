"use strict";

if(typeof exports === 'undefined'){
    var exports = window.fold = {};
}

// === fold.js ===
// A collection of useful functions using exclusively the 'fold'/'reduce' pattern
// Ossama Edbali

(function ($f) {

    // ==========================
    // === INTERNAL FUNCTIONS ===
    // ==========================

    var isEmpty = function (arr) {
        return typeof arr === 'undefined' || arr.length === 0;
    };

    var isArray = function (arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    };

    // Array destructor (head and list) --> assumes that arr is not empty
    var dctor = function (arr) {
        return {
            'hd': arr[0],
            'tl': arr.slice(1)
        };
    };

    var add = function (a, b) { return a + b; };

    var identity = function (x) { return x; };

    var fill = function (e, n) {
        var arr = [];
        for (var i = 0; i < n; i++) {
            arr.push(e);
        }
        return arr;
    };

    var compose = function (f, g) {
        return function (x) {
            return f(g(x));
        };
    };

    var insert = function _insert (arr, x) {
        if (isEmpty(arr)) {
            return [x];
        }
        else {
            var p = dctor(arr),
                y = p.hd,
                ys = p.tl,
                newArr;

            if (x < y) {
                newArr = [x, y];
                newArr.pushArray(ys);
            }
            else {
                newArr = [y];
                newArr.pushArray(_insert(ys, x));
            }

            return newArr;
        }
    };

    Array.prototype.pushArray = function () {
        var toPush = this.concat.apply([], arguments);
        for (var i = 0, len = toPush.length; i < len; ++i) {
            this.push(toPush[i]);
        }
    };

    // ========================
    // === PUBLIC INTERFACE ===
    // ========================

    /**
     * Higher-order function applied to arrays, based on the concept of accumulators
     * (i.e. return a value from the accumulation). Left associative, tail recursive.
     * @param {Array} arr - Array to work on
     * @param {Function} f - Function to apply ('a -> 'b -> 'a)
     * @param {*} init - Initial value
     * @returns {*}
     */
    $f.foldL = function _foldL (arr, f, init) {
        if (isEmpty(arr)) {
            return init;
        }
        else {
            var p = dctor(arr);
            return _foldL(p.tl, f, f(init, p.hd));
        }
    };

    /**
     * Higher-order function applied to arrays, based on the concept of accumulators
     * (i.e. return a value from the accumulation). Right associative, not tail recursive.
     * @param {Array} arr - Array to work on
     * @param {Function} f - Function to apply ('a -> 'b -> 'a)
     * @param {*} init - Initial value
     * @returns {*} The accumulated value
     */
    $f.foldR = function _foldR (arr, f, init) {
        if (isEmpty(arr)) {
            return init;
        }
        else {
            var p = dctor(arr);
            return f(_foldR(p.tl, f, init), p.hd);
        }
    };

    /**
     * Applies the and operator to all the boolean expressions
     * @param {Array} arr Array of boolean expressions
     * @returns {Boolean}
     */
    $f.and = function (arr) {
        return $f.foldL(arr, function (a, x) {
            return a && x;
        }, true);
    };

    /**
     * Checks if a predicate is satisfied by any item
     * @param {Array} arr
     * @param {Function} f The predicate
     * @returns {Boolean}
     */
    $f.any = function (arr, f) {
        return $f.foldR(arr, function (a, x) {
            if (!a && f(x)) {
                a = true;
            }
            return a;
        }, false);
    };

    /**
     * Gets the average of a list of numbers
     * @param {Array} arr
     * @returns {number}
     */
    $f.average = function (arr) {
        return arr.length > 0 ? $f.sum(arr) / arr.length : null;
    };

    /**
     * Merge a list of functions into one function
     * @param {Array} arr Array of functions
     * @returns {Function}
     */
    $f.composition = function (arr) {
        return $f.foldR(arr, compose, identity);
    };

    /**
     * Counts the number of occurrences of an element
     * @param {Array} arr
     * @param {*} e The element to check
     * @returns {Number}
     */
    $f.count = function (arr, e) {
        return $f.foldR(arr, function (a, x) {
            return x === e ? a + 1 : a;
        }, 0);
    };

    /**
     * Drops every 'n' times from 'arr'
     * @param {Array} arr
     * @param {Number} n
     * @returns {Array} New array with the items deleted
     */
    $f.drop = function (arr, n) {
        var count = 1;

        return $f.foldL(arr, function (a, x) {
            if (count % n !== 0) {
                a.push(x);
            }
            count++;

            return a;
        }, []);
    };

    /**
     * Filter the array based on a given property
     * @param {Array} arr
     * @param {Function} f The property/predicate to filter on
     * @returns {Array} The filtered array
     */
    $f.filter = function (arr, f) {
        return $f.foldL(arr, function (a, x) {
            if (f(x)) {
                a.push(x);
            }

            return a;
        }, []);
    };

    /**
     * Flatten an array of arrays
     * @param {Array} arr Array of arrays
     * @param {Boolean} deep Whether to perform a 'deep flattening'
     * @returns {Array} The flattened array
     */
    $f.flatten = function _flatten (arr, deep) {
        if (deep === undefined) {
            deep = false;
        }

        return $f.foldL(arr, function (a, x) {
            a.pushArray(deep && isArray(x) ? _flatten(x) : x);
            return a;
        }, []);
    };

    /**
     * Performs a for loop
     * @param {Array} arr
     * @param {Function} f The action to apply
     */
    $f.forEach = function (arr, f) {
        return $f.foldL(arr, function (a, x) { f(x); }, undefined);
    };

    /**
     * Performs an insertion sort
     * @param {Array} arr The array to sort
     * @returns {Array} The sorted array
     */
    $f.insertionSort = function (arr) {
        return $f.foldL(arr, insert, []);
    };

    /**
     * Join the items of an array into a string
     * @param {Array} arr
     * @param {String} [optional] sep The separator. Default: ','
     * @returns {String} The resulting string
     */
    $f.join = function (arr, sep) {
        var count = 0;
        sep = sep || ',';

        return $f.foldL(arr, function (a, x) {
            return count++ > 0 ? a + sep + x : x;
        }, '');
    };

    /**
     * Creates a new array with the results of calling a provided function on every element
     * @param {Array} arr
     * @param {Function} f
     * @returns {Array} The new array
     */
    $f.map = function (arr, f) {
        f = f || identity;

        return $f.foldL(arr, function (a, x) {
            a.push(f(x));
            return a;
        }, []);
    };

    /**
     * Performs multiple maps
     * @param {Array} arr
     * @param {Array} fs Array of functions to map
     * @returns {Array} The new array
     */
    $f.mapFusion = function (arr, fs) {
        return $f.map(arr, $f.composition(fs));
    };

    /**
     * Get the maximum item
     * @param {Array} arr
     * @returns {*}
     */
    $f.max = function (arr) {
        if (isEmpty(arr)) {
            return null;
        }

        return $f.foldL(arr, function (a, x) {
            return x > a ? x : a;
        }, dctor(arr).hd);
    };

    /**
     * Checks whether 'e' is in 'arr'
     * @param {Array} arr
     * @param {*} e The element to test
     * @returns {Boolean}
     */
    $f.member = function (arr, e) {
        return $f.foldL(arr, function (a, x) {
            return x === e ? true : a;
        }, false);
    };

    /**
     * Get the minimum item
     * @param {Array} arr
     * @returns {*}
     */
    $f.min = function (arr) {
        if (isEmpty(arr)) {
            return null;
        }

        return $f.foldL(arr, function (a, x) {
            return x < a ? x : a;
        }, dctor(arr).hd);
    };

    /**
     * Negate all numbers in the array
     * @param {Array} arr
     * @returns {Array}
     */
    $f.negateAll = function (arr) {
        return $f.map(arr, function (x) {
            return -x;
        });
    };

    /**
     * Applies the or operator to all the boolean expressions
     * @param {Array} arr Array of boolean expressions
     * @returns {Boolean}
     */
    $f.or = function (arr) {
        return $f.foldL(arr, function (a, x) {
            return a || x;
        }, false);
    };

    /**
     * Partitions the array the array over a property
     * @param {Array} arr
     * @param {Function} f
     * @returns {Object} Object with key 'T' corresponding to all elements satisfying the property. 'F' otherwise.
     */
    $f.partition = function (arr, f) {
        return $f.foldL(arr, function (a, x) {

            if (f(x)) {
                a.T.push(x);
            }
            else {
                a.F.push(x);
            }

            return a;

        }, {'T': [], 'F': []});
    };

    /**
     * Remove consecutive items from an array
     * @param {Array} arr
     * @returns {Array} The array without consecutive values
     */
    $f.removeConsecutive = function (arr) {
        if (isEmpty(arr)) {
            return arr;
        }

        var cur = dctor(arr).hd,
            count = 0;

        return $f.foldL(arr, function (a, x) {
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

    /**
     * Replicate the items 'n' times
     * @param {Array} arr
     * @param {Number} n The replication amount
     * @returns {Array}
     */
    $f.replicate = function (arr, n) {
        return $f.foldL(arr, function (a, x) {
            a.pushArray(fill(x, n));

            return a;
        }, []);
    };

    /**
     * Reverse an array
     * @param {Array} arr
     * @returns {Array} The reversed array
     */
    $f.reverse = function (arr) {
        return $f.foldR(arr, function (a, x) {
            a.push(x);
            return a;
        }, []);
    };

    /**
     * Get the length of an array
     * @param {Array} arr
     * @returns {Number} Length
     */
    $f.size = function (arr) {
        return $f.foldL(arr, function (a, x) { return a + 1; }, 0);
    };

    /**
     * Get the sum of an array of numbers
     * @param {Array} arr
     * @returns {Number}
     */
    $f.sum = function (arr) {
        return $f.foldL(arr, add, 0);
    };

    /**
     * Take just the elements at the nth position
     * @param {Array} arr
     * @param {Number} n nth position
     * @returns {Array}
     */
    $f.take = function (arr, n) {
        var count = 1;

        return $f.foldL(arr, function (a, x) {
            if (count % n === 0) {
                a.push(x);
            }
            count++;

            return a;
        }, []);
    };

})(typeof exports === 'undefined'? window.fold = {} : exports);