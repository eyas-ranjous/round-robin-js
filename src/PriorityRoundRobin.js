/**
 * round-robin-js
 * @copyright 2021 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { PriorityQueue } = require('@datastructures-js/priority-queue');

const RoundRobin = require('./RoundRobin');

/**
 * @class
 */
class PriorityRoundRobin extends RoundRobin {
  /**
   * @constructor
   * @param {array} values
   */
  constructor(compare, values) {
    if (typeof compare !== 'function') {
      throw new Error('PriorityRoundRobin constructor expects a compare function');
    }
    super(values);
    this._compare = (a, b) => compare(a.value, b.value);
    this._init();
  }

  /**
   * initialize round robin props
   * @private
   */
  _init() {
    this._items = this._createQueue();
    this._round = this._createQueue();
    this._initialValues.forEach((value) => this.add(value));
  }

  /**
   * Creates a priority queue
   * @private
   */
  _createQueue() {
    return new PriorityQueue(this._compare);
  }

  /**
   * Adds a value to the table
   * @public
   * @param {number|string|object} value
   * @return {object}
   */
  add(value) {
    const key = this._currentkey;
    const item = { key, value };
    this._items.push(item);
    this._currentkey++;
    return item;
  }

  /**
   * Deletes an item by its key from the table
   * @public
   * @param {number} key
   * @return {boolean}
   */
  deleteByKey(key) {
    let deleted = false;
    let updatedItems = this._createQueue();
    while (!this._items.isEmpty()) {
      const item = this._items.pop();
      if (item.key !== key) {
        updatedItems.push(item);
      } else {
        deleted = true;
      }
    }
    this._items = updatedItems;
    if (deleted) {
      return deleted;
    }

    updatedItems = this._createQueue();
    while (!this._round.isEmpty()) {
      const item = this._round.pop();
      if (item.key !== key) {
        updatedItems.push(item);
      } else {
        deleted = true;
      }
    }
    this._round = updatedItems;
    return deleted;
  }

  /**
   * Deletes items that their values match a criteria
   * @public
   * @param {function} cb
   * @return {number}
   */
  deleteByValue(cb) {
    let deleted = 0;
    let updatedItems = this._createQueue();
    while (!this._items.isEmpty()) {
      const item = this._items.pop();
      if (!cb(item.value)) {
        updatedItems.push(item);
      } else {
        deleted += 1;
      }
    }
    this._items = updatedItems;
    updatedItems = this._createQueue();
    while (!this._round.isEmpty()) {
      const item = this._round.pop();
      if (!cb(item.value)) {
        updatedItems.push(item);
      } else {
        deleted += 1;
      }
    }
    this._round = updatedItems;
    return deleted;
  }

  /**
   * Selects the next item in the round from the queue
   * @public
   * @return {object}
   */
  next() {
    if (this._items.isEmpty() && this._round.isEmpty()) {
      return null;
    }

    if (this._items.isEmpty()) {
      this._items = this._round;
      this._round = this._createQueue();
    }

    this._currentTurn = this._items.pop();
    this._round.push(this._currentTurn);
    return this._currentTurn;
  }

  /**
   * Returns number of items
   * @return {number}
   */
  count() {
    return this._items.size() + this._round.size();
  }

  /**
   * Clears the table
   * @public
   * @return {RoundRobin}
   */
  clear() {
    this._items = this._createQueue();
    this._round = this._createQueue();
    return super.clear();
  }
}

exports.PriorityRoundRobin = PriorityRoundRobin;
