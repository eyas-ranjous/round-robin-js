/**
 * round-robin-js
 * @copyright 2021 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { PriorityQueue } = require('@datastructures-js/priority-queue');
const { RoundRobin, RoundRobinError } = require('./RoundRobin');

/**
  * @template T
  * @extends {RoundRobin<T>}
  */
class PriorityRoundRobin extends RoundRobin {
  /**
    * @constructor
    * @param {(a: T, b: T) => number} compare
    * @param {T[]} [values=[]]
    */
  constructor(compare, values = []) {
    if (typeof compare !== 'function') {
      throw new RoundRobinError('PriorityRoundRobin constructor expects a compare function');
    }
    super(values);

    /** @private */
    this._compare = (a, b) => compare(a.value, b.value);
    this._init();
  }

  /**
    * @private
    */
  _init() {
    /**
      * @private
      * @type {PriorityQueue<RoundRobinItem<T>>}
      */
    this._items = this._createQueue();

    /**
      * @private
      * @type {PriorityQueue<RoundRobinItem<T>>}
      */
    this._round = this._createQueue();

    this._initialValues.forEach((value) => this.add(value));
  }

  /**
    * @private
    * @returns {PriorityQueue<RoundRobinItem<T>>}
    */
  _createQueue() {
    return new PriorityQueue(this._compare);
  }

  /**
    * @public
    * @param {T} value
    * @returns {RoundRobinItem<T>}
    */
  add(value) {
    const item = { key: this._currentKey, value };
    this._items.push(item);
    this._currentKey++;
    return item;
  }

  /**
    * @public
    * @param {number} key
    * @returns {boolean}
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
      return true;
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
    * @public
    * @param {function(T): boolean} cb
    * @returns {number}
    */
  deleteByValue(cb) {
    let deleted = 0;
    let updatedItems = this._createQueue();

    while (!this._items.isEmpty()) {
      const item = this._items.pop();
      if (!cb(item.value)) {
        updatedItems.push(item);
      } else {
        deleted++;
      }
    }
    this._items = updatedItems;

    updatedItems = this._createQueue();
    while (!this._round.isEmpty()) {
      const item = this._round.pop();
      if (!cb(item.value)) {
        updatedItems.push(item);
      } else {
        deleted++;
      }
    }
    this._round = updatedItems;
    return deleted;
  }

  /**
    * @public
    * @returns {RoundRobinItem<T> | null}
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
    * @public
    * @returns {number}
    */
  count() {
    return this._items.size() + this._round.size();
  }

  /**
     * @public
     * @returns {this}
     */
  reset() {
    this._items = this._createQueue();
    this._round = this._createQueue();
    this._initialValues.forEach((value) => this.add(value));
    super.reset();
    return this;
  }

  /**
    * @public
    * @returns {this}
    */
  clear() {
    this._items = this._createQueue();
    this._round = this._createQueue();
    super.clear();
    return this;
  }
}

module.exports = { PriorityRoundRobin };
