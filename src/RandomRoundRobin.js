/**
 * round-robin-js
 * @copyright 2021 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const RoundRobin = require('./RoundRobin');

/**
 * @class
 */
class RandomRoundRobin extends RoundRobin {
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
  _init() {
    this._items = new Map();
    this._round = new Set();
    this._initialValues.forEach((value) => this.add(value));
  }

  /**
   * Adds a value to the table
   * @public
   * @param {number|string|object} value
   * @return {object}
   */
  add(value) {
    const key = this._currentkey;
    this._items.set(key, { key, value });
    this._currentkey++;
    return this._items.get(key);
  }

  /**
   * Deletes an item by its key from the table
   * @public
   * @param {number} key
   * @return {boolean}
   */
  deleteByKey(key) {
    if (!this._items.has(key)) {
      return false;
    }

    if (this._currentTurn && this._currentTurn.key === key) {
      this._currentTurn = this._nextTurn();
    }

    this._round.delete(key);
    return this._items.delete(key);
  }

  /**
   * Deletes items that their values match a criteria
   * @public
   * @param {function} cb
   * @return {number}
   */
  deleteByValue(cb) {
    let deleted = 0;
    this._items.forEach(({ key, value }) => {
      if (cb(value)) {
        this.deleteByKey(key);
        deleted += 1;
      }
    });
    return deleted;
  }

  /**
   * Selects the next item's key from the round
   * @public
   * @return {object}
   */
  _nextTurn() {
    if (this._currentTurn === null) {
      const keys = Array.from(this._items.keys());
      this._round = new Set(keys);
    }

    if (this._round.size === 0) {
      return null;
    }

    const roundKeys = Array.from(this._round);
    const selectedKey = roundKeys[Math.floor(Math.random() * roundKeys.length)];
    this._round.delete(selectedKey);
    return this._items.get(selectedKey);
  }

  /**
   * Selects the next item in the turn round randomly
   * @public
   * @return {object}
   */
  next() {
    if (this._items.size === 0) {
      return null;
    }

    if (this._currentTurn === null) {
      this._currentTurn = this._nextTurn();
    }

    const item = this._currentTurn;
    this._currentTurn = this._nextTurn();
    return item;
  }

  /**
   * Returns number of items
   * @return {number}
   */
  count() {
    return this._items.size;
  }

  /**
   * Clears the table
   * @public
   * @return {RoundRobin}
   */
  clear() {
    this._items = new Map();
    this._round = new Set();
    return super.clear();
  }
}

exports.RandomRoundRobin = RandomRoundRobin;
