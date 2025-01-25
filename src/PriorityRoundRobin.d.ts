/**
 * round-robin-js
 * @copyright 2021 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

 import { PriorityQueue } from '@datastructures-js/priority-queue';
 import { RoundRobin, RoundRobinItem } from './RoundRobin';
 
 export { RoundRobinItem } from './RoundRobin';
 
 export class PriorityRoundRobin<T> extends RoundRobin<T> {
   protected _compare: (a: RoundRobinItem<T>, b: RoundRobinItem<T>) => number;
   protected _items: PriorityQueue<RoundRobinItem<T>>;
   protected _round: PriorityQueue<RoundRobinItem<T>>;
 
   constructor(compare: (a: T, b: T) => number, values?: T[]);
 }
 