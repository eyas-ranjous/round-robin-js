import { RandomRoundRobin } from '../src/RandomRoundRobin';

const x = new RandomRoundRobin<string>();

x.add('test 1');
x.add('test 2');
x.add('test 3');

console.log(x.next());
console.log(x.next());

console.log(x.next());

console.log(x.next());

console.log(x.next());
console.log(x.next());
