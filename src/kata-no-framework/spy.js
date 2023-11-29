const thumbWar = require('../thumb-war');
const utils = require('../utils');
const assert = require('assert');

const spyOn = function (module, method) {
  const originalMethod = module[method];

  const fn = function (fnImpl) {
    let fnImplementation = fnImpl;
    const calls = [];

    const mockFn = function (...params) {
      calls.push(params);
      return fnImplementation(...params);
    };

    const mockImplementation = function (fnImpl) {
      fnImplementation = fnImpl;
    };

    const mockRestore = function () {
      module[method] = originalMethod;
    };

    mockFn.mock = { calls };
    mockFn.mockImplementation = mockImplementation;
    mockFn.mockRestore = mockRestore;
    return mockFn;
  };

  module[method] = fn(() => {});
};

spyOn(utils, 'getWinner');
utils.getWinner.mockImplementation((p1, p2) => p1);

const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler');

assert.strictEqual(winner, 'Kent C. Dodds');
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ['Kent C. Dodds', 'Ken Wheeler'],
  ['Kent C. Dodds', 'Ken Wheeler'],
]);

utils.getWinner.mockRestore();
