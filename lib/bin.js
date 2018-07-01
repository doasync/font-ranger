#!/usr/bin/env node

const commandExists = require('command-exists');
const fontRanger = require('./font-ranger');
const argv = require('./argv');

const notFoundMessage = `
Font-Ranger requires the following programs to be installed:
    fonttools (https://github.com/fonttools/fonttools)
    brotli (https://github.com/google/brotli) <- for woff2

Install on Ubuntu:
    sudo apt install fonttools brotli

Install using Python:
    pip install fonttools brotli`;

(async () => {
  try {
    await commandExists('pyftsubset');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(notFoundMessage);
    process.exit(0);
  }

  try {
    await fontRanger({ ...argv });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
})();
