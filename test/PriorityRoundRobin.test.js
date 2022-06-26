const { expect } = require('chai');
const { PriorityRoundRobin } = require('../src/PriorityRoundRobin');

describe('PriorityRoundRobin tests', () => {
  const round = new PriorityRoundRobin((a, b) => a - b);

  describe('add', () => {
    it('adds items to the round', () => {
      expect(round.add(10)).to.deep.equal({ key: 0, value: 10 });
      expect(round.add(6)).to.deep.equal({ key: 1, value: 6 });
      expect(round.add(-1)).to.deep.equal({ key: 2, value: -1 });
      expect(round.add(7)).to.deep.equal({ key: 3, value: 7 });
      expect(round.count()).to.equal(4);
    });
  });

  describe('next', () => {
    it('gets the next item in the round', () => {
      const items = [
        round.next(),
        round.next(),
        round.next(),
        round.next()
      ];
      expect(items).to.deep.equal([
        { key: 2, value: -1 },
        { key: 1, value: 6 },
        { key: 3, value: 7 },
        { key: 0, value: 10 }
      ]);
    });
  });

  describe('deleteByKey', () => {
    it('deletes items by key', () => {
      round.deleteByKey(3);
      expect(round.count()).to.equal(3);

      const items = [
        round.next(),
        round.next(),
        round.next()
      ];
      expect(items).to.deep.equal([
        { key: 2, value: -1 },
        { key: 1, value: 6 },
        { key: 0, value: 10 }
      ]);
    });
  });

  describe('deleteByValue', () => {
    it('deletes items by value', () => {
      const round2 = new PriorityRoundRobin((a, b) => a - b, [2, 1, 3, 5, 4]);
      round2.next();
      round2.next();

      const deletedCount = round2.deleteByValue((a) => a < 3);
      expect(deletedCount).to.equal(2);
      expect(round2.count()).to.equal(3);
      const items2 = [
        round2.next(),
        round2.next(),
        round2.next()
      ];
      expect(items2).to.deep.equal([
        { key: 2, value: 3 },
        { key: 4, value: 4 },
        { key: 3, value: 5 }
      ]);
    });
  });

  describe('count', () => {
    it('count of items', () => {
      expect(round.count()).to.equal(3);
    });
  });

  describe('reset', () => {
    it('reset the table', () => {
      round.reset();
      expect(round.count()).to.equal(0);
    });
  });

  describe('clear', () => {
    it('clears the table', () => {
      round.clear();
      expect(round.count()).to.equal(0);
      expect(round.next()).to.equal(null);
    });
  });
});
