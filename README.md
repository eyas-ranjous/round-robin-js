
# **round-robin-js**

[![npm](https://img.shields.io/npm/v/round-robin-js.svg)](https://www.npmjs.com/package/round-robin-js) [![npm](https://img.shields.io/npm/dm/round-robin-js.svg)](https://www.npmjs.com/package/round-robin-js) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/round-robin-js)

**round-robin-js** is a versatile library implementing the Round Robin data structure with support for various strategies:

| **Strategy**              | **Description**                                        |
|---------------------------|--------------------------------------------------------|
| **SequentialRoundRobin**  | Selects the next item in the order of insertion.       |
| **RandomRoundRobin**      | Selects the next item randomly.                        |
| **PriorityRoundRobin**    | Selects the next item based on its priority.           |

![round-robin-js](https://user-images.githubusercontent.com/6517308/121813242-859a9700-cc6b-11eb-99c0-49e5bb63005b.jpg)

---

## **Contents**
- [Installation](#installation)
- [Importing](#importing)
- [Usage Examples](#usage-examples)
- [API Documentation](#api-documentation)
  - [Constructor](#constructor)
  - [add](#add)
  - [next](#next)
  - [count](#count)
  - [deleteByKey](#deletebykey)
  - [deleteByValue](#deletebyvalue)
  - [reset](#reset)
  - [clear](#clear)
- [Build](#build)
- [License](#license)

---

## **Installation**

To install the library, use npm:

```bash
npm install --save round-robin-js
```

---

## **Importing**

### **CommonJS**

```javascript
const {
  SequentialRoundRobin,
  RandomRoundRobin,
  PriorityRoundRobin,
} = require('round-robin-js');
```

### **ES Modules**

```javascript
import {
  SequentialRoundRobin,
  RandomRoundRobin,
  PriorityRoundRobin,
  RoundRobinItem, // the internal item type
} from 'round-robin-js';
```

---

## **Usage Examples**

### **SequentialRoundRobin**
```javascript
const tasks = new SequentialRoundRobin(['Task 1', 'Task 2', 'Task 3']);
tasks.next(); // { key: 0, value: 'Task 1' }
tasks.next(); // { key: 1, value: 'Task 2' }
tasks.add('Task 4'); // Adds a new task
tasks.reset(); // Resets the sequence
```

### **RandomRoundRobin**
```javascript
const choices = new RandomRoundRobin(['Rock', 'Paper', 'Scissors']);
choices.next(); // Randomly selects an item
choices.add('Lizard'); // Adds a new choice
```

### **PriorityRoundRobin**
```javascript
const servers = new PriorityRoundRobin(
  (a, b) => a.load - b.load, // Compare function: lower load is prioritized
  [{ hostname: 's1', load: 40 }, { hostname: 's2', load: 20 }]
);
servers.next(); // { key: 1, value: { hostname: 's2', load: 20 } }
servers.add({ hostname: 's3', load: 10 }); // Adds a new server
```

---

## **API Documentation**

### **Constructor**

Initializes a round-robin instance. `PriorityRoundRobin` requires a comparison function for sorting.

#### **JavaScript Example**
```javascript
const rr = new SequentialRoundRobin([1, 2, 3]);
const priorityRR = new PriorityRoundRobin((a, b) => a.priority - b.priority, [{ value: 'A', priority: 1 }]);
```

#### **TypeScript Example**
```typescript
const rr = new SequentialRoundRobin<number>([1, 2, 3]);

interface Item {
  value: string;
  priority: number;
}
const priorityRR = new PriorityRoundRobin<Item>(
  (a: Item, b: Item) => a.priority - b.priority,
  [{ value: 'A', priority: 1 }]
);
```

---

### **add**

Adds a new item to the round robin.

```javascript
rr.add('New Item'); // Returns { key: <key>, value: 'New Item' }
```

---

### **next**

Selects and returns the next item based on the strategy.

```javascript
rr.next(); // Returns the next item
```

---

### **count**

Returns the total number of items.

```javascript
rr.count(); // Returns the count
```

---

### **deleteByKey**

Deletes an item by its unique key.

```javascript
rr.deleteByKey(1); // Returns true if successful, false otherwise
```

---

### **deleteByValue**

Deletes items that match a callback condition. Returns the count of deleted items.

```javascript
rr.deleteByValue((value) => value.includes('Item')); // Deletes matching items
```

---

### **reset**

Resets the selection to the start of the round.

```javascript
rr.reset();
```

---

### **clear**

Clears all items in the round robin.

```javascript
rr.clear();
```

---

## **Build**

To build the library:

```bash
npm run build
```

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](https://github.com/eyas-ranjous/round-robin-js/blob/main/LICENSE) for more details.

---
