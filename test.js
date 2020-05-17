const assert = require('assert');
const f = require('.');

const range = (a, b) => {
  const arr = [];
  for (let i = a; i <= b; i += 1) {
    arr.push(i);
  }
  return arr;
};

describe('fold', () => {
  describe('and()', () => {
    it('should return true with empty array', () => {
      assert.equal(true, f.and([]));
    });

    it('other test cases', () => {
      assert.equal(true, f.and([3 > 1]));
      assert.equal(true, f.and([3 > 1, 4 <= 9, 'hey' > 'banana']));
      assert.equal(false, f.and([6 > 4, 8 < 2, 1 >= 0]));
    });
  });

  describe('any()', () => {
    it('should return false with empty array', () => {
      assert.equal(false, f.any([]));
    });

    it('should return true if predicate satisfied by any item', () => {
      const p = (x) => x % 2 === 0;

      assert.equal(true, f.any([1, 3, 4, 5], p));
      assert.equal(false, f.any([1, 3, 5, 7, 101], p));
    });
  });

  describe('average()', () => {
    it('should return null with empty array', () => {
      assert.equal(null, f.average([]));
    });

    it('should return average of array', () => {
      assert.equal(3, f.average([1, 2, 3, 4, 5]));
      assert.equal(3.5, f.average([5, 4, 3, 2]));
      assert.equal(6, f.average([6, 6, 6]));
    });
  });

  describe('composition()', () => {
    it('should return identity function with empty array', () => {
      const fun = f.composition([]);

      for (let i = 0; i < 50; i += 1) {
        assert.equal(i, fun(i));
      }
    });

    it('should return the composition of the functions', () => {
      const f1 = (x) => x * 2;
      const f2 = (x) => x + 1;
      const fun = f.composition([f1, f2]);

      assert.equal(201, fun(100));
    });
  });

  describe('count()', () => {
    it('should return 0 with empty array', () => {
      assert.equal(0, f.count([]));
      assert.equal(0, f.count(range(1, 3), 4));
      assert.equal(0, f.count(['hey', 'hello', 'how'], 'Hey'));
    });

    it('should return the number of occurrences', () => {
      const arr = [1, 2, 3, 'hey', 'hello', 98, 2, 5, 2];
      assert.equal(3, f.count(arr, 2));
    });
  });

  describe('drop()', () => {
    it('should return empty array if provided an empty array', () => {
      assert.deepEqual([], f.drop([])); // Without arg
      assert.deepEqual([], f.drop([], 1));
    });

    it('should return empty array if drop every 1', () => {
      assert.deepEqual([], f.drop(range(1, 5), 1));
      assert.deepEqual([], f.drop(range(1, 10), 1));
    });

    it('should return whole array if drop every > array length', () => {
      assert.deepEqual(range(1, 5), f.drop(range(1, 5), 7));
      assert.deepEqual(range(1, 10), f.drop(range(1, 10), 16));
    });

    it('should return the array without the even positions', () => {
      assert.deepEqual([1, 3, 5, 7, 9], f.drop(range(1, 10), 2));
    });
  });

  describe('filter()', () => {
    const odd = (x) => x % 2 !== 0;
    const dummy = () => true;
    const startB = (x) => x !== '' && x.charAt(0) === 'b';

    it('should return empty array for an empty array', () => {
      assert.deepEqual([], f.filter([], dummy));
    });

    it('should return empty array if no item satisfies the predicate', () => {
      assert.deepEqual([], f.filter([2, 4, 200, 202, 556], odd));
    });

    it('should return all odd numbers', () => {
      assert.deepEqual([1, 3, 5, 7, 9], f.filter(range(1, 10), odd));
    });

    it('should return all words starting with "b"', () => {
      assert.deepEqual(['banana', 'baby'], f.filter(['hello', 'hey', 'banana', 'baby', 'apple'], startB));
    });
  });

  describe('flatten()', () => {
    it('should return an empty array if no arrays provided', () => {
      assert.deepEqual([], f.flatten([]));
    });

    it('should return flat array', () => {
      assert.deepEqual([1, 2, 3, 4, 5], f.flatten([[1], [2, 3], [4, 5]]));
      assert.deepEqual([1, 2, 3, 4, 4, 5, 5, 6], f.flatten([[1, 2], [3, 4, [4, 5]], [5, 6]]));
    });
  });

  describe('insertionSort', () => {
    it('should return empty array given an empty array', () => {
      assert.deepEqual([], f.insertionSort([]));
    });

    it('should sort the array :)', () => {
      assert.deepEqual(range(1, 5), f.insertionSort([5, 3, 4, 1, 2]));
    });
  });

  describe('join()', () => {
    it('should return empty string given an empty array', () => {
      assert.equal('', f.join([]));
    });

    it('should return string with concatenated items given the separator', () => {
      assert.equal('0,1,2,3,4,5', f.join(range(0, 5)));
      assert.equal('0-1-2-3-4-5', f.join(range(0, 5), '-'));
    });
  });

  describe('map()', () => {
    const double = (x) => x * 2;

    it('should return empty array given an empty array', () => {
      assert.deepEqual([], f.map([]));
    });

    it('should return mapped array', () => {
      assert.deepEqual(range(1, 50), f.map(range(1, 50))); // default --> identity function
      assert.deepEqual([2, 4, 6, 8, 10], f.map(range(1, 5), double));
    });
  });

  describe('max()', () => {
    it('should return "null" if empty array', () => {
      assert.equal(null, f.max([]));
    });

    it('should return maximum value (number)', () => {
      assert.equal(35, f.max(range(1, 35)));
      assert.equal(5, f.max([4, 5, 1, 2, 3]));
    });

    it('should return maximum value (string)', () => {
      assert.equal('tarzan', f.max(['hi', 'house', 'mouse', 'tarzan', 'pineapple']));
    });
  });

  describe('member()', () => {
    it('should return false given an empty array', () => {
      assert.equal(false, f.member([], 'strawberry'));
    });

    it('should return false if item is not in the array', () => {
      assert.equal(false, f.member(range(1, 10), 23));
      assert.equal(false, f.member(['hey', 'ok'], 'Hello'));
    });

    it('should return true if item is in the array', () => {
      assert.equal(true, f.member(range(1, 10), 3));
      assert.equal(true, f.member(range(1, 10), 10));
    });
  });

  describe('min()', () => {
    it('should return "null" if empty array', () => {
      assert.equal(null, f.min([]));
    });

    it('should return minimum value (number)', () => {
      assert.equal(1, f.min(range(1, 35)));
      assert.equal(2, f.min([4, 5, 2, 3]));
    });

    it('should return minimum value (string)', () => {
      assert.equal('hi', f.min(['hi', 'house', 'mouse', 'tarzan', 'pineapple']));
    });
  });

  describe('negateAll()', () => {
    it('should return empty array given an empty array', () => {
      assert.deepEqual([], f.negateAll([]));
    });

    it('should return the negated array', () => {
      assert.deepEqual([-1, -2, -3, -4, -5], f.negateAll(range(1, 5)));
    });
  });

  describe('or()', () => {
    it('should return false with empty array', () => {
      assert.equal(false, f.or([]));
    });

    it('other test cases', () => {
      assert.equal(true, f.or([3 > 1]));
      assert.equal(true, f.or([3 > 1, 4 <= 9, 'hey' > 'banana']));
      assert.equal(true, f.or([6 > 4, 8 < 2, 1 >= 0]));
      assert.equal(false, f.or([4 < 2, 'hey' === 'hello', 6 === 7]));
    });
  });

  describe('partition()', () => {
    const p = (x) => x < 5;

    it('should return an empty partitioning given an empty array', () => {
      assert.deepEqual({ T: [], F: [] }, f.partition([]));
    });

    it('should return correct partitioning (< 5)', () => {
      assert.deepEqual({ T: [1, 2, 3, 4], F: [5, 6, 7, 8, 9, 10] }, f.partition(range(1, 10), p));
    });
  });

  describe('removeConsecutive()', () => {
    it('should return empty array given an empty array', () => {
      assert.deepEqual([], f.removeConsecutive([]));
    });

    it('should remove consecutive items correctly', () => {
      assert.deepEqual(range(1, 6), f.removeConsecutive([1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6]));
    });
  });

  describe('replicate()', () => {
    it('should return empty array given an empty array', () => {
      assert.deepEqual([], f.replicate([], 2));
      assert.deepEqual([], f.replicate(range(1, 10), 0));
    });

    it('should return replicated elements', () => {
      assert.deepEqual([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4], f.replicate(range(1, 4), 3));
      assert.deepEqual(range(1, 30), f.replicate(range(1, 30), 1));
    });
  });

  describe('reverse()', () => {
    it('should return empty array given an empty array', () => {
      assert.deepEqual([], f.reverse([]));
    });

    it('should return reversed array', () => {
      assert.deepEqual([5, 4, 3, 2, 1], f.reverse(range(1, 5)));
    });
  });

  describe('size()', () => {
    it('should return 0 with empty array', () => {
      assert.equal(0, f.size([]));
    });

    it('should return length of array', () => {
      assert.equal(3, f.size([3, 2, 6]));
    });
  });

  describe('sum()', () => {
    it('should return 0 with empty array', () => {
      assert.equal(0, f.sum([]));
    });
  });

  describe('take()', () => {
    it('should return empty array given an empty array', () => {
      assert.deepEqual([], f.take([], 1));
    });

    it('should take the correct elements', () => {
      assert.deepEqual([2, 4], f.take(range(1, 5), 2));
      assert.deepEqual(range(1, 20), f.take(range(1, 20), 1));
      assert.deepEqual([], f.take(range(1, 20), 0));
    });
  });
});
