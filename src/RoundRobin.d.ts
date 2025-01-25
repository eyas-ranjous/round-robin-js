/**
 * round-robin-js
 * @copyright 2021 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

 export class RoundRobinError extends Error {
  constructor(message: string);
}

export interface RoundRobinItem<T> {
  key: number;
  value: T;
}

export declare class RoundRobin<T> {
  protected _initialValues: T[];
  protected _currentKey: number;
  protected _currentTurn: RoundRobinItem<T> | null;

  constructor(values?: T[]);
  add(value: T): RoundRobinItem<T>;
  deleteByKey(key: number): boolean;
  deleteByValue(cb: (value: T) => boolean): number;
  next(): RoundRobinItem<T> | null;
  count(): number;
  reset(): this;
  clear(): this;
}
