const { expect } = require('chai');
const { RandomRoundRobin } = require('../src/RandomRoundRobin');

describe('RandomRoundRobin tests', () => {
  let round;

  beforeEach(() => {
    round = new RandomRoundRobin(['item 1', 'item 2']);
  });

  describe('constructor', () => {
    it('initializes with empty array', () => {
      const emptyRound = new RandomRoundRobin();
      expect(emptyRound.count()).to.equal(0);
      expect(emptyRound.next()).to.equal(null);
    });

    it('throws error on invalid input', () => {
      expect(() => new RandomRoundRobin('not array')).to.throw();
      expect(() => new RandomRoundRobin(123)).to.throw();
    });
  });

  describe('add', () => {
    it('adds items to the round', () => {
      expect(round.add('item 3')).to.deep.equal({ key: 2, value: 'item 3' });
      expect(round.add('item 4')).to.deep.equal({ key: 3, value: 'item 4' });
      expect(round.count()).to.equal(4);
    });
  });

  describe('next', () => {
    it('gets all items once per round', () => {
      const items = new Set();
      for (let i = 0; i < round.count(); i++) {
        const item = round.next();
        items.add(item.value);
      }
      expect(items.size).to.equal(2);
      expect(items.has('item 1')).to.equal(true);
      expect(items.has('item 2')).to.equal(true);
    });

    it('starts new round when complete', () => {
      const firstRound = new Set();
      for (let i = 0; i < round.count(); i++) {
        firstRound.add(round.next().value);
      }

      const secondRound = new Set();
      for (let i = 0; i < round.count(); i++) {
        secondRound.add(round.next().value);
      }

      expect(secondRound.size).to.equal(2);
      expect(secondRound.has('item 1')).to.equal(true);
      expect(secondRound.has('item 2')).to.equal(true);
    });

    it('returns null when empty', () => {
      const emptyRound = new RandomRoundRobin();
      expect(emptyRound.next()).to.equal(null);
    });
  });

  describe('deleteByKey', () => {
    it('deletes items by key', () => {
      expect(round.deleteByKey(0)).to.equal(true);
      expect(round.count()).to.equal(1);

      const item = round.next();
      expect(item.key).to.equal(1);
      expect(item.value).to.equal('item 2');
    });

    it('returns false for invalid key', () => {
      expect(round.deleteByKey(99)).to.equal(false);
      expect(round.count()).to.equal(2);
    });
  });

  describe('deleteByValue', () => {
    it('deletes items by predicate', () => {
      round.add('item 3');
      const deleted = round.deleteByValue((val) => val.includes('2'));
      expect(deleted).to.equal(1);
      expect(round.count()).to.equal(2);

      const values = new Set();
      values.add(round.next().value);
      values.add(round.next().value);
      expect(values.has('item 2')).to.equal(false);
    });

    it('returns 0 when no match', () => {
      const deleted = round.deleteByValue((val) => val === 'nonexistent');
      expect(deleted).to.equal(0);
      expect(round.count()).to.equal(2);
    });
  });

  describe('reset', () => {
    it('starts new round', () => {
      round.next();
      round.reset();

      const items = new Set();
      for (let i = 0; i < round.count(); i++) {
        items.add(round.next().value);
      }
      expect(items.size).to.equal(2);
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
      expect(round.next().value).to.equal('new item');
    });
  });
});
