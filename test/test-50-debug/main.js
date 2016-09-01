#!/usr/bin/env node

'use strict';

const path = require('path');
const assert = require('assert');
const utils = require('../utils.js');

assert(!module.parent);
assert(__dirname === process.cwd());

const target = process.argv[2] || 'latest';
const input = './test-x-index.js';
const output = './test-output.exe';

let right;

utils.pkg.sync([
  '--target', target,
  '--output', output, input
]);

right = utils.spawn.sync(
  './' + path.basename(output),
  [ '--runtime', '--debug' ],
  { cwd: path.dirname(output) }
);

assert.equal(right, 'ok\n');
utils.vacuum.sync(output);
