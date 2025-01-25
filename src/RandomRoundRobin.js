/**
 * round-robin-js
 * @copyright 2021 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { RoundRobin } = require('./RoundRobin');

/**
  * @template T
  * @extends {RoundRobin<T>}
  */
class RandomRoundRobin extends RoundRobin {
  /**
    * @constructor
    * @param {T[]} [values=[]]
    */
  constructor(values = []) {
    super(values);
    this._init();
  }

  /**
    * @private
    */
  _init() {
    /**
      * @private
      * @type {Map<number, RoundRobinItem<T>>}
      */
    this._items = new Map();

    /**
      * @private
      * @type {Set<number>}
      */
    this._round = new Set();

    this._initialValues.forEach((value) => this.add(value));
  }

  /**
    * @public
    * @param {T} value
    * @returns {RoundRobinItem<T>}
    */
  add(value) {
    const item = { key: this._currentKey, value };
    this._items.set(this._currentKey++, item);
    return item;
  }

  /**
    * @public
    * @param {number} key
    * @returns {boolean}
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
    * @public
    * @param {function(T): boolean} cb
    * @returns {number}
    */
  deleteByValue(cb) {
    let deleted = 0;
    this._items.forEach(({ key, value }) => {
      if (cb(value)) {
        this.deleteByKey(key);
        deleted++;
      }
    });
    return deleted;
  }

  /**
    * @private
    * @returns {RoundRobinItem<T> | null}
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
    return this._items.get(selectedKey) || null;
  }

  /**
    * @public
    * @returns {RoundRobinItem<T> | null}
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
    * @public
    * @returns {number}
    */
  count() {
    return this._items.size;
  }

  /**
    * @public
    * @returns {this}
    */
  clear() {
    this._items.clear();
    this._round.clear();
    super.clear();
    return this;
  }
}

module.exports = { RandomRoundRobin };
