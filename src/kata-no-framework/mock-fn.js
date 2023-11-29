const thumbWar = require('../thumb-war');
const utils = require('../utils');
const assert = require('assert');

const fn = function (fnImplementation) {
  const calls = [];
  const mockFn = function (...params) {
    calls.push(params);
    return fnImplementation(...params);
  };
  mockFn.mock = {
    calls,
  };
  return mockFn;
};

const originalGetWinner = utils.getWinner;
utils.getWinner = fn((p1, p2) => p1);

const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler');

assert.strictEqual(winner, 'Kent C. Dodds');
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ['Kent C. Dodds', 'Ken Wheeler'],
  ['Kent C. Dodds', 'Ken Wheeler'],
]);

// cleanup
utils.getWinner = originalGetWinner;
