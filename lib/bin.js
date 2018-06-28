#!/usr/bin/env node

/* eslint-disable no-console */

const commandExists = require('command-exists');
const fontRanger = require('./font-ranger');
const argv = require('./argv');
const ranges = require('./ranges');

const getFontConfig = () => {
  try {
    return require.resolve(`${process.cwd()}/font-config.js`);
  } catch (x) {
    return '../font-config';
  }
};

const isObject = value => typeof value === 'object' && value !== null;

// eslint-disable-next-line import/no-dynamic-require
const fontConfig = require(getFontConfig());

if (!isObject(fontConfig)) {
  console.error('ERROR: font-config.js returned not an object');
  process.exit(0);
}

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
    console.error(notFoundMessage);
    process.exit(0);
  }

  const fullOptions = { ...argv, ranges };

  const explicitOptions = { ...fullOptions };

  Object.keys(explicitOptions).forEach(
    key => explicitOptions[key] === undefined && delete explicitOptions[key],
  );

  const { _: commands } = fullOptions;

  try {
    if (commands.length) {
      commands.forEach(async (command) => {
        const defaultOptions = fontConfig[command];
        if (isObject(defaultOptions)) {
          await fontRanger({ ...fullOptions, ...defaultOptions, ...explicitOptions });
        } else {
          console.error(`ERROR: Command "${command}" is not found in font-config`);
        }
      });
    } else {
      await fontRanger(fullOptions);
    }
  } catch (error) {
    console.error(error);
  }
})();
