# round-robin-js

[![npm](https://img.shields.io/npm/v/round-robin-js.svg)](https://www.npmjs.com/package/round-robin-js) [![npm](https://img.shields.io/npm/dm/round-robin-js.svg)](https://www.npmjs.com/package/round-robin-js) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/round-robin-js)

A JavaScript library that implements round-robin algorithms for managing items in a cyclic order. This library provides three types of round-robin implementations:

- **PriorityRoundRobin**: Processes items based on priority.
- **RandomRoundRobin**: Processes items in a random order.
- **SequentialRoundRobin**: Processes items in a sequential order.

## Installation

```bash
npm install round-robin-js
```

## Usage

### Importing the Library

```javascript
const { PriorityRoundRobin, RandomRoundRobin, SequentialRoundRobin } = require('round-robin-js');
```

## API Overview

### Common Methods (All Round-Robin Types)

All round-robin types share the following interface:

- **add(value)**: Adds a new item to the round-robin queue.
  - `value`: The value to add.
  - Returns: The added item.

- **deleteByKey(key)**: Deletes an item by its key.
  - `key`: The key of the item to delete.
  - Returns: `true` if the item was deleted, `false` otherwise.

- **deleteByValue(callback)**: Deletes items that satisfy the given callback function.
  - `callback`: A function that takes an item value and returns `true` if the item should be deleted.
  - Returns: The number of items deleted.

- **next()**: Retrieves the next item in the round-robin sequence.
  - Returns: The next item or `null` if the queue is empty.

- **count()**: Returns the total number of items in the round-robin queue.

- **clear()**: Clears all items from the round-robin queue.
  - Returns: The round-robin instance for chaining.

- **reset()**: Resets the round-robin to its initial state.
  - Returns: The round-robin instance for chaining.

---

## PriorityRoundRobin

### Description
Processes items based on priority, where the highest-priority item is processed first.

### Constructor
```javascript
new PriorityRoundRobin(compare, values = [])
```
- `compare`: A comparison function `(a, b) => number` to determine the priority of items.
- `values`: An optional array of initial values.

### Example
```javascript
const priorityRR = new PriorityRoundRobin((a, b) => b - a, [5, 2, 8]);
priorityRR.add(10);
console.log(priorityRR.next()); // { key: 3, value: 10 }
```

---

## RandomRoundRobin

### Description
Processes items in a random order. Each item is processed once per round before restarting.

### Constructor
```javascript
new RandomRoundRobin(values = [])
```
- `values`: An optional array of initial values.

### Example
```javascript
const randomRR = new RandomRoundRobin([1, 2, 3, 4]);
console.log(randomRR.next()); // Random item
console.log(randomRR.next()); // Another random item
```

---

## SequentialRoundRobin

### Description
Processes items in the order they were added, cycling through sequentially.

### Constructor
```javascript
new SequentialRoundRobin(values = [])
```
- `values`: An optional array of initial values.

### Example
```javascript
const sequentialRR = new SequentialRoundRobin(['A', 'B', 'C']);
console.log(sequentialRR.next()); // { key: 0, value: 'A' }
console.log(sequentialRR.next()); // { key: 1, value: 'B' }
console.log(sequentialRR.next()); // { key: 2, value: 'C' }
console.log(sequentialRR.next()); // { key: 0, value: 'A' } // Cycles back
```

---

## License

This library is licensed under the MIT License. Copyright 2021 Eyas Ranjous.
