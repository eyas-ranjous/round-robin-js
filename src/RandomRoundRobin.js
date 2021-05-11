/**
 * round-robin-js
 * @copyright 2021 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

const RoundRobin = require('./RoundRobin');

/**
 * @class
 */
class RandomRoundRobin extends RoundRobin {
  /**
   * @constructor
   * @param {array} items
   */
  constructor(items) {
    super(items);
    this._init();
  }

  /**
   * @private
   */
  _init() {
    this._items = new Map();
    this._keys = new Set();
    this._round = new Set();
    this._initialItems.forEach((item) => this.add(item));
  }

  /**
   * Adds an item and memoizes its key for random selection
   * @public
   * @return {object}
   */
  add(item) {
    const key = this._currentkey;
    this._items.set(key, { key, value: item });
    this._keys.add(key);
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
    this._keys.delete(key);
    this._round.delete(key);
    return this._items.delete(key);
  }

  /**
   * Selects the next item's key from the round
   * @public
   * @return {object}
   */
  _selectNextKey() {
    const keys = Array.from(this._round);
    if (keys.length === 0) {
      return null;
    }
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    this._round.delete(randomKey);
    return randomKey;
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
      this._round = new Set(this._keys);
      this._currentTurn = this._items.get(this._selectNextKey());
    }

    const item = this._currentTurn;
    this._currentTurn = this._items.get(this._selectNextKey()) || null;
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
}

exports.RandomRoundRobin = RandomRoundRobin;
