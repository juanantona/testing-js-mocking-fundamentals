const fn = function (fnImpl = () => {}) {
  const calls = [];

  const mockFn = function (...params) {
    calls.push(params);
    return fnImpl(...params);
  };

  mockFn.mock = { calls };
  return mockFn;
};

const utilsPath = require.resolve('../utils');

require.cache[utilsPath] = {
  id: utilsPath,
  filename: utilsPath,
  loaded: true,
  exports: { getWinner: fn((p1, p2) => p1) },
};

const thumbWar = require('../thumb-war');
const utils = require('../utils');
const assert = require('assert');

const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler');

assert.strictEqual(winner, 'Kent C. Dodds');
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ['Kent C. Dodds', 'Ken Wheeler'],
  ['Kent C. Dodds', 'Ken Wheeler'],
]);

// cleanup
delete require.cache[utilsPath];
