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
