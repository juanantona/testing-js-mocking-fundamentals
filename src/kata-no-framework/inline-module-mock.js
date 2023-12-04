const thumbWar = require('../thumb-war');
const utilsMock = require('../utils');
const assert = require('assert');
const fn = function (fnImpl = () => {}) {
  const calls = [];

  const mockFn = function (...params) {
    calls.push(params);
    return fnImpl(...params);
  };

  mockFn.mock = { calls };
  return mockFn;
};

const mock = function (path, callback) {
  const originalModule = require(path);
  const mockedObject = callback();

  console.log('mocked', mockedObject);

  for (const method in mockedObject) {
    const originalMethod = originalModule[method];
    originalModule[method] = mockedObject[method];
    originalModule[method]['mockReset'] = function () {
      originalModule[method] = originalMethod;
    };
  }
};

mock('../utils', () => {
  return {
    getWinner: fn((p1, p2) => p1),
  };
});

const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler');

assert.strictEqual(winner, 'Kent C. Dodds');
assert.deepStrictEqual(utilsMock.getWinner.mock.calls, [
  ['Kent C. Dodds', 'Ken Wheeler'],
  ['Kent C. Dodds', 'Ken Wheeler'],
]);

console.log('utilsMock', utilsMock.getWinner);
utilsMock.getWinner.mockReset();
console.log('utilsMock', utilsMock.getWinner);
