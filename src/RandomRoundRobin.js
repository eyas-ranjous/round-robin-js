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
    this._keys = new Set();
    this._values = new Map();
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
    this._keys.add(key);
    this._values.set(value, [...(this._values.get(value) || []), key]);
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
    if (!this._keys.has(key)) {
      return false;
    }

    if (this._currentTurn && this._currentTurn.key === key) {
      this._currentTurn = this._selectNextItem();
      if (this._currentTurn === null) {
        this._completedRounds += 1;
      }
    }

    this._keys.delete(key);
    this._round.delete(key);

    return this._items.delete(key);
  }

  /**
   * Deletes all items that match a value
   * @public
   * @param {any} value
   * @return {boolean}
   */
  deleteByValue(value) {
    if (!this._values.has(value)) {
      return false;
    }

    this._values.get(value).forEach((key) => {
      this.deleteByKey(key);
    });

    return this._values.delete(value);
  }

  /**
   * Selects the next item's key from the round
   * @public
   * @return {object}
   */
  _selectNextItem() {
    if (this._currentTurn === null) {
      this._round = new Set(this._keys);
    }

    const keys = Array.from(this._round);
    if (keys.length === 0) {
      return null;
    }

    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    this._round.delete(randomKey);
    return this._items.get(randomKey);
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
      this._currentTurn = this._selectNextItem();
    }

    const item = this._currentTurn;
    this._currentTurn = this._selectNextItem();
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
    this._keys = new Set();
    this._values = new Map();
    this._items = new Map();
    this._round = new Set();
    this._initialValues = [];
    return super.clear();
  }
}

exports.RandomRoundRobin = RandomRoundRobin;
