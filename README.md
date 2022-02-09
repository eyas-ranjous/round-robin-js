# round-robin-js

[![build:?](https://travis-ci.org/eyas-ranjous/round-robin-js.svg?branch=main)](https://travis-ci.org/eyas-ranjous/round-robin-js) [![npm](https://img.shields.io/npm/v/round-robin-js.svg)](https://www.npmjs.com/package/round-robin-js) [![npm](https://img.shields.io/npm/dm/round-robin-js.svg)](https://www.npmjs.com/package/round-robin-js) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/round-robin-js)

An implementation of the round robin as a data structure. Two strategies are implemented to select the next item in the round, a Sequential one that selects the next item based on the order of insertion, and a Random one that selects the next item randomly.

<img src="https://user-images.githubusercontent.com/6517308/121813242-859a9700-cc6b-11eb-99c0-49e5bb63005b.jpg">

# Contents
* [Install](#install)
* [API](#api)
  * [import](#import)
  * [constructor](#constructor)
  * [add(item)](#additem)
  * [count()](#count)
  * [next()](#next)
  * [deleteByKey(key)](#deletebykeykey)
  * [deleteByValue(cb)](#deletebyvaluecb)
  * [reset()](#reset)
  * [clear()](#clear)
 * [Build](#build)
 * [License](#license)

## Install

```sh
npm install --save round-robin-js
```

## API

### import

#### JS

```js
const { SequentialRoundRobin, RandomRoundRobin } = require('round-robin-js');

// OR

import { SequentialRoundRobin, RandomRoundRobin } from 'round-robin-js';
```

#### TS

```js
import {
  SequentialRoundRobin,
  RandomRoundRobin,
  RoundRobinItem // the internal item type
} from 'round-robin-js';
```

### constructor
constructor accepts an initial list of items that will be loaded internally and given unique keys.

#### JS

<table>
  <tr>
    <th align="center">params</th>
  </tr>
  <tr>
    <td align="center">items: array</td>
  </tr>
</table>

```js
const sequentialTable = new SequentialRoundRobin(['T1', 'T2', 'T3']);

const randomTable = new RandomRoundRobin([5, 10, 15]);
```

#### TS

<table>
  <tr>
    <th align="center">params</th>
  </tr>
  <tr>
    <td align="center">items: T[]</td>
  </tr>
</table>

```js
const sequentialTable = new SequentialRoundRobin<string>(['T1', 'T2', 'T3']);

const randomTable = new RandomRoundRobin<number>([5, 10, 15]);
```

### add(item)
adds a new item to the table.

#### JS

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">return</th>
  </tr>
  <tr>
    <td align="center">item: any</td>
    <td align="center">object</td>
  </tr>
</table>

```js
const { key, value } = sequentialTable.add('T4');
console.log(key, value); // 3, T4

const { key, value } = randomTable.add(25);
console.log(key, value); // 3, 25
```

#### TS

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">return</th>
  </tr>
  <tr>
    <td align="center">item: T</td>
    <td align="center">RoundRobinItem&lt;T&gt;</td>
  </tr>
</table>

```js
const item: RoundRobinItem = sequentialTable.add('T4');
console.log(item); // { key: 3, value: 'T4' }

const item: RoundRobinItem = randomTable.add(25);
console.log(item); // { key: 3, value: 25 }
```

### count()
returns the number of items in the table.

<table>
  <tr>
    <th align="center">return</th>
  </tr>
  <tr>
    <td align="center">number</td>
  </tr>
</table>

```js
console.log(sequentialTable.count()); // 4

console.log(randomTable.count()); // 4
```

### next()
returns the next item in the round.

<table>
  <tr>
    <th align="center">return</th>
  </tr>
  <tr>
    <td align="center">object (RoundRobinItem&lt;T&gt;)</td>
  </tr>
</table>

```js
// first round
console.log(sequentialTable.next()); // { key: 0, value: 'T1' }
console.log(sequentialTable.next()); // { key: 1, value: 'T2' }
console.log(sequentialTable.next()); // { key: 2, value: 'T3' }
console.log(sequentialTable.next()); // { key: 3, value: 'T4' }
// second round ...
console.log(sequentialTable.next()); // { key: 0, value: 'T1' }

// first round
console.log(randomTable.next()); // { key: 2, value: 15 }
console.log(randomTable.next()); // { key: 1, value: 10 }
console.log(randomTable.next()); // { key: 0, value: 5 }
console.log(randomTable.next()); // { key: 3, value: 25 }
// second round ...
console.log(randomTable.next()); // { key: 1, value: 10 }
```

### deleteByKey(key)
deletes an item by its key from the table.

<table>
  <tr>
    <th align="center">return</th>
  </tr>
  <tr>
    <td align="center">boolean</td>
  </tr>
</table>

```js
sequentialTable.deleteByKey(0);
sequentialTable.deleteByKey(2);
console.log(sequentialTable.next()); // { key: 1, value: 'T2' }
console.log(sequentialTable.next()); // { key: 3, value: 'T4' }
console.log(sequentialTable.next()); // { key: 1, value: 'T2' }

randomTable.deleteByKey(0);
randomTable.deleteByKey(2);
console.log(randomTable.next()); // { key: 3, value: 25 }
console.log(randomTable.next()); // { key: 1, value: 10 }
console.log(randomTable.next()); // { key: 3, value: 25 }
```

### deleteByValue(cb)
deletes items that match a criteria from the table and returns the number of deleted items.

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">return</th>
  </tr>
  <tr>
    <td align="center">cb: (value: T) => boolean</td>
    <td align="center">number</td>
  </tr>
</table>

```js
const seqTable = new SequentialRoundRobin<number>([2, 3, 5, 6, 7, 10]);
const ranTable = new RandomRoundRobin<{ id: string }>([
  { id: '123' },
  { id: 'id456' },
  { id: '456' },
  { id: 'id780' }
]);

const d1 = seqTable.deleteByValue((n) => n % 2 === 1); // 3
console.log(seqTable.next(), seqTable.next(), seqTable.next())
// { key: 0, value: 2 } { key: 3, value: 6 } { key: 5, value: 10 }

const d2 = ranTable.deleteByValue((obj) => obj.id.indexOf('id') === 0); // 2
console.log(ranTable.next(), ranTable.next())
// { key: 2, value: { id: '456' } } { key: 0, value: { id: '123' } }
```

### reset()
resets the table with the intial values.

```js
sequentialTable.reset();
console.log(sequentialTable.count()); // 3

randomTable.reset();
console.log(randomTable.count()); // 3
```

### clear()
clears all values in the table.

```js
sequentialTable.clear();
console.log(sequentialTable.count()); // 0

randomTable.clear();
console.log(randomTable.count()); // 0
```

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/eyas-ranjous/round-robin-js/blob/main/LICENSE)
