'use strict';
var f = require('./fold'),
    assert = require('assert');

suite('fold', function () {

    suite('and()', function () {
        test('should return true with empty array', function () {
            assert.equal(true, f.and([]));
        });

        test('other test cases', function () {
            assert.equal(true, f.and([3 > 1]));
            assert.equal(true, f.and([3 > 1, 4 <= 9, 'hey' > 'banana']));
            assert.equal(false, f.and([6 > 4, 8 < 2, 1 >= 0]));
        });
    });

    suite('any()', function () {
        test('should return false with empty array', function () {
            assert.equal(false, f.any([]));
        });

        test('should return true if predicate satisfied by any item', function () {
            var p = function (x) {
                return x % 2 === 0;
            };

            assert.equal(true, f.any([1, 3, 4, 5], p));
            assert.equal(false, f.any([1, 3, 5, 7, 101], p));
        });
    });

    suite('average()', function () {
        test('should return null with empty array', function () {
            assert.equal(null, f.average([]));
        });

        test('should return average of array', function () {
            assert.equal(3, f.average([1, 2, 3, 4, 5]));
            assert.equal(3.5, f.average([5, 4, 3, 2]));
            assert.equal(6, f.average([6, 6, 6]));
        });
    });

    suite('composition()', function () {
        test('should return identity function with empty array', function () {
            var fun = f.composition([]);

            for (var i = 0; i < 50; i++) {
                assert.equal(i, fun(i));
            }
        });

        test('should return the composition of the functions', function () {
            var f1 = function (x) {
                    return x * 2;
                },
                f2 = function (x) {
                    return x + 1;
                },
                fun = f.composition([f1, f2]);

            assert.equal(201, fun(100));
        });
    });

    suite('sum()', function () {
        test('should return 0 with empty array', function () {
            assert.equal(0, f.sum([]));
        });
    });

    suite('size()', function () {
        test('should return 0 with empty array', function () {
            assert.equal(0, f.size([]));
        });

        test('should return 3', function () {
            assert.equal(3, f.size([3, 2, 6]));
        });
    });

});
