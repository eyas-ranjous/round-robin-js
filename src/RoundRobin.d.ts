export interface RoundRobinItem<T> {
  key: number,
  value: T
}

export class RoundRobin<T> {
  constructor(items?: T[]);
  add(item: T): RoundRobinItem<T>;
  delete(key: number): boolean;
  next(): RoundRobinItem<T>;
  count(): number;
  completedRounds(): number;
  currentTurn(): RoundRobinItem<T>;
  reset(): RoundRobin<T>;
  clear(): RoundRobin<T>;
}
