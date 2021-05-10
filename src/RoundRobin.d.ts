export interface RoundRobinOptions<T> {
  items?: T[]
}

export interface RoundRobinItem<T> {
  key: number,
  value: T
}

export class RoundRobin<T> {
  constructor(options?: RoundRobinOptions<T>);
  add(item: T): RoundRobinItem<T>;
  delete(key: number): boolean;
  next(): RoundRobinItem<T>;
  count(): number;
  completedRounds(): number;
  reset(): RoundRobin<T>;
  clear(): RoundRobin<T>;
}
