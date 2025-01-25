const { expect } = require('chai');
const { SequentialRoundRobin } = require('../src/SequentialRoundRobin');

describe('SequentialRoundRobin tests', () => {
  let round;

  beforeEach(() => {
    round = new SequentialRoundRobin(['item 1', 'item 2']);
  });

  describe('constructor', () => {
    it('initializes with empty array', () => {
      const emptyRound = new SequentialRoundRobin();
      expect(emptyRound.count()).to.equal(0);
      expect(emptyRound.next()).to.equal(null);
    });

    it('throws error on invalid input', () => {
      expect(() => new SequentialRoundRobin('not array')).to.throw();
      expect(() => new SequentialRoundRobin(123)).to.throw();
    });
  });

  describe('add', () => {
    it('adds items to the round', () => {
      expect(round.add('item 3')).to.deep.equal({ key: 2, value: 'item 3' });
      expect(round.add('item 4')).to.deep.equal({ key: 3, value: 'item 4' });
      expect(round.count()).to.equal(4);
    });

    it('maintains order after adding', () => {
      round.add('item 3');
      expect(round.next()).to.deep.equal({ key: 0, value: 'item 1' });
      expect(round.next()).to.deep.equal({ key: 1, value: 'item 2' });
      expect(round.next()).to.deep.equal({ key: 2, value: 'item 3' });
    });
  });

  describe('next', () => {
    it('gets items in sequence', () => {
      const next1 = round.next();
      expect(next1.key).to.equal(0);
      expect(next1.value).to.equal('item 1');

      const next2 = round.next();
      expect(next2.key).to.equal(1);
      expect(next2.value).to.equal('item 2');
    });

    it('cycles back to start', () => {
      round.next();
      round.next();
      const next = round.next();
      expect(next.key).to.equal(0);
      expect(next.value).to.equal('item 1');
    });

    it('returns null when empty', () => {
      const emptyRound = new SequentialRoundRobin();
      expect(emptyRound.next()).to.equal(null);
    });
  });

  describe('deleteByKey', () => {
    beforeEach(() => {
      round.add('item 3');
      round.add('item 4');
    });

    it('deletes items by key', () => {
      expect(round.deleteByKey(1)).to.equal(true);
      expect(round.deleteByKey(3)).to.equal(true);
      expect(round.count()).to.equal(2);

      expect(round.next()).to.deep.equal({ key: 0, value: 'item 1' });
      expect(round.next()).to.deep.equal({ key: 2, value: 'item 3' });
    });

    it('returns false for invalid key', () => {
      expect(round.deleteByKey(99)).to.equal(false);
    });

    it('maintains sequence after delete', () => {
      round.deleteByKey(1);
      round.add('new item');

      expect(round.next()).to.deep.equal({ key: 0, value: 'item 1' });
      expect(round.next()).to.deep.equal({ key: 2, value: 'item 3' });
      expect(round.next()).to.deep.equal({ key: 3, value: 'item 4' });
      expect(round.next()).to.deep.equal({ key: 4, value: 'new item' });
    });
  });

  describe('deleteByValue', () => {
    it('deletes items by predicate', () => {
      const round2 = new SequentialRoundRobin(['n1', 'val1', 'n2', 'val2']);
      const deletedCount = round2.deleteByValue((val) => val.includes('n'));

      expect(deletedCount).to.equal(2);
      expect(round2.count()).to.equal(2);
      expect(round2.next()).to.deep.equal({ key: 1, value: 'val1' });
      expect(round2.next()).to.deep.equal({ key: 3, value: 'val2' });
    });

    it('returns 0 when no match', () => {
      const deleted = round.deleteByValue((val) => val === 'nonexistent');
      expect(deleted).to.equal(0);
      expect(round.count()).to.equal(2);
    });
  });

  describe('reset', () => {
    it('resets to start', () => {
      round.next();
      round.next();
      round.reset();

      expect(round.next()).to.deep.equal({ key: 0, value: 'item 1' });
    });

    it('maintains count', () => {
      round.reset();
      expect(round.count()).to.equal(2);
    });
  });

  describe('clear', () => {
    it('removes all items', () => {
      round.clear();
      expect(round.count()).to.equal(0);
      expect(round.next()).to.equal(null);
    });

    it('allows adding after clear', () => {
      round.clear();
      round.add('new item');
      expect(round.count()).to.equal(1);
      expect(round.next()).to.deep.equal({ key: 0, value: 'new item' });
    });
  });
});
