/* eslint-disable no-use-before-define */
const isEmpty = (arr) => typeof arr === 'undefined' || arr.length === 0;

const add = (a, b) => a + b;

const identity = (x) => x;

const compose = (f, g) => (x) => f(g(x));

const insert = function _insert(arr, x) {
  if (isEmpty(arr)) {
    return [x];
  }

  const [y, ...ys] = arr;
  return x < y ? [x, y, ...ys] : [y, ..._insert(ys, x)];
};

/**
 * Higher-order function applied to arrays, based on the concept of accumulators
 * (i.e. return a value from the accumulation). Left associative, tail recursive.
 * @param {Array} arr - Array to work on
 * @param {Function} f - Function to apply ('a -> 'b -> 'a)
 * @param {*} init - Initial value
 * @returns {*}
 */
export const foldL = function _foldL(arr, f, init) {
  if (isEmpty(arr)) {
    return init;
  }

  const [x, ...xs] = arr;
  return _foldL(xs, f, f(init, x));
};

/**
 * Higher-order function applied to arrays, based on the concept of accumulators
 * (i.e. return a value from the accumulation). Right associative, not tail recursive.
 * @param {Array} arr - Array to work on
 * @param {Function} f - Function to apply ('a -> 'b -> 'a)
 * @param {*} init - Initial value
 * @returns {*} The accumulated value
 */
export const foldR = function _foldR(arr, f, init) {
  if (isEmpty(arr)) {
    return init;
  }

  const [x, ...xs] = arr;
  return f(_foldR(xs, f, init), x);
};

/**
 * Applies the and operator to all the boolean expressions
 * @param {Array} arr Array of boolean expressions
 * @returns {Boolean}
 */
export const and = (arr) => foldL(arr, (a, x) => a && x, true);

/**
 * Checks if a predicate is satisfied by any item
 * @param {Array} arr
 * @param {Function} f The predicate
 * @returns {Boolean}
 */
export const any = (arr, f) => foldR(arr, (a, x) => {
  let acc = a;

  if (!acc && f(x)) {
    acc = true;
  }

  return acc;
}, false);

/**
 * Gets the average of a list of numbers
 * @param {Array} arr
 * @returns {number}
 */
export const average = (arr) => (arr.length > 0 ? sum(arr) / arr.length : null);

/**
 * Merge a list of functions into one function
 * @param {Array} arr Array of functions
 * @returns {Function}
 */
export const composition = (arr) => foldR(arr, compose, identity);

/**
 * Counts the number of occurrences of an element
 * @param {Array} arr
 * @param {*} e The element to check
 * @returns {Number}
 */
export const count = (arr, e) => foldR(arr, (a, x) => (x === e ? a + 1 : a), 0);

/**
 * Drops every 'n' times from 'arr'
 * @param {Array} arr
 * @param {Number} n
 * @returns {Array} New array with the items deleted
 */
export const drop = (arr, n) => {
  let c = 1;

  return foldL(arr, (a, x) => {
    if (c % n !== 0) {
      a.push(x);
    }
    c += 1;

    return a;
  }, []);
};

/**
 * Filter the array based on a given property
 * @param {Array} arr
 * @param {Function} f The property/predicate to filter on
 * @returns {Array} The filtered array
 */
export const filter = (arr, f) => foldL(arr, (a, x) => (f(x) ? [...a, x] : a), []);

/**
 * Flatten an array of arrays
 * @param {Array} arr Array of arrays
 * @param {Boolean} deep Whether to perform a 'deep flattening'
 * @returns {Array} The flattened array
 */
export const flatten = (arr) => foldL(
  arr,
  (a, x) => a.concat(Array.isArray(x) ? flatten(x) : [x]), [],
);

/**
 * Performs a for loop
 * @param {Array} arr
 * @param {Function} f The action to apply
 */
export const forEach = (arr, f) => foldL(arr, (_, x) => { f(x); }, undefined);

/**
 * Performs an insertion sort
 * @param {Array} arr The array to sort
 * @returns {Array} The sorted array
 */
export const insertionSort = (arr) => foldL(arr, insert, []);

