#!/usr/bin/env node

/* eslint-disable no-console */

const commandExists = require('command-exists');
const fontRanger = require('./font-ranger');
const argv = require('./argv');
const ranges = require('./ranges');

Promise.resolve()
  .then(() => commandExists('pyftsubset'))
  .catch(() => {
    console.log(`
Font-Ranger requires the following programs to be installed:
    fonttools (https://github.com/fonttools/fonttools)
    brotli (https://github.com/google/brotli) <- for woff2

Install on Ubuntu:
    sudo apt install fonttools brotli

Install using Python:
    pip install fonttools brotli`);
    process.exit(0);
  })
  .then(() => fontRanger({ ...argv, ranges }))
  .catch((error) => {
    console.error(error);
  });
