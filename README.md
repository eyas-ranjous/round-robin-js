# round-robin-js

[![npm](https://img.shields.io/npm/v/round-robin-js.svg)](https://www.npmjs.com/package/round-robin-js) [![npm](https://img.shields.io/npm/dm/round-robin-js.svg)](https://www.npmjs.com/package/round-robin-js)

A lightweight and flexible library for implementing different types of Round Robin scheduling in JavaScript.

## Overview

This library provides three implementations of the Round Robin scheduling algorithm:

1. **PriorityRoundRobin**: Processes items based on a priority queue.
2. **RandomRoundRobin**: Randomly selects items for processing.
3. **SequentialRoundRobin**: Processes items in a fixed sequential order.

The library is designed with a clean API and supports common operations like adding items, removing items by key or value, iterating to the next item, and resetting or clearing the scheduler.

## Installation

Install the library using npm:

```bash
npm install round-robin-js
```


## Usage

### 1. Priority Round Robin

The `PriorityRoundRobin` class processes items based on their priority.

```javascript
const { PriorityRoundRobin } = require('round-robin-js');

// Define a compare function for priority
const compare = (a, b) => a - b;

// Create a priority round robin instance
const priorityRR = new PriorityRoundRobin(compare);

// Add items with priority
priorityRR.add(5);
priorityRR.add(3);
priorityRR.add(8);

// Get the next item based on priority
console.log(priorityRR.next()); // { key: 1, value: 3 }

// Count items
console.log(priorityRR.count()); // 2

// Reset the scheduler
priorityRR.reset();
```

### 2. Random Round Robin

The `RandomRoundRobin` class selects items randomly.

```javascript
const { RandomRoundRobin } = require('round-robin-js');

// Create a random round robin instance
const randomRR = new RandomRoundRobin();

// Add items
randomRR.add('A');
randomRR.add('B');
randomRR.add('C');

// Get the next random item
console.log(randomRR.next()); // { key: 0, value: 'B' }

// Delete an item by key
randomRR.deleteByKey(1);

// Count items
console.log(randomRR.count()); // 2

// Clear all items
randomRR.clear();
```

### 3. Sequential Round Robin

The `SequentialRoundRobin` class processes items sequentially.

```javascript
const { SequentialRoundRobin } = require('round-robin-js');

// Create a sequential round robin instance
const sequentialRR = new SequentialRoundRobin();

// Add items
sequentialRR.add(1);
sequentialRR.add(2);
sequentialRR.add(3);

// Get the next item sequentially
console.log(sequentialRR.next()); // { key: 0, value: 1 }
console.log(sequentialRR.next()); // { key: 1, value: 2 }

// Delete an item by value
sequentialRR.deleteByValue((value) => value === 2);

// Count items
console.log(sequentialRR.count()); // 2

// Clear all items
sequentialRR.clear();
```

## API Reference

### Common API Methods

All implementations inherit the following methods from the base class:

- **`add(value: T): RoundRobinItem<T>`**
  - Adds an item to the scheduler.
  - Returns the added item.

- **`deleteByKey(key: number): boolean`**
  - Deletes an item by its key.
  - Returns `true` if an item was deleted, otherwise `false`.

- **`deleteByValue(callback: (value: T) => boolean): number`**
  - Deletes items that match the given condition.
  - Returns the count of deleted items.

- **`next(): RoundRobinItem<T> | null`**
  - Retrieves the next item in the scheduler.
  - Returns `null` if the scheduler is empty.

- **`count(): number`**
  - Returns the number of items in the scheduler.

- **`reset(): this`**
  - Resets the scheduler to its initial state.

- **`clear(): this`**
  - Clears all items in the scheduler.

### PriorityRoundRobin

- **`constructor(compare: (a: T, b: T) => number, values?: T[])`**
  - Initializes a new `PriorityRoundRobin` instance.

### RandomRoundRobin

- **`constructor(values?: T[])`**
  - Initializes a new `RandomRoundRobin` instance.

### SequentialRoundRobin

- **`constructor(values?: T[])`**
  - Initializes a new `SequentialRoundRobin` instance.

## License

MIT License. See [LICENSE](LICENSE) for details.
