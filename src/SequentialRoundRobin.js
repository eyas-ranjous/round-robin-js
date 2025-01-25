/**
 * round-robin-js
 * @copyright 2021 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { DoublyLinkedList } = require('@datastructures-js/linked-list');
const { RoundRobin } = require('./RoundRobin');

/**
  * @template T
  * @extends {RoundRobin<T>}
  */
class SequentialRoundRobin extends RoundRobin {
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
      * @type {DoublyLinkedList}
      */
    this._items = new DoublyLinkedList();

    /**
      * @private
      * @type {Map<number, import('@datastructures-js/linked-list').DoublyLinkedListNode>}
      */
    this._itemNodes = new Map();

    this._initialValues.forEach((value) => this.add(value));
  }

  /**
    * @public
    * @param {T} value
    * @returns {RoundRobinItem<T>}
    */
  add(value) {
    const node = this._items.insertLast({
      key: this._currentKey,
      value
    });
    this._itemNodes.set(this._currentKey++, node);
    return node.getValue();
  }

  /**
    * @public
    * @param {number} key
    * @returns {boolean}
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
    * @public
    * @param {function(T): boolean} cb
    * @returns {number}
    */
  deleteByValue(cb) {
    const deletedKeys = [];
    this._items.forEach((itemNode) => {
      const { key, value } = itemNode.getValue();
      if (cb(value)) {
        deletedKeys.push(key);
      }
    });
    return deletedKeys.map((key) => this.deleteByKey(key)).length;
  }

  /**
    * @public
    * @returns {RoundRobinItem<T> | null}
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
    * @public
    * @returns {number}
    */
  count() {
    return this._items.count();
  }

  /**
    * @public
    * @returns {this}
    */
  clear() {
    this._items = new DoublyLinkedList();
    this._itemNodes = new Map();
    this._currentKey = 0;
    super.clear();
    return this;
  }
}

module.exports = { SequentialRoundRobin };
