# round-robin-js

[![build:?](https://travis-ci.org/eyas-ranjous/round-robin-js.svg?branch=master)](https://travis-ci.org/eyas-ranjous/round-robin-js) [![npm](https://img.shields.io/npm/v/round-robin-js.svg)](https://www.npmjs.com/package/round-robin-js) [![npm](https://img.shields.io/npm/dm/round-robin-js.svg)](https://www.npmjs.com/package/round-robin-js) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/round-robin-js)

An implementation of the round robin as a data structure. Two strategies are implemented to select the next item in the round, a Sequential one that selects the next item based on insertion order, and a Random one that select the next item randomly.

# Contents
* [Install](#install)
* [API](#api)
  * [import](#import)
  * [constructor](#constructor)
  * [add(item)](#additem)
  * [count()](#count)
  * [next()](#next)
  * [completedRounds()](#completedrounds)
  * [delete(key)](#deletekey)
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
const sequentialRound = new SequentialRoundRobin(['T1', 'T2', 'T3']);

const randomRound = new RandomRoundRobin([1, 2, 3]);
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
const sequentialRound = new SequentialRoundRobin<string>(['T1', 'T2', 'T3']);

const randomRound = new RandomRoundRobin<number>([1, 2, 3]);
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
const { key, value } = sequentialRound.add('T4');
console.log(key, value); // 3, T4

const { key, value } = randomRound.add(4);
console.log(key, value); // 3, 4
```

#### TS

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">return</th>
  </tr>
  <tr>
    <td align="center">item: T</td>
    <td align="center">RoundRobinItem</td>
  </tr>
</table>

```js
const item: RoundRobinItem = sequentialRound.add('T4');
console.log(item); // { key: 3, value: 'T4' }

const item: RoundRobinItem = randomRound.add('T4');
console.log(item); // { key: 3, value: 'T4' }
```

### count()
returns the number of items in the round.

<table>
  <tr>
    <th align="center">return</th>
  </tr>
  <tr>
    <td align="center">number</td>
  </tr>
</table>

```js
console.log(sequentialRound.count()); // 4

console.log(randomRound.count()); // 4
```

### next()
returns the next item in the round.

<table>
  <tr>
    <th align="center">return</th>
  </tr>
  <tr>
    <td align="center">object (RoundRobinItem)</td>
  </tr>
</table>

```js
// first round
console.log(sequentialRound.next()); // { key: 0, value: 'T1' }
console.log(sequentialRound.next()); // { key: 1, value: 'T2' }
console.log(sequentialRound.next()); // { key: 2, value: 'T3' }
console.log(sequentialRound.next()); // { key: 3, value: 'T4' }
// second round ...
console.log(sequentialRound.next()); // { key: 0, value: 'T1' }


// first round
console.log(randomRound.next()); // { key: 3, value: 'T4' }
console.log(randomRound.next()); // { key: 0, value: 'T1' }
console.log(randomRound.next()); // { key: 2, value: 'T3' }
console.log(randomRound.next()); // { key: 1, value: 'T2' }
// second round ...
console.log(randomRound.next()); // { key: 2, value: 'T3' }
```

### completedRounds()
returns the number of finished rounds.

<table>
  <tr>
    <th align="center">return</th>
  </tr>
  <tr>
    <td align="center">number</td>
  </tr>
</table>

```js
console.log(sequentialRound.completedRounds()); // 1

console.log(randomRound.completedRounds()); // 1
```


## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/eyas-ranjous/round-robin-js/blob/master/LICENSE)
