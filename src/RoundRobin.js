/**
 * round-robin-js
 * @copyright 2021 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

class RoundRobinError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RoundRobinError';
  }
}

/**
 * @template T
 */
class RoundRobin {
  /**
   * @template T
   * @typedef {Object} RoundRobinItem
   * @property {number} key Unique identifier
   * @property {T} value Stored value
   */

  constructor(values = []) {
    if (values && !Array.isArray(values)) {
      throw new RoundRobinError('values must be an array');
    }
    this._initialValues = [...values];
    this._currentKey = 0;
    this._currentTurn = null;
  }

  /**
   * @public
   * @abstract
   * @param {T} value
   * @returns {RoundRobinItem<T>}
   */
  add(value) {
    throw new RoundRobinError('add() must be implemented');
  }

  /**
   * @public
   * @abstract
   * @param {number} key
   * @returns {boolean}
   */
  deleteByKey(key) {
    throw new RoundRobinError('deleteByKey() must be implemented');
  }

  /**
   * @public
   * @abstract
   * @param {function(T): boolean} cb
   * @returns {number}
   */
  deleteByValue(cb) {
    throw new RoundRobinError('deleteByValue() must be implemented');
  }

  /**
   * @public
   * @abstract
   * @returns {RoundRobinItem<T> | null}
   */
  next() {
    throw new RoundRobinError('next() must be implemented');
  }

  /**
   * @public
   * @abstract
   * @returns {number}
   */
  count() {
    throw new RoundRobinError('count() must be implemented');
  }

  reset() {
    this._currentKey = 0;
    this._currentTurn = null;
    return this;
  }

  clear() {
    this._initialValues = [];
    return this.reset();
  }
}

module.exports = { RoundRobin, RoundRobinError };