/**
 * Join the items of an array into a string
 * @param {Array} arr
 * @param {String} [optional] sep The separator. Default: ','
 * @returns {String} The resulting string
 */
export const join = (arr, sep = ',') => {
  let c = 0;

  return foldL(arr, (a, x) => {
    const result = c > 0 ? a + sep + x : x;
    c += 1;
    return result;
  }, '');
};

/**
 * Creates a new array with the results of calling a provided function on every element
 * @param {Array} arr
 * @param {Function} f
 * @returns {Array} The new array
 */
export const map = (arr, f = identity) => foldL(arr, (a, x) => [...a, f(x)], []);

/**
 * Performs multiple maps
 * @param {Array} arr
 * @param {Array} fs Array of functions to map
 * @returns {Array} The new array
 */
export const mapFusion = (arr, fs) => map(arr, composition(fs));

/**
 * Get the maximum item
 * @param {Array} arr
 * @returns {*}
 */
export const max = (arr) => {
  if (isEmpty(arr)) {
    return null;
  }

  const [head] = arr;
  return foldL(arr, (a, x) => (x > a ? x : a), head);
};

/**
 * Checks whether 'e' is in 'arr'
 * @param {Array} arr
 * @param {*} e The element to test
 * @returns {Boolean}
 */
export const member = (arr, e) => foldL(arr, (a, x) => (x === e ? true : a), false);

/**
 * Get the minimum item
 * @param {Array} arr
 * @returns {*}
 */
export const min = (arr) => {
  if (isEmpty(arr)) {
    return null;
  }

  const [head] = arr;
  return foldL(arr, (a, x) => (x < a ? x : a), head);
};

/**
 * Negate all numbers in the array
 * @param {Array} arr
 * @returns {Array}
 */
export const negateAll = (arr) => map(arr, (x) => -x);

/**
 * Applies the or operator to all the boolean expressions
 * @param {Array} arr Array of boolean expressions
 * @returns {Boolean}
 */
export const or = (arr) => foldL(arr, (a, x) => a || x, false);

/**
 * Partitions the array the array over a property
 * @param {Array} arr
 * @param {Function} f
 * @returns {Object} Object with key 'T' corresponding to all elements satisfying the property.
 *                   'F' otherwise.
 */
export const partition = (arr, f) => foldL(arr, (a, x) => {
  if (f(x)) {
    a.T.push(x);
  } else {
    a.F.push(x);
  }

  return a;
}, { T: [], F: [] });

/**
 * Remove consecutive items from an array
 * @param {Array} arr
 * @returns {Array} The array without consecutive values
 */
export const removeConsecutive = (arr) => {
  if (isEmpty(arr)) {
    return arr;
  }

  let [cur] = arr;
  let c = 0;

  return foldL(arr, (a, x) => {
    const newA = c === 0 || x !== cur ? [...a, x] : [...a];
    cur = x;
    c += 1;
    return newA;
  }, []);
};

/**
 * Replicate the items 'n' times
 * @param {Array} arr
 * @param {Number} n The replication amount
 * @returns {Array}
 */
export const replicate = (arr, n) => foldL(arr, (a, x) => [...a, ...Array(n).fill(x)], []);

/**
 * Reverse an array
 * @param {Array} arr
 * @returns {Array} The reversed array
 */
export const reverse = (arr) => foldR(arr, (a, x) => [...a, x], []);

/**
 * Get the length of an array
 * @param {Array} arr
 * @returns {Number} Length
 */
export const size = (arr) => foldL(arr, (a) => a + 1, 0);

/**
 * Get the sum of an array of numbers
 * @param {Array} arr
 * @returns {Number}
 */
export const sum = (arr) => foldL(arr, add, 0);

/**
 * Take just the elements at the nth position
 * @param {Array} arr
 * @param {Number} n nth position
 * @returns {Array}
 */
export const take = (arr, n) => {
  let c = 1;

  return foldL(arr, (a, x) => {
    const newA = c % n === 0 ? [...a, x] : [...a];
    c += 1;
    return newA;
  }, []);
};
