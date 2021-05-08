/**
 * round-robin-js
 * @copyright 2021 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

const { DoublyLinkedList } = require('@datastructures-js/linked-list');

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
  constructor(options = {}) {
    this._options = options;
    this._initItems();
    this._currentTurn = null;
    this._completedRounds = 0;
  }

  /**
   * Initializes the table items
   * @private
   */
  _initItems() {
    const items = this._options.items || [];
    if (!Array.isArray(items)) {
      throw new Error(`items must be an array`);      
    }
    this._items = new DoublyLinkedList();
    this._itemNodes = new Map();
    this._currentkey = 0;
    items.forEach((item) => {
      this._itemNodes.set(
        this._currentkey,
        this._items.insertLast({ key: this._currentkey++, value: item })
      );
    });
  }

  /**
   * Returns number of items on the table
   * @return {number}
   */
  count() {
    return this._items.count();
  }

  /**
   * Resets the round
   * @public
   * @return {RoundRobin}
   */
  reset() {
    this._currentTurn = null;
    return this;
  }

  /**
   * Clears the table
   * @public
   * @return {RoundRobin}
   */
  clear() {
    this._initItems();
    this._currentTurn = null;
    return this;
  }

  /**
   * Adds a new item to the table
   * @public
   * @param {any} item
   * @return {object}
   */
  add(item) {
    this._itemNodes.set(
      this._currentkey,
      this._items.insertLast({ key: this._currentkey++, value: item })
    );
    return this._items.tail().getValue();
  }

  /**
   * Deletes an item from the table
   * @public
   * @param {number} key
   * @return {boolean}
   */
  delete(key) {
    this._items.remove(this._itemNodes.get(key));
    return this._itemNodes.delete(key);
  }

  /**
   * Returns number of completed rounds of the table
   * @public
   * @return {number}
   */
  completedRounds() {
    return this._completedRounds;
  }
}

module.exports = RoundRobin;
