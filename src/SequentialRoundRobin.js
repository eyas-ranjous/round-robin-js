/**
 * round-robin-js
 * @copyright 2021 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

const { DoublyLinkedList } = require('@datastructures-js/linked-list');
const RoundRobin = require('./RoundRobin');

/**
 * @class
 */
class SequentialRoundRobin extends RoundRobin {
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
    this._items = new DoublyLinkedList();
    this._itemNodes = new Map();
    this._initialItems.forEach((item) => this.add(item));
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
    if (this._currentTurn && this._currentTurn.getValue().key === key) {
      this._currentTurn = this._currentTurn.getNext();
    }
    this._items.remove(this._itemNodes.get(key));
    return this._itemNodes.delete(key);
  }

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

  /**
   * Returns number of items on the table
   * @return {number}
   */
  count() {
    return this._items.count();
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
    this._items = new DoublyLinkedList();
    this._itemNodes = new Map();
    return super.clear();
  }
}

exports.SequentialRoundRobin = SequentialRoundRobin;
