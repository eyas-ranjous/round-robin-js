# round-robin-js

[![npm](https://img.shields.io/npm/v/round-robin-js.svg)](https://www.npmjs.com/package/round-robin-js) [![npm](https://img.shields.io/npm/dm/round-robin-js.svg)](https://www.npmjs.com/package/round-robin-js) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/round-robin-js)

An implementation of the round robin as a data structure. The following strategies are implemented:
<table>
  <tr>
    <td><b>SequentialRoundRobin</b></td>
    <td>selects the next item based on the order of insertion</td>
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
<br/>

<img src="https://user-images.githubusercontent.com/6517308/121813242-859a9700-cc6b-11eb-99c0-49e5bb63005b.jpg">

# Contents
* [Install](#install)
* [require](#import)
* [import](#import)
* [API](#api)
  * [constructor](#constructor)
  * [add](#add)
  * [next](#next)
  * [count](#count)
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

## require
```js
const {
  SequentialRoundRobin,
  RandomRoundRobin,
  PriorityRoundRobin
} = require('round-robin-js');
```

## import
```js
import {
  SequentialRoundRobin,
  RandomRoundRobin,
  PriorityRoundRobin,
  RoundRobinItem // the internal item type
} from 'round-robin-js';
```

## API

### constructor
All types accept an initial list of values. PriorityRoundRobin requires a compare function to select next item based on priority.

#### JS

```js
const cpusTable = new SequentialRoundRobin([1, 2, 3]);

const rockPaperScissors = new RandomRoundRobin(['Rock', 'Paper', 'Scissors']);

const availableServers = new PriorityRoundRobin(
  (a, b) => a.load - b.load, // select next available server with lowest load
  [{ hostname: 's1.test.com', load: 40 }, { hostname: 's2.test.com', load: 30 }]
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
  (a: IServer, b: IServer) => a.load - b.load, // select next available server with lowest load
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

### next
selects and returns the next item in the round.

```js
// first round
cpusTable.next(); // { key: 0, value: 1 }
cpusTable.next(); // { key: 1, value: 2 }
cpusTable.next(); // { key: 2, value: 3 }
cpusTable.next(); // { key: 3, value: 4 }
cpusTable.next(); // { key: 4, value: 5 }
// second round ...
cpusTable.next(); // { key: 0, value: 1 }

// first round
rockPaperScissors.next(); // { key: 1, value: 'Paper' }
rockPaperScissors.next(); // { key: 0, value: 'Rock' }
rockPaperScissors.next(); // { key: 2, value: 'Scissors' }
// second round ...
rockPaperScissors.next(); // { key: 0, value: 'Rock' }

availableServers.next(); // { key: 2, value: { hostname: 's3.test.com', load: 15 } }
availableServers.next(); // { key: 1, value: { hostname: 's2.test.com', load: 30 } }
availableServers.next(); // { key: 0, value: { hostname: 's1.test.com', load: 40 } }
availableServers.next(); // { key: 3, value: { hostname: 's4.test.com', load: 60 } }
// second round ...
availableServers.next(); // { key: 2, value: { hostname: 's3.test.com', load: 15 } }
```

### count
returns the number of items in the table.

```js
cpusTable.count(); // 5
rockPaperScissors.count(); // 3
availableServers.count(); // 4
```

### deleteByKey
deletes an item from the table by its key.

```js
cpusTable.deleteByKey(1); // 2 is deleted
cpusTable.count(); // 4

availableServers.deleteByKey(2); // true / { hostname: 's3.test.com', load: 15 } is deleted
availableServers.count(); // 3
```

### deleteByValue
accepts a callback to delete items that match a criteria from the table and returns the count of deleted.

```js
availableServers.deleteByValue((s) => s.load > 30); // 2
availableServers.next(); // { key: 1, value: { hostname: 's2.test.com', load: 30 } }
availableServers.next(); // { key: 1, value: { hostname: 's2.test.com', load: 30 } }
```

### reset
resets the round selection from the start.

```js
cpusTable.next(); // { key: 1, value: 2 }
cpusTable.next(); // { key: 2, value: 3 }
cpusTable.reset();
cpusTable.next(); // { key: 0, value: 1 }
cpusTable.next(); // { key: 1, value: 2 }

availableServers.next(); // { key: 1, value: { hostname: 's2.test.com', load: 30 } }
availableServers.add({ hostname: 's99.test.com', load: 10 });
availableServers.next(); // { key: 4, value: { hostname: 's99.test.com', load: 10 } }
availableServers.reset();
availableServers.next(); // { key: 4, value: { hostname: 's99.test.com', load: 10 } }
```

### clear
clears all values in the table.

```js
cpusTable.clear();
cpusTable.count(); // 0
cpusTable.next(); // null

rockPaperScissors.clear();
rockPaperScissors.count(); // 0
rockPaperScissors.next(); // null

availableServers.clear();
availableServers.count(); // 0
availableServers.next(); // null
```

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/eyas-ranjous/round-robin-js/blob/main/LICENSE)
