const { expect } = require('chai');
const { SequentialRoundRobin } = require('../src/SequentialRoundRobin');

describe('SequentialRoundRobin tests', () => {
  const round = new SequentialRoundRobin(['item 1', 'item 2']);

  describe('.add', () => {
    it('adds items to the round', () => {
      expect(round.add('item 3')).to.deep.equal({ key: 2, value: 'item 3' });
      expect(round.add('item 4')).to.deep.equal({ key: 3, value: 'item 4' });
      expect(round.count()).to.equal(4);
    });
  });

  describe('.next', () => {
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
      expect(round.completedRounds()).to.equal(1);

      const next5 = round.next();
      expect(next5.key).to.equal(0);
      expect(next5.value).to.equal('item 1');
    });
  });

  describe('.delete', () => {
    it('removes items from the round', () => {
      round.delete(1);
      round.delete(3);
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

  describe('.reset', () => {
    it('reset the round', () => {
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

  describe('.clear', () => {
    it('clears the round', () => {
      round.clear();
      expect(round.count()).to.equal(0);
      expect(round.next()).to.equal(null);
    });
  });
});
