/**
 * round-robin-js
 * @copyright 2021 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

/**
 * Represents a round robin table
 * @abstract
 * @class
 */
class RoundRobin {
  /**
   * @constructor
   * @param {object} options
   */
  constructor(options) {
    if (options.items && !Array.isArray(options.items)) {
      throw new Error('items must be an array');
    }
    this._initialItems = options.items;
    this._currentkey = 0;
    this._completedRounds = 0;
    this._currentTurn = null;
  }

  /**
   * Returns number of completed round of turns
   * @public
   * @return {number}
   */
  completedRounds() {
    return this._completedRounds;
  }

  /**
   * Clears the table
   * @public
   * @return {RoundRobin}
   */
  clear() {
    this._currentkey = 0;
    this._completedRounds = 0;
    this._currentTurn = null;
    return this;
  }
}

module.exports = RoundRobin;
