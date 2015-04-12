# fold [![Build Status](https://travis-ci.org/oss6/fold.svg?branch=master)](https://travis-ci.org/oss6/fold)
> A collection of useful functions using exclusively the 'fold'/'reduce' pattern

## Install
```
$ npm install --save fold
```

## Documentation
- [foldL](#foldL)
- [foldR](#foldR)
- [and](#and)
- [any](#any)
- [average](#average)
- [composition](#composition)
- [count](#count)
- [drop](#drop)
- [filter](#filter)
- [flatten](#flatten)
- [forEach](#forEach)
- [insertionSort](#insertionSort)
- [join](#join)
- [map](#map)
- [mapFusion](#mapFusion)
- [max](#max)
- [member](#member)
- [min](#min)
- [negateAll](#negateAll)
- [or](#or)
- [partition](#partition)
- [removeConsecutive](#removeConsecutive)
- [replicate](#replicate)
- [reverse](#reverse)
- [size](#size)
- [sum](#sum)
- [take](#take)

* * *

### **[⬆](#documentation)** foldL(arr, f, init)<a name="foldL"></a>

Higher-order function applied to arrays, based on the concept of accumulators
(i.e. return a value from the accumulation). Left associative, tail recursive.

**Parameters**

**arr**: `Array`, Array to work on

**f**: `function`, Function to apply ('a -> 'b -> 'a)

**init**: `*`, Initial value

**Returns**: `*`


### **[⬆](#documentation)** foldR(arr, f, init)<a name="foldR"></a>

Higher-order function applied to arrays, based on the concept of accumulators
(i.e. return a value from the accumulation). Right associative, not tail recursive.

**Parameters**

**arr**: `Array`, Array to work on

**f**: `function`, Function to apply ('a -> 'b -> 'a)

**init**: `*`, Initial value

**Returns**: `*`, The accumulated value


### **[⬆](#documentation)** and(arr)<a name="and"></a>

Applies the and operator to all the boolean expressions

**Parameters**

**arr**: `Array`, Array of boolean expressions

**Returns**: `Boolean`


### **[⬆](#documentation)** any(arr, f)<a name="any"></a>

Checks if a predicate is satisfied by any item

**Parameters**

**arr**: `Array`, Checks if a predicate is satisfied by any item

**f**: `function`, The predicate

**Returns**: `Boolean`


### **[⬆](#documentation)** average(arr)<a name="average"></a>

Gets the average of a list of numbers

**Parameters**

**arr**: `Array`, Gets the average of a list of numbers

**Returns**: `number`


### **[⬆](#documentation)** composition(arr)<a name="composition"></a>

Merge a list of functions into one function

**Parameters**

**arr**: `Array`, Array of functions

**Returns**: `function`


### **[⬆](#documentation)** count(arr, e)<a name="count"></a>

Counts the number of occurrences of an element

**Parameters**

**arr**: `Array`, Counts the number of occurrences of an element

**e**: `*`, The element to check

**Returns**: `Number`


### **[⬆](#documentation)** drop(arr, n)<a name="drop"></a>

Drops every 'n' times from 'arr'

**Parameters**

**arr**: `Array`, Drops every 'n' times from 'arr'

**n**: `Number`, Drops every 'n' times from 'arr'

**Returns**: `Array`, New array with the items deleted


### **[⬆](#documentation)** filter(arr, f)<a name="filter"></a>

Filter the array based on a given property

**Parameters**

**arr**: `Array`, Filter the array based on a given property

**f**: `function`, The property/predicate to filter on

**Returns**: `Array`, The filtered array


### **[⬆](#documentation)** flatten(arr, deep)<a name="flatten"></a>

Flatten an array of arrays

**Parameters**

**arr**: `Array`, Array of arrays

**deep**: `Boolean`, Whether to perform a 'deep flattening'

**Returns**: `Array`, The flattened array


### **[⬆](#documentation)** forEach(arr, f)<a name="forEach"></a>

Performs a for loop

**Parameters**

**arr**: `Array`, Performs a for loop

**f**: `function`, The action to apply


### **[⬆](#documentation)** insertionSort(arr)<a name="insertionSort"></a>

Performs an insertion sort

**Parameters**

**arr**: `Array`, The array to sort

**Returns**: `Array`, The sorted array


### **[⬆](#documentation)** join(arr, optional)<a name="join"></a>

Join the items of an array into a string

**Parameters**

**arr**: `Array`, Join the items of an array into a string

**optional**: `String`, sep The separator. Default: ','

**Returns**: `String`, The resulting string


### **[⬆](#documentation)** map(arr, f)<a name="map"></a>

Creates a new array with the results of calling a provided function on every element

**Parameters**

**arr**: `Array`, Creates a new array with the results of calling a provided function on every element

**f**: `function`, Creates a new array with the results of calling a provided function on every element

**Returns**: `Array`, The new array


### **[⬆](#documentation)** mapFusion(arr, fs)<a name="mapFusion"></a>

Performs multiple maps

**Parameters**

**arr**: `Array`, Performs multiple maps

**fs**: `Array`, Array of functions to map

**Returns**: `Array`, The new array


### **[⬆](#documentation)** max(arr)<a name="max"></a>

Get the maximum item

**Parameters**

**arr**: `Array`, Get the maximum item

**Returns**: `*`


### **[⬆](#documentation)** member(arr, e)<a name="member"></a>

Checks whether 'e' is in 'arr'

**Parameters**

**arr**: `Array`, Checks whether 'e' is in 'arr'

**e**: `*`, The element to test

**Returns**: `Boolean`


### **[⬆](#documentation)** min(arr)<a name="min"></a>

Get the minimum item

**Parameters**

**arr**: `Array`, Get the minimum item

**Returns**: `*`


### **[⬆](#documentation)** negateAll(arr)<a name="negateAll"></a>

Negate all numbers in the array

**Parameters**

**arr**: `Array`, Negate all numbers in the array

**Returns**: `Array`


### **[⬆](#documentation)** or(arr)<a name="or"></a>

Applies the or operator to all the boolean expressions

**Parameters**

**arr**: `Array`, Array of boolean expressions

**Returns**: `Boolean`


### **[⬆](#documentation)** partition(arr, f)<a name="partition"></a>

Partitions the array the array over a property

**Parameters**

**arr**: `Array`, Partitions the array the array over a property

**f**: `function`, Partitions the array the array over a property

**Returns**: `Object`, Object with key 'T' corresponding to all elements satisfying the property. 'F' otherwise.


### **[⬆](#documentation)** removeConsecutive(arr)<a name="removeConsecutive"></a>

Remove consecutive items from an array

**Parameters**

**arr**: `Array`, Remove consecutive items from an array

**Returns**: `Array`, The array without consecutive values


### **[⬆](#documentation)** replicate(arr, n)<a name="replicate"></a>

Replicate the items 'n' times

**Parameters**

**arr**: `Array`, Replicate the items 'n' times

**n**: `Number`, The replication amount

**Returns**: `Array`


### **[⬆](#documentation)** reverse(arr)<a name="reverse"></a>

Reverse an array

**Parameters**

**arr**: `Array`, Reverse an array

**Returns**: `Array`, The reversed array


### **[⬆](#documentation)** size(arr)<a name="size"></a>

Get the length of an array

**Parameters**

**arr**: `Array`, Get the length of an array

**Returns**: `Number`, Length


### **[⬆](#documentation)** sum(arr)<a name="sum"></a>

Get the sum of an array of numbers

**Parameters**

**arr**: `Array`, Get the sum of an array of numbers

**Returns**: `Number`


### **[⬆](#documentation)** take(arr, n)<a name="take"></a>

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