import { RoundRobin } from './RoundRobin';

export { RoundRobinItem } from './RoundRobin';

export class PriorityRoundRobin<T> extends RoundRobin<T> {
  constructor(compare: (a: T, b: T) => number, values?: T[]);
}
