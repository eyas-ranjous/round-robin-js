export interface RoundRobinItem<T> {
  key: number,
  value: T
}

export class RoundRobin<T> {
  constructor(values?: T[]);
  add(value: T): RoundRobinItem<T>;
  deleteByKey(key: number): boolean;
  deleteByValue(cb: (value: T) => boolean): number;
  next(): RoundRobinItem<T>;
  count(): number;
  reset(): RoundRobin<T>;
  clear(): RoundRobin<T>;
}
