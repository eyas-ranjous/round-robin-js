const { expect } = require('chai');
const { SequentialRoundRobin } = require('../src/SequentialRoundRobin');

describe('SequentialRoundRobin tests', () => {
  const table = new SequentialRoundRobin(['item 1', 'item 2']);

  describe('.add', () => {
    it('adds items to the table', () => {
      expect(table.add('item 3')).to.deep.equal({ key: 2, value: 'item 3' });
      expect(table.add('item 4')).to.deep.equal({ key: 3, value: 'item 4' });
      expect(table.count()).to.equal(4);
    });
  });

  describe('.next', () => {
    it('gets the next item in the round', () => {
      const next1 = table.next();
      expect(next1.key).to.equal(0);
      expect(next1.value).to.equal('item 1');

      const next2 = table.next();
      expect(next2.key).to.equal(1);
      expect(next2.value).to.equal('item 2');

      const next3 = table.next();
      expect(next3.key).to.equal(2);
      expect(next3.value).to.equal('item 3');

      const next4 = table.next();
      expect(next4.key).to.equal(3);
      expect(next4.value).to.equal('item 4');
      expect(table.completedRounds()).to.equal(1);

      const next5 = table.next();
      expect(next5.key).to.equal(0);
      expect(next5.value).to.equal('item 1');
    });
  });

  describe('.delete', () => {
    it('removes items from the table', () => {
      table.delete(0);
      table.delete(2);
      expect(table.count()).to.equal(2);

      const next1 = table.next();
      expect(next1.key).to.equal(1);
      expect(next1.value).to.equal('item 2');

      const next2 = table.next();
      expect(next2.key).to.equal(3);
      expect(next2.value).to.equal('item 4');

      table.add('new item');
      const next3 = table.next();
      expect(next3.key).to.equal(1);
      expect(next3.value).to.equal('item 2');

      const next4 = table.next();
      expect(next4.key).to.equal(3);
      expect(next4.value).to.equal('item 4');

      const next5 = table.next();
      expect(next5.key).to.equal(4);
      expect(next5.value).to.equal('new item');
    });
  });

  describe('.reset', () => {
    it('reset the table', () => {
      table.reset();
      expect(table.count()).to.equal(2);

      const next1 = table.next();
      expect(next1.key).to.equal(0);
      expect(next1.value).to.equal('item 1');

      const next2 = table.next();
      expect(next2.key).to.equal(1);
      expect(next2.value).to.equal('item 2');
    });
  });

  describe('.clear', () => {
    it('clears the table', () => {
      table.clear();
      expect(table.count()).to.equal(0);
      expect(table.next()).to.equal(null);
    });
  });
});
