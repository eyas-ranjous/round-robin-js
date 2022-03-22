/**
 * round-robin-js
 * @copyright 2021 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { MinPriorityQueue } = require('@datastructures-js/priority-queue');

const RoundRobin = require('./RoundRobin');

/**
 * @class
 */
class PriorityRoundRobin extends RoundRobin {
  /**
   * @constructor
   * @param {array} values
   */
  constructor(values) {
    super(values);
    this._init();
  }

  /**
   * @private
   */
  _createQueue() {
    return new MinPriorityQueue((queueItem) => queueItem.priority);
  }

  /**
   * @private
   */
  _init() {
    this._items = this._createQueue();
    this._round = this._createQueue();
    this._initialValues.forEach((value) => this.add(value));
  }

  /**
   * Adds a value to the table
   * @public
   * @param {any} value
   * @param {number} p
   * @return {object}
   */
  add(value, p) {
    let priority = +p;
    if (Number.isNaN(priority)) {
      if (!Number.isNaN(+value)) {
        priority = +value;
      } else {
        throw new Error('PriorityRoundRobin.add: missing numeric priority');
      }
    }
    const key = this._currentkey;
    const item = { key, value };
    this._items.enqueue({ priority, item });
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
    const updatedItems = this._createQueue();
    while (!this._items.isEmpty()) {
      const { priority, item } = this._items.dequeue();
      if (item.key !== key) {
        updatedItems.enqueue({ priority, item });
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
    const updatedItems = this._createQueue();
    while (!this._items.isEmpty()) {
      const { priority, item } = this._items.dequeue();
      if (!cb(item.value)) {
        updatedItems.enqueue({ priority, item });
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
    if (this._items.size() === 0 && this._round.size() === 0) {
      return null;
    }

    if (this._items.size() === 0) {
      this._items = this._round;
      this._round = this._createQueue();
    }

    const { priority, item } = this._items.dequeue();
    this._round.enqueue({ priority, item });
    return item;
  }

  /**
   * Returns number of items on the table
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
    this._items = this._createQueue();
    this._round = this._createQueue();
    return super.clear();
  }
}

exports.PriorityRoundRobin = PriorityRoundRobin;
