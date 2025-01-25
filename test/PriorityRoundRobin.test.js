const { expect } = require('chai');
const { PriorityRoundRobin } = require('../src/PriorityRoundRobin');

describe('PriorityRoundRobin tests', () => {
  let round;

  beforeEach(() => {
    round = new PriorityRoundRobin((a, b) => a - b);
  });

  describe('constructor', () => {
    it('requires compare function', () => {
      expect(() => new PriorityRoundRobin()).to.throw();
      expect(() => new PriorityRoundRobin('not a function')).to.throw();
    });

    it('initializes with values', () => {
      round = new PriorityRoundRobin((a, b) => a - b, [3, 1, 2]);
      expect(round.count()).to.equal(3);

      expect(round.next().value).to.equal(1);
      expect(round.next().value).to.equal(2);
      expect(round.next().value).to.equal(3);
    });
  });

  describe('add', () => {
    it('adds items in priority order', () => {
      round.add(10);
      round.add(6);
      round.add(-1);
      round.add(7);
      expect(round.count()).to.equal(4);

      expect(round.next().value).to.equal(-1);
      expect(round.next().value).to.equal(6);
      expect(round.next().value).to.equal(7);
      expect(round.next().value).to.equal(10);
    });
  });

  describe('next', () => {
    beforeEach(() => {
      round.add(3);
      round.add(1);
      round.add(2);
    });

    it('returns items in priority order', () => {
      expect(round.next().value).to.equal(1);
      expect(round.next().value).to.equal(2);
      expect(round.next().value).to.equal(3);
    });

    it('starts new round when complete', () => {
      round.next();
      round.next();
      round.next();
      expect(round.next().value).to.equal(1);
    });

    it('returns null when empty', () => {
      const emptyRound = new PriorityRoundRobin((a, b) => a - b);
      expect(emptyRound.next()).to.equal(null);
    });
  });

  describe('deleteByKey', () => {
    beforeEach(() => {
      round.add(3);
      round.add(1);
      round.add(2);
    });

    it('deletes by key and maintains order', () => {
      expect(round.deleteByKey(1)).to.equal(true);
      expect(round.count()).to.equal(2);

      expect(round.next().value).to.equal(2);
      expect(round.next().value).to.equal(3);
    });

    it('returns false for invalid key', () => {
      expect(round.deleteByKey(99)).to.equal(false);
    });
  });

  describe('deleteByValue', () => {
    beforeEach(() => {
      round = new PriorityRoundRobin((a, b) => a - b, [1, 2, 3, 4, 5]);
    });

    it('deletes by predicate', () => {
      const deleted = round.deleteByValue((v) => v < 3);
      expect(deleted).to.equal(2);
      expect(round.count()).to.equal(3);

      expect(round.next().value).to.equal(3);
      expect(round.next().value).to.equal(4);
      expect(round.next().value).to.equal(5);
    });

    it('returns 0 when no match', () => {
      expect(round.deleteByValue((v) => v > 10)).to.equal(0);
      expect(round.count()).to.equal(5);
    });
  });

  describe('reset', () => {
    beforeEach(() => {
      round = new PriorityRoundRobin((a, b) => a - b, [3, 1, 2]);
    });

    it('starts new round', () => {
      round.next();
      round.reset();
      expect(round.next().value).to.equal(1);
    });

    it('maintains count and order', () => {
      round.reset();
      expect(round.count()).to.equal(3);

      expect(round.next().value).to.equal(1);
      expect(round.next().value).to.equal(2);
      expect(round.next().value).to.equal(3);
    });
  });

  describe('clear', () => {
    it('removes all items', () => {
      round.add(1);
      round.clear();
      expect(round.count()).to.equal(0);
      expect(round.next()).to.equal(null);
    });

    it('allows adding after clear', () => {
      round.clear();
      round.add(1);
      expect(round.count()).to.equal(1);
      expect(round.next().value).to.equal(1);
    });
  });
});
