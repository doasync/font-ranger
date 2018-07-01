
const yargs = require('yargs');

const usage = `
Available subsets:
  latin, latin-ext, cyrillic, cyrillic-ext, greek, greek-ext, vietnamese,
  sinhala, hebrew, oriya, malayalam, gurmukhi, kannada, arabic, tamil,
  khmer, telugu, bengali, thai, devanagari, myanmar, gujarati`;

// noinspection JSUnresolvedFunction
module.exports = yargs
  .options({
    f: {
      alias: 'font-file',
      describe: 'Source font (to create subsets from)',
      type: 'string',
      demandOption: true,
      default: undefined,
    },
    u: {
      alias: 'subsets',
      describe: 'Unicode subsets to use (e.g. latin)',
      type: 'array',
    },
    r: {
      alias: 'ranges',
      describe: 'Custom unicode ranges (e.g. U+0000-00FF)',
      type: 'array',
    },
    o: {
      alias: 'output-folder',
      describe: 'Output subsets to specific folder',
      type: 'string',
    },
    n: {
      alias: 'font-name',
      describe: 'Use this font name for your subset files',
      type: 'string',
    },
    k: {
      alias: 'keep-format',
      describe: 'Keep original font format',
      type: 'boolean',
      conflicts: 'w',
      default: undefined,
    },
    w: {
      alias: 'add-woff',
      describe: 'Create and add woff as a fallback format',
      type: 'boolean',
      default: undefined,
    },
    l: {
      alias: 'locals',
      describe: 'Use local names to check for system fonts',
      conflicts: 'd',
      type: 'array',
    },
    p: {
      alias: 'url-prefix',
      describe: 'Prefix for your @font-face urls',
      conflicts: 'd',
      type: 'string',
    },
    m: {
      alias: 'font-family',
      describe: 'Specify "font-family" for your css file',
      conflicts: 'd',
      type: 'string',
    },
    b: {
      alias: 'font-weight',
      describe: 'Specify "font-weight" for your css file',
      conflicts: 'd',
      type: 'string',
    },
    s: {
      alias: 'font-style',
      describe: 'Specify "font-style" for your css file',
      conflicts: 'd',
      type: 'string',
    },
    i: {
      alias: 'font-display',
      describe: 'Specify "font-display" for your css file',
      conflicts: 'd',
      type: 'string',
    },
    d: {
      alias: 'skip-css',
      describe: 'Do not generate css file',
      type: 'boolean',
      default: undefined,
    },
    c: {
      alias: 'copy-original',
      describe: 'Copy original file to the output folder',
      implies: 'o',
      type: 'boolean',
      default: undefined,
    },
  })
  .usage(usage)
  .help()
  .alias('h', 'help')
  .version()
  .alias('v', 'version')
  .strict(true)
  .demandCommand(0, 0)
  .argv;
