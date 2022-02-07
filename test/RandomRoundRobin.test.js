const { expect } = require('chai');
const { RandomRoundRobin } = require('../src/RandomRoundRobin');

describe('RandomRoundRobin tests', () => {
  const round = new RandomRoundRobin(['item 1', 'item 2']);

  describe('add', () => {
    it('adds items to the round', () => {
      expect(round.add('item 3')).to.deep.equal({ key: 2, value: 'item 3' });
      expect(round.add('item 4')).to.deep.equal({ key: 3, value: 'item 4' });
      expect(round.count()).to.equal(4);
    });
  });

  describe('next', () => {
    it('gets the next item in the round', () => {
      const items = [
        round.next(),
        round.next(),
        round.next(),
        round.next(),
        round.next()
      ];
      expect(items).to.have.lengthOf(5);
    });
  });

  describe('deleteByKey', () => {
    it('removes items from the round', () => {
      round.deleteByKey(0);
      round.deleteByKey(2);
      expect(round.count()).to.equal(2);

      const items = [
        round.next(),
        round.next()
      ];
      expect(items.find((item) => item.key === 0)).to.equal(undefined);
      expect(items.find((item) => item.key === 2)).to.equal(undefined);
    });
  });

  describe('reset', () => {
    it('reset the round', () => {
      round.reset();
      expect(round.count()).to.equal(2);
    });
  });

  describe('clear', () => {
    it('clears the round', () => {
      round.clear();
      expect(round.count()).to.equal(0);
      expect(round.next()).to.equal(null);
    });
  });
});
