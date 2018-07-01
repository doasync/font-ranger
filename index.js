
const fontRanger = require('./lib/font-ranger');
const argv = require('./lib/argv');
const defaultSubsets = require('./lib/default-subsets');
const fontFace = require('./lib/font-face');
const createSubset = require('./lib/create-subset');
const utils = require('./lib/utils');

module.exports = {
  fontRanger,
  createSubset,
  fontFace,
  defaultSubsets,
  argv,
  utils,
};
