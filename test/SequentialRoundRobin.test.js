const { expect } = require('chai');
const { SequentialRoundRobin } = require('../src/SequentialRoundRobin');

describe('SequentialRoundRobin tests', () => {
  const round = new SequentialRoundRobin(['item 1', 'item 2']);

  describe('add', () => {
    it('adds items to the round', () => {
      expect(round.add('item 3')).to.deep.equal({ key: 2, value: 'item 3' });
      expect(round.add('item 4')).to.deep.equal({ key: 3, value: 'item 4' });
      expect(round.count()).to.equal(4);
    });
  });

  describe('next', () => {
    it('gets the next item in the round', () => {
      const next1 = round.next();
      expect(next1.key).to.equal(0);
      expect(next1.value).to.equal('item 1');

      const next2 = round.next();
      expect(next2.key).to.equal(1);
      expect(next2.value).to.equal('item 2');

      const next3 = round.next();
      expect(next3.key).to.equal(2);
      expect(next3.value).to.equal('item 3');

      const next4 = round.next();
      expect(next4.key).to.equal(3);
      expect(next4.value).to.equal('item 4');

      const next5 = round.next();
      expect(next5.key).to.equal(0);
      expect(next5.value).to.equal('item 1');
    });
  });

  describe('deleteByKey', () => {
    it('delete items by key', () => {
      round.deleteByKey(1);
      round.deleteByKey(3);
      expect(round.count()).to.equal(2);

      const next1 = round.next();
      expect(next1.key).to.equal(2);
      expect(next1.value).to.equal('item 3');

      const next2 = round.next();
      expect(next2.key).to.equal(0);
      expect(next2.value).to.equal('item 1');

      round.add('new item');
      const next3 = round.next();
      expect(next3.key).to.equal(2);
      expect(next3.value).to.equal('item 3');

      const next4 = round.next();
      expect(next4.key).to.equal(4);
      expect(next4.value).to.equal('new item');

      const next5 = round.next();
      expect(next5.key).to.equal(0);
      expect(next5.value).to.equal('item 1');
    });
  });

  describe('deleteByValue', () => {
    it('deletes items by value', () => {
      const round2 = new SequentialRoundRobin(['n1', 'val1', 'n2', 'val2']);
      round2.next();
      round2.next();

      const deletedCount = round2.deleteByValue((val) => val.includes('n'));
      expect(deletedCount).to.equal(2);
      expect(round2.count()).to.equal(2);
      expect(round2.next()).to.eql({ key: 3, value: 'val2' });
      expect(round2.next()).to.eql({ key: 1, value: 'val1' });
    });
  });

  describe('reset', () => {
    it('reset the table', () => {
      round.reset();
      expect(round.count()).to.equal(2);

      const next1 = round.next();
      expect(next1.key).to.equal(0);
      expect(next1.value).to.equal('item 1');

      const next2 = round.next();
      expect(next2.key).to.equal(1);
      expect(next2.value).to.equal('item 2');
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
