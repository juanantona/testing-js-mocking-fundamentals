const thumbWar = require('../thumb-war');
const utils = require('../utils');
const assert = require('assert');

const fn = function (fnImpl = () => {}) {
  const calls = [];

  const mockFn = function (...params) {
    calls.push(params);
    return fnImpl(...params);
  };

  const mockImplementation = function (newFnImpl) {
    fnImpl = newFnImpl;
  };

  mockFn.mock = { calls };
  mockFn.mockImplementation = mockImplementation;
  return mockFn;
};

const spyOn = function (module, method) {
  const originalMethod = module[method];
  module[method] = fn();
  module[method].mockRestore = function () {
    module[method] = originalMethod;
  };
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
