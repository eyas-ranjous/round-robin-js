/**
 * round-robin-js
 * @copyright 2021 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

const RoundRobin = require('./RoundRobin');

/**
 * @class
 */
class SequentialRoundRobin extends RoundRobin {
  /**
   * Selects the next item in the turn round sequentially
   * @public
   * @return {object}
   */
  next() {
    if (this._items.isEmpty()) {
      return null;
    }

    if (this._currentTurn === null) {
      this._currentTurn = this._items.head();
    }

    const item = this._currentTurn.getValue();
    this._currentTurn = this._currentTurn.getNext();
    if (this._currentTurn === null) {
      this._completedRounds += 1;
    }

    return item;
  }
}

module.exports = SequentialRoundRobin;
