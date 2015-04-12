'use strict';
var f = require('./foldc'),
    assert = require('assert'),
    range = function (a, b) {
        var arr = [];
        for (var i = a; i <= b; i++)
            arr.push(i);
        return arr;
    };

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

    suite('count()', function () {
        test('should return 0 with empty array', function () {
            assert.equal(0, f.count([]));
            assert.equal(0, f.count(range(1, 3), 4));
            assert.equal(0, f.count(['hey', 'hello', 'how'], 'Hey'));
        });

        test('should return the number of occurrences', function () {
            var arr = [1, 2, 3, 'hey', 'hello', 98, 2, 5, 2];
            assert.equal(3, f.count(arr, 2));
        });
    });

    suite('drop()', function () {
        test('should return empty array if provided an empty array', function () {
            assert.deepEqual([], f.drop([])); // Without arg
            assert.deepEqual([], f.drop([], 1));
        });

        test('should return empty array if drop every 1', function () {
            assert.deepEqual([], f.drop(range(1, 5), 1));
            assert.deepEqual([], f.drop(range(1, 10), 1));
        });

        test('should return whole array if drop every > array length', function () {
            assert.deepEqual(range(1, 5), f.drop(range(1, 5), 7));
            assert.deepEqual(range(1, 10), f.drop(range(1, 10), 16));
        });

        test('should return the array without the even positions', function () {
            assert.deepEqual([1, 3, 5, 7, 9], f.drop(range(1, 10), 2))
        });
    });

    suite('filter()', function () {
        var odd = function (x) {
                return x % 2 !== 0;
            },
            dummy = function (x) {
                return true;
            },
            startB = function (x) {
                return x !== '' && x.charAt(0) === 'b';
            };

        test('should return empty array for an empty array', function () {
            assert.deepEqual([], f.filter([], dummy));
        });

        test('should return empty array if no item satisfies the predicate', function () {
            assert.deepEqual([], f.filter([2, 4, 200, 202, 556], odd));
        });

        test('should return all odd numbers', function () {
            assert.deepEqual([1, 3, 5, 7, 9], f.filter(range(1, 10), odd));
        });

        test('should return all words starting with "b"', function () {
            assert.deepEqual(['banana', 'baby'], f.filter(['hello', 'hey', 'banana', 'baby', 'apple'], startB));
        });
    });

    suite('flatten()', function () {
        test('should return an empty array if no arrays provided', function () {
            assert.deepEqual([], f.flatten([]));
        });

        test('should return flat array', function () {
            assert.deepEqual([1, 2, 3, 4, 5], f.flatten([[1], [2, 3], [4, 5]]));
            assert.deepEqual([1, 2, 3, 4, 4, 5, 5, 6], f.flatten([[1, 2], [3, 4, [4, 5]], [5, 6]], true));
        });
    });

    suite('insertionSort', function () {
        test('should return empty array given an empty array', function () {
            assert.deepEqual([], f.insertionSort([]));
        });

        test('should sort the array :)', function () {
            assert.deepEqual(range(1, 5), f.insertionSort([5, 3, 4, 1, 2]));
        });
    });

    suite('join()', function () {
        test('should return empty string given an empty array', function () {
            assert.equal('', f.join([]));
        });

        test('should return string with concatenated items given the separator', function () {
            assert.equal('0,1,2,3,4,5', f.join(range(0, 5)));
            assert.equal('0-1-2-3-4-5', f.join(range(0, 5), '-'));
        });
    });

    suite('map()', function () {
        var double = function (x) { return x * 2;};

        test('should return empty array given an empty array', function () {
            assert.deepEqual([], f.map([]));
        });

        test('should return mapped array', function () {
            assert.deepEqual(range(1, 50), f.map(range(1, 50))); // default --> identity function
            assert.deepEqual([2, 4, 6, 8, 10], f.map(range(1, 5), double));
        });
    });

    suite('max()', function () {
        test('should return "null" if empty array', function () {
            assert.equal(null, f.max([]));
        });

        test('should return maximum value (number)', function () {
            assert.equal(35, f.max(range(1, 35)));
            assert.equal(5, f.max([4, 5, 1, 2, 3]));
        });

        test('should return maximum value (string)', function () {
            assert.equal('tarzan', f.max(['hi', 'house', 'mouse', 'tarzan', 'pineapple']));
        });
    });

    suite('member()', function () {
        test('should return false given an empty array', function () {
            assert.equal(false, f.member([], 'strawberry'));
        });

        test('should return false if item is not in the array', function () {
            assert.equal(false, f.member(range(1, 10), 23));
            assert.equal(false, f.member(['hey', 'ok'], 'Hello'));
        });

        test('should return true if item is in the array', function () {
            assert.equal(true, f.member(range(1, 10), 3));
            assert.equal(true, f.member(range(1, 10), 10));
        });
    });

    suite('min()', function () {
        test('should return "null" if empty array', function () {
            assert.equal(null, f.min([]));
        });

        test('should return minimum value (number)', function () {
            assert.equal(1, f.min(range(1, 35)));
            assert.equal(2, f.min([4, 5, 2, 3]));
        });

        test('should return minimum value (string)', function () {
            assert.equal('hi', f.min(['hi', 'house', 'mouse', 'tarzan', 'pineapple']));
        });
    });

    suite('negateAll()', function () {
        test('should return empty array given an empty array', function () {
            assert.deepEqual([], f.negateAll([]));
        });

        test('should return the negated array', function () {
            assert.deepEqual([-1, -2, -3, -4, -5], f.negateAll(range(1, 5)));
        });
    });

    suite('or()', function () {
        test('should return false with empty array', function () {
            assert.equal(false, f.or([]));
        });

        test('other test cases', function () {
            assert.equal(true, f.or([3 > 1]));
            assert.equal(true, f.or([3 > 1, 4 <= 9, 'hey' > 'banana']));
            assert.equal(true, f.or([6 > 4, 8 < 2, 1 >= 0]));
            assert.equal(false, f.or([4 < 2, 'hey' === 'hello', 6 === 7]));
        });
    });

    suite('partition()', function () {
        var p = function (x) { return x < 5; };

        test('should return an empty partitioning given an empty array', function () {
            assert.deepEqual({ 'T': [], 'F': [] }, f.partition([]));
        });

        test('should return correct partitioning (< 5)', function () {
            assert.deepEqual({ 'T': [1, 2, 3, 4], 'F': [5, 6, 7, 8, 9, 10] }, f.partition(range(1, 10), p));
        });
    });

    suite('removeConsecutive()', function () {
        test('should return empty array given an empty array', function () {
            assert.deepEqual([], f.removeConsecutive([]));
        });

        test('should remove consecutive items correctly', function () {
            assert.deepEqual(range(1, 6), f.removeConsecutive([1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6]));
        });
    });

    suite('replicate()', function () {
        test('should return empty array given an empty array', function () {
            assert.deepEqual([], f.replicate([], 2));
            assert.deepEqual([], f.replicate(range(1, 10), 0));
        });

        test('should return replicated elements', function () {
            assert.deepEqual([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4], f.replicate(range(1, 4), 3));
            assert.deepEqual(range(1, 30), f.replicate(range(1, 30), 1));
        });
    });

    suite('reverse()', function () {
        test('should return empty array given an empty array', function () {
            assert.deepEqual([], f.reverse([]));
        });

        test('should return reversed array', function () {
            assert.deepEqual([5, 4, 3, 2, 1], f.reverse(range(1, 5)));
        });
    });

    suite('size()', function () {
        test('should return 0 with empty array', function () {
            assert.equal(0, f.size([]));
        });

        test('should return length of array', function () {
            assert.equal(3, f.size([3, 2, 6]));
        });
    });

    suite('sum()', function () {
        test('should return 0 with empty array', function () {
            assert.equal(0, f.sum([]));
        });
    });

    suite('take()', function () {
        test('should return empty array given an empty array', function () {
            assert.deepEqual([], f.take([], 1));
        });

        test('should take the correct elements', function () {
            assert.deepEqual([2, 4], f.take(range(1, 5), 2));
            assert.deepEqual(range(1, 20), f.take(range(1, 20), 1));
            assert.deepEqual([], f.take(range(1, 20), 0));
        });
    });
});