const { expect } = require('chai');
const { RandomRoundRobin } = require('../src/RandomRoundRobin');

describe('RandomRoundRobin tests', () => {
  const table = new RandomRoundRobin(['item 1', 'item 2']);

  describe('.add', () => {
    it('adds items to the table', () => {
      expect(table.add('item 3')).to.deep.equal({ key: 2, value: 'item 3' });
      expect(table.add('item 4')).to.deep.equal({ key: 3, value: 'item 4' });
      expect(table.count()).to.equal(4);
    });
  });

  describe('.next', () => {
    it('gets the next item in the round', () => {
      const items = [
        table.next(),
        table.next(),
        table.next(),
        table.next()
      ];
      expect(items).to.have.lengthOf(4).and.to.have.deep.members([
        { key: 0, value: 'item 1' },
        { key: 1, value: 'item 2' },
        { key: 2, value: 'item 3' },
        { key: 3, value: 'item 4' }
      ]);
    });
  });

  describe('.delete', () => {
    it('removes items from the table', () => {
      table.delete(0);
      table.delete(2);
      expect(table.count()).to.equal(2);

      const items = [
        table.next(),
        table.next()
      ];
      expect(items).to.have.lengthOf(2).and.to.have.deep.members([
        { key: 1, value: 'item 2' },
        { key: 3, value: 'item 4' }
      ]);
    });
  });
});
