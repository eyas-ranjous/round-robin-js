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
   * @return {any} value
   */
  add(value) {
    const key = this._currentkey;
    this._items.set(key, { key, value });
    this._currentkey++;
    return this._items.get(key);
  }

  /**
   * Deletes an item with its key from the table
   * @public
   * @param {number} key
   * @return {boolean}
   */
  delete(key) {
    if (!this._items.has(key)) {
      return false;
    }

    if (this._currentTurn && this._currentTurn.key === key) {
      this._currentTurn = this._nextTurn();
      if (this._currentTurn === null) {
        this._completedRounds += 1;
      }
    }

    this._round.delete(key);
    return this._items.delete(key);
  }

  /**
   * Selects the next item's key from the round
   * @public
   * @return {object}
   */
  _nextTurn() {
    if (this._currentTurn === null) {
      this._round = new Set(Array.from(this._items.keys()));
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
    if (this._currentTurn === null) {
      this._completedRounds += 1;
    }

    return item;
  }

  /**
   * Returns number of items on the table
   * @return {number}
   */
  count() {
    return this._items.size;
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
    this._items = new Map();
    this._keys = new Set();
    this._round = new Set();
    return super.clear();
  }
}

exports.RandomRoundRobin = RandomRoundRobin;
