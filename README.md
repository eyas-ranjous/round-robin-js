# round-robin-js

[![npm](https://img.shields.io/npm/v/round-robin-js.svg)](https://www.npmjs.com/package/round-robin-js) [![npm](https://img.shields.io/npm/dm/round-robin-js.svg)](https://www.npmjs.com/package/round-robin-js)

A JavaScript library that implements round-robin algorithms for managing items in a cyclic order. This library provides three types of round-robin implementations:

- **SequentialRoundRobin**: Processes items in a sequential order.
- **RandomRoundRobin**: Processes items in a random order.
- **PriorityRoundRobin**: Processes items based on priority.

It also has TypeScript definitions for all classes.

## Installation

```bash
npm install round-robin-js
```

## API

### Import

```javascript
// JS
const {
  PriorityRoundRobin,
  RandomRoundRobin,
  SequentialRoundRobin
} = require('round-robin-js');

// TS
import {
  PriorityRoundRobin,
  RandomRoundRobin,
  SequentialRoundRobin,
  RoundRobinItem
} from 'round-robin-js';
```

### Common Methods

All round-robin types share the following interface:

- **add(value)**: Adds a new item.
  - `value`: The value to add.
  - Returns: The added item (`RoundRobinItem<T>`).

- **deleteByKey(key)**: Deletes an item by its key.
  - `key`: The key of the item to delete.
  - Returns: `true` if the item was deleted, `false` otherwise.

- **deleteByValue(callback)**: Deletes items that satisfy the given callback function.
  - `callback`: A function that takes an item value and returns `true` if the item should be deleted.
  - Returns: The number of items deleted.

- **next()**: Retrieves the next item in the round-robin sequence.
  - Returns: The next item (`RoundRobinItem<T>`) or `null` if the queue is empty.

- **count()**: Returns the total number of items in the round-robin.

- **clear()**: Clears all items from the round-robin.
  - Returns: The round-robin instance for chaining.

- **reset()**: Resets the round-robin to its initial state.
  - Returns: The round-robin instance for chaining.

### SequentialRoundRobin
Processes items in the order they were added, cycling through sequentially.

#### Constructor
```ts
new SequentialRoundRobin<T>(values?: T[])
```
- `values`: An optional array of initial values.

#### Example
```js
const sequentialRR = new SequentialRoundRobin(['A', 'B', 'C']);
console.log(sequentialRR.next()); // { key: 0, value: 'A' }
console.log(sequentialRR.next()); // { key: 1, value: 'B' }
console.log(sequentialRR.next()); // { key: 2, value: 'C' }
console.log(sequentialRR.next()); // { key: 0, value: 'A' } // cycles back
```

### RandomRoundRobin
Processes items in a random order. Each item is processed once per round before restarting.

#### Constructor
```ts
new RandomRoundRobin<T>(values?: T[])
```
- `values`: An optional array of initial values.

#### Example
```js
const randomRR = new RandomRoundRobin([1, 2, 3, 4]);
console.log(randomRR.next()); // A random item
console.log(randomRR.next()); // Another random item
```

### PriorityRoundRobin
Processes items based on priority, where the highest-priority item is processed first (depending on your compare function).

#### Constructor
```ts
new PriorityRoundRobin<T>(
  compare: (a: T, b: T) => number,
  values?: T[]
)
```
- `compare`: A comparison function `(a, b) => number` to determine priority of items.
- `values`: An optional array of initial values.

#### Example
```js
const priorityRR = new PriorityRoundRobin((a, b) => b - a, [5, 2, 8]);
priorityRR.add(10);
console.log(priorityRR.next()); // { key: 3, value: 10 }
```

### RoundRobinItem

Each item in the round-robin is represented as an object with the following shape:

```ts
interface RoundRobinItem<T> {
  key: number; // A unique sequential key
  value: T;    // The original value
}
```


## License

This library is licensed under the MIT License. See [LICENSE](https://github.com/eyas-ranjous/round-robin/blob/main/LICENSE) for details.
