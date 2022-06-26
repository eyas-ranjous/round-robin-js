# round-robin-js

[![npm](https://img.shields.io/npm/v/round-robin-js.svg)](https://www.npmjs.com/package/round-robin-js) [![npm](https://img.shields.io/npm/dm/round-robin-js.svg)](https://www.npmjs.com/package/round-robin-js) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/round-robin-js)

An implementation of the round robin as a data structure. The following strategies are implemented:
<table>
  <tr>
    <td><b>SequentialRoundRobin</b></td>
    <td>selects next item based on the order of insertion</td>
  </tr>
  <tr>
    <td><b>RandomRoundRobin</b></td>
    <td>selects the next item randomly</td>
  </tr>
  <tr>
    <td><b>PriorityRoundRobin</b></td>
    <td>selects the next item based on its priority</td>
  </tr>
</table>

<img src="https://user-images.githubusercontent.com/6517308/121813242-859a9700-cc6b-11eb-99c0-49e5bb63005b.jpg">

# Contents
* [Install](#install)
* [API](#api)
  * [import](#import)
  * [constructor](#constructor)
  * [add](#add)
  * [count](#count)
  * [next](#next)
  * [deleteByKey](#deletebykey)
  * [deleteByValue](#deletebyvalue)
  * [reset](#reset)
  * [clear](#clear)
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
const {
  SequentialRoundRobin,
  RandomRoundRobin,
  PriorityRoundRobin
} = require('round-robin-js');
```

#### TS
```js
import {
  SequentialRoundRobin,
  RandomRoundRobin,
  PriorityRoundRobin,
  RoundRobinItem // the internal item type
} from 'round-robin-js';
```

### constructor
All types accept an initial list of values. PriorityRoundRobin requires a compare function to select next item based on priority.

#### JS

```js
const cpusTable = new SequentialRoundRobin([1, 2, 3]);

const rockPaperScissors = new RandomRoundRobin(['Rock', 'Paper', 'Scissors']);

const availableServers = new PriorityRoundRobin(
  (a, b) => a.load - b.load
  [{ hostname: 's1.test.com', load: 40 }, { hostname: 's1.test.com', load: 30 }]
);
```

#### TS

```js
const cpusTable = new SequentialRoundRobin<number>([1, 2, 3]);

const rockPaperScissors = new RandomRoundRobin<string>(['Rock', 'Paper', 'Scissors']);

interface IServer {
  hostname: string;
  load: number;
}
const availableServers = new PriorityRoundRobin<IServer>(
  (a: IServer, b: IServer) => a.load - b.load
  [{ hostname: 's1.test.com', load: 40 }, { hostname: 's2.test.com', load: 30 }]
);
```

### add
adds a new item to the table.

```js
cpusTable.add(4); // { key: 3, value: 4 }
cpusTable.add(5); // { key: 4, value: 5 }

availableServers.add({ hostname: 's3.test.com', load: 15 }); // { key: 2, value: { hostname: 's3.test.com', load: 15 } }
availableServers.add({ hostname: 's4.test.com', load: 60 }); // { key: 3, value: { hostname: 's4.test.com', load: 60 } }
```

### count
returns the number of items in the table.

```js
console.log(cpusTable.count()); // 5
console.log(rockPaperScissors.count()); // 4
console.log(availableServers.count()); // 4
```

### next
returns the next item in the round.

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

### deleteByKey
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

### deleteByValue
deletes items with values that match a criteria from the table and returns the number of deleted items.

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

### reset
resets the table with the intial values.

```js
sequentialTable.reset();
console.log(sequentialTable.count()); // 3

randomTable.reset();
console.log(randomTable.count()); // 3
```

### clear
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
