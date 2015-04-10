'use strict';
var f = require('./fold'),
    assert = require('assert');

suite('fold', function () {

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
