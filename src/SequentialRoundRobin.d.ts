/**
 * round-robin-js
 * @copyright 2021 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

 import { DoublyLinkedList, DoublyLinkedListNode } from '@datastructures-js/linked-list';
 import { RoundRobin, RoundRobinItem } from './RoundRobin';
 
 export { RoundRobinItem } from './RoundRobin';
 
 export class SequentialRoundRobin<T> extends RoundRobin<T> {
   protected _items: DoublyLinkedList<RoundRobinItem<T>>;
   protected _itemNodes: Map<number, DoublyLinkedListNode<RoundRobinItem<T>>>;
   protected _currentNode: DoublyLinkedListNode<RoundRobinItem<T>> | null;
 
   constructor(values?: T[]);
 }
 