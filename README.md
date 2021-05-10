# round-robin-js

[![build:?](https://travis-ci.org/eyas-ranjous/round-robin-js.svg?branch=master)](https://travis-ci.org/eyas-ranjous/round-robin-js) [![npm](https://img.shields.io/npm/v/round-robin-js.svg)](https://www.npmjs.com/package/round-robin-js) [![npm](https://img.shields.io/npm/dm/round-robin-js.svg)](https://www.npmjs.com/package/round-robin-js) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/round-robin-js)

An implementation of the round robin as a data structure. Two strategies are implemented to select the next item in the round, a Sequential one that selects the next item based the order in the list, and a Random one that select the next item randomly.

# Contents
* [Install](#install)
* [API](#api)
  * [import](#import)
  * [new](#new)
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
  RoundRobinOptions, // constructor options
  RoundRobinItem // the internal item type
} from 'round-robin-js';
```

### new

#### JS

<table>
  <tr>
    <th align="center">params</th>
  </tr>
  <tr>
    <td align="center">options: object</td>
  </tr>
</table>

```js
const sequentialTable = new SequentialRoundRobin({ items: ['T1', 'T2', 'T3'] });

const randomTable = new RandomRoundRobin({ items: [1, 2, 3] });
```

#### TS

<table>
  <tr>
    <th align="center">params</th>
  </tr>
  <tr>
    <td align="center">options: RoundRobinOptions</td>
  </tr>
</table>

```js
const sequentialTable = new SequentialRoundRobin<string>({ items: ['T1', 'T2', 'T3'] });

const randomTable = new RandomRoundRobin<number>({ items: [1, 2, 3] });
```
