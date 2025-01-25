/**
 * round-robin-js
 * @copyright 2021 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

 import { RoundRobin, RoundRobinItem } from './RoundRobin';

 export { RoundRobinItem } from './RoundRobin';
 
 export class RandomRoundRobin<T> extends RoundRobin<T> {
   protected _items: Map<number, RoundRobinItem<T>>;
   protected _round: Set<number>;
 
   constructor(values?: T[]);
 }
 