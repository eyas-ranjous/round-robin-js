/**
 * round-robin-js
 * @copyright 2021 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { DoublyLinkedList } = require('@datastructures-js/linked-list');
const RoundRobin = require('./RoundRobin');

/**
 * @class
 */
class SequentialRoundRobin extends RoundRobin {
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
    this._items = new DoublyLinkedList();
    this._itemNodes = new Map();
    this._initialValues.forEach((value) => this.add(value));
  }

  /**
   * Adds a new item to the table
   * @public
   * @param {number|string|object} value
   * @return {object}
   */
  add(value) {
    this._itemNodes.set(
      this._currentkey,
      this._items.insertLast({ key: this._currentkey++, value })
    );
    return this._items.tail().getValue();
  }

  /**
   * Deletes an item by its key from the table
   * @public
   * @param {number} key
   * @return {boolean}
   */
  deleteByKey(key) {
    if (!this._itemNodes.has(key)) {
      return false;
    }

    if (this._currentTurn && this._currentTurn.getValue().key === key) {
      this._currentTurn = this._currentTurn.getNext();
    }

    this._items.remove(this._itemNodes.get(key));
    return this._itemNodes.delete(key);
  }

  /**
   * Deletes items that their values match a criteria
   * @public
   * @param {function} cb
   * @return {number}
   */
  deleteByValue(cb) {
    const deletedKeys = [];
    this._items.forEach((itemNode) => {
      const { key, value } = itemNode.getValue();
      if (cb(value)) {
        deletedKeys.push(key);
      }
    });
    deletedKeys.map((key) => this.deleteByKey(key));
    return deletedKeys.length;
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
    return item;
  }

  /**
   * Returns number of items
   * @return {number}
   */
  count() {
    return this._items.count();
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
