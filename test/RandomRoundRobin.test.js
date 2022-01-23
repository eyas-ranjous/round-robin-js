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
    it('removes item by its key', () => {
      const round2 = new RandomRoundRobin(['item 1', 'item 2', 'item 3']);

      round2.deleteByKey(0);
      round2.deleteByKey(2);
      expect(round2.count()).to.equal(1);

      const lastItem = round2.next();
      expect(lastItem).to.eql({ key: 1, value: 'item 2' });
    });
  });

  describe('deleteByValue', () => {
    it('removes item by its value', () => {
      const round3 = new RandomRoundRobin(['item 1', 'item 2', 'item 3']);

      round3.deleteByValue('item 1');
      round3.deleteByValue('item 3');
      expect(round3.count()).to.equal(1);

      const lastItem = round3.next();
      expect(lastItem).to.eql({ key: 1, value: 'item 2' });
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
