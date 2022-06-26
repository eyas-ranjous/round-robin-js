/**
 * round-robin-js
 * @copyright 2021 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

/**
 * Represents a round robin table
 * @abstract
 * @class
 */
class RoundRobin {
  /**
   * @constructor
   * @param {array} values
   */
  constructor(values = []) {
    if (values && !Array.isArray(values)) {
      throw new Error('RoundRobin constructor: values must be an array');
    }

    this._initialValues = values;
    this._currentkey = 0;
    this._currentTurn = null;
  }

  /**
   * Resets the table
   * @public
   * @return {RoundRobin}
   */
  reset() {
    this._currentkey = 0;
    this._currentTurn = null;
    return this;
  }

  /**
   * Clears the table
   * @public
   * @return {RoundRobin}
   */
  clear() {
    this._currentkey = 0;
    this._currentTurn = null;
    this._initialValues = [];
    return this;
  }
}

module.exports = RoundRobin;
