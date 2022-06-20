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
    super(values);
    this._compare = (a, b) => compare(a.value, b.value);
    this._init();
  }

  _init() {
    this._items = new PriorityQueue(this._compare);
    this._round = [];
    this._initialValues.forEach((value) => this.add(value));
  }

  /**
   * Adds a value to the table
   * @public
   * @param {any} value
   * @param {number} p
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
    const updatedItems = new PriorityQueue(this._compare);
    while (!this._items.isEmpty()) {
      const { priority, item } = this._items.pop();
      if (item.key !== key) {
        updatedItems.push({ priority, item });
      } else {
        deleted = true;
      }
    }
    this._items = updatedItems;
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
    const updatedItems = new PriorityQueue(this._compare);
    while (!this._items.isEmpty()) {
      const { priority, item } = this._items.pop();
      if (!cb(item.value)) {
        updatedItems.push({ priority, item });
      } else {
        deleted += 1;
      }
    }
    this._items = updatedItems;
    return deleted;
  }

  /**
   * Selects the next item in the round from the queue
   * @public
   * @return {object}
   */
  next() {
    if (this._items.isEmpty() && this._round.length === 0) {
      return null;
    }

    if (this._currentTurn === null) {
      if (this._items.isEmpty()) {
        this._items = new PriorityQueue(this._compare, this._round.slice());
        this._round = [];
      }
      this._currentTurn = this._items.pop();
    }

    const item = this._currentTurn;
    this._currentTurn = this._items.pop();
    this._round.push(item);
    return item;
  }

  /**
   * Returns number of remaining items on the table
   * @return {number}
   */
  count() {
    return this._items.size();
  }

  /**
   * Resets the table
   * @public
   * @return {RoundRobin}
   */
  reset() {
    super.clear();
    this._init();
    return this;
  }

  /**
   * Clears the table
   * @public
   * @return {RoundRobin}
   */
  clear() {
    this._items = this._createQueue(this._compare);
    return super.clear();
  }
}

exports.PriorityRoundRobin = PriorityRoundRobin;
