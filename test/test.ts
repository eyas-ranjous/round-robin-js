import { SequentialRoundRobin } from '../src/SequentialRoundRobin';

const t = new SequentialRoundRobin<number>([1, 2, 3]);

console.log(t.next(), t.next(), t.next());