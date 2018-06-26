#!/usr/bin/env node

/* eslint-disable no-console */

const fontRanger = require('./font-ranger');
const argv = require('./argv');
const ranges = require('./ranges');

fontRanger({ ...argv, ranges }).catch((error) => {
  console.error(error);
});
