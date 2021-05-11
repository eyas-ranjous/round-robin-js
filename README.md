# round-robin-js

[![build:?](https://travis-ci.org/eyas-ranjous/round-robin-js.svg?branch=master)](https://travis-ci.org/eyas-ranjous/round-robin-js) [![npm](https://img.shields.io/npm/v/round-robin-js.svg)](https://www.npmjs.com/package/round-robin-js) [![npm](https://img.shields.io/npm/dm/round-robin-js.svg)](https://www.npmjs.com/package/round-robin-js) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/round-robin-js)

An implementation of the round robin as a data structure. Two strategies are implemented to select the next item in the round, a Sequential one that selects the next item based on insertion order, and a Random one that select the next item randomly.

# Contents
* [Install](#install)
* [API](#api)
  * [import](#import)
  * [constructor](#constructor)
  * [add(item)](#additem)
  * [delete(key)](#deletekey)
  * [next()](#next)
  * [count()](#count)
  * [completedRounds()](#completedrounds)
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

const randomTable = new RandomRoundRobin([1, 2, 3]);
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

const randomTable = new RandomRoundRobin<number>([1, 2, 3]);
```

### add(item)

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

const { key, value } = randomTable.add(4);
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
const item: RoundRobinItem = sequentialTable.add('T4');
console.log(item); // { key: 3, value: 'T4' }

const item: RoundRobinItem = randomTable.add('T4');
console.log(item); // { key: 3, value: 'T4' }
```