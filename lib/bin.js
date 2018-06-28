#!/usr/bin/env node

/* eslint-disable no-console */

const commandExists = require('command-exists');
const fontRanger = require('./font-ranger');
const argv = require('./argv');
const ranges = require('./ranges');
const fontConfig = require('../font-config');

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
    console.log(notFoundMessage);
    process.exit(0);
  }

  const options = { ...argv, ranges };

  const explicitOptions = { ...options };

  Object.keys(explicitOptions).forEach(
    key => explicitOptions[key] === undefined && delete explicitOptions[key],
  );

  Object.entries(fontConfig).some(([command, defaultOptions]) => (options._.includes(command)
    ? Object.assign(options, defaultOptions, explicitOptions)
    : false));

  try {
    await fontRanger(options);
  } catch (error) {
    console.error(error);
  }
})();
