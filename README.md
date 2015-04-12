# fold [![Build Status](https://travis-ci.org/oss6/fold.svg?branch=master)](https://travis-ci.org/oss6/fold)
> A collection of useful functions using exclusively the 'fold'/'reduce' pattern

## Install
```
$ npm install --save fold
```

## Documentation
- [foldL](#foldL)
- [foldR](#foldR)

* * *

### foldL(arr, f, init)

Higher-order function applied to arrays, based on the concept of accumulators
(i.e. return a value from the accumulation). Left associative, tail recursive.

**Parameters**

**arr**: `Array`, Array to work on

**f**: `function`, Function to apply ('a -> 'b -> 'a)

**init**: `*`, Initial value

**Returns**: `*`


### foldR(arr, f, init)

Higher-order function applied to arrays, based on the concept of accumulators
(i.e. return a value from the accumulation). Right associative, not tail recursive.

**Parameters**

**arr**: `Array`, Array to work on

**f**: `function`, Function to apply ('a -> 'b -> 'a)

**init**: `*`, Initial value

**Returns**: `*`, The accumulated value


### and(arr)

Applies the and operator to all the boolean expressions

**Parameters**

**arr**: `Array`, Array of boolean expressions

**Returns**: `Boolean`


### any(arr, f)

Checks if a predicate is satisfied by any item

**Parameters**

**arr**: `Array`, Checks if a predicate is satisfied by any item

**f**: `function`, The predicate

**Returns**: `Boolean`


### average(arr)

Gets the average of a list of numbers

**Parameters**

**arr**: `Array`, Gets the average of a list of numbers

**Returns**: `number`


### composition(arr)

Merge a list of functions into one function

**Parameters**

**arr**: `Array`, Array of functions

**Returns**: `function`


### count(arr, e)

Counts the number of occurrences of an element

**Parameters**

**arr**: `Array`, Counts the number of occurrences of an element

**e**: `*`, The element to check

**Returns**: `Number`


### drop(arr, n)

Drops every 'n' times from 'arr'

**Parameters**

**arr**: `Array`, Drops every 'n' times from 'arr'

**n**: `Number`, Drops every 'n' times from 'arr'

**Returns**: `Array`, New array with the items deleted


### filter(arr, f)

Filter the array based on a given property

**Parameters**

**arr**: `Array`, Filter the array based on a given property

**f**: `function`, The property/predicate to filter on

**Returns**: `Array`, The filtered array


### flatten(arr, deep)

Flatten an array of arrays

**Parameters**

**arr**: `Array`, Array of arrays

**deep**: `Boolean`, Whether to perform a 'deep flattening'

**Returns**: `Array`, The flattened array


### forEach(arr, f)

Performs a for loop

**Parameters**

**arr**: `Array`, Performs a for loop

**f**: `function`, The action to apply



### insertionSort(arr)

Performs an insertion sort

**Parameters**

**arr**: `Array`, The array to sort

**Returns**: `Array`, The sorted array


### join(arr, optional)

Join the items of an array into a string

**Parameters**

**arr**: `Array`, Join the items of an array into a string

**optional**: `String`, sep The separator. Default: ','

**Returns**: `String`, The resulting string


### map(arr, f)

Creates a new array with the results of calling a provided function on every element

**Parameters**

**arr**: `Array`, Creates a new array with the results of calling a provided function on every element

**f**: `function`, Creates a new array with the results of calling a provided function on every element

**Returns**: `Array`, The new array


### mapFusion(arr, fs)

Performs multiple maps

**Parameters**

**arr**: `Array`, Performs multiple maps

**fs**: `Array`, Array of functions to map

**Returns**: `Array`, The new array


### max(arr)

Get the maximum item

**Parameters**

**arr**: `Array`, Get the maximum item

**Returns**: `*`


### member(arr, e)

Checks whether 'e' is in 'arr'

**Parameters**

**arr**: `Array`, Checks whether 'e' is in 'arr'

**e**: `*`, The element to test

**Returns**: `Boolean`


### min(arr)

Get the minimum item

**Parameters**

**arr**: `Array`, Get the minimum item

**Returns**: `*`


### negateAll(arr)

Negate all numbers in the array

**Parameters**

**arr**: `Array`, Negate all numbers in the array

**Returns**: `Array`


### or(arr)

Applies the or operator to all the boolean expressions

**Parameters**

**arr**: `Array`, Array of boolean expressions

**Returns**: `Boolean`


### partition(arr, f)

Partitions the array the array over a property

**Parameters**

**arr**: `Array`, Partitions the array the array over a property

**f**: `function`, Partitions the array the array over a property

**Returns**: `Object`, Object with key 'T' corresponding to all elements satisfying the property. 'F' otherwise.


### removeConsecutive(arr)

Remove consecutive items from an array

**Parameters**

**arr**: `Array`, Remove consecutive items from an array

**Returns**: `Array`, The array without consecutive values


### replicate(arr, n)

Replicate the items 'n' times

**Parameters**

**arr**: `Array`, Replicate the items 'n' times

**n**: `Number`, The replication amount

**Returns**: `Array`


### reverse(arr)

Reverse an array

**Parameters**

**arr**: `Array`, Reverse an array

**Returns**: `Array`, The reversed array


### size(arr)

Get the length of an array

**Parameters**

**arr**: `Array`, Get the length of an array

**Returns**: `Number`, Length


### sum(arr)

Get the sum of an array of numbers

**Parameters**

**arr**: `Array`, Get the sum of an array of numbers

**Returns**: `Number`


### take(arr, n)

Take just the elements at the nth position

**Parameters**

**arr**: `Array`, Take just the elements at the nth position

**n**: `Number`, nth position

**Returns**: `Array`

* * *

## Examples
Check the [test file](test.js)

## License
MIT © [Ossama Edbali](http://ossamaedbali.wordpress.com)