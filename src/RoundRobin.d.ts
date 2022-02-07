export interface RoundRobinItem<T> {
  key: number,
  value: T
}

export class RoundRobin<T> {
  constructor(values?: T[]);
  add(value: T): RoundRobinItem<T>;
  deleteByKey(key: number): boolean;
  next(): RoundRobinItem<T>;
  count(): number;
  completedRounds(): number;
  currentTurn(): RoundRobinItem<T>;
  reset(): RoundRobin<T>;
  clear(): RoundRobin<T>;
}
