
const yargs = require('yargs');

module.exports = yargs
  .options({
    f: {
      alias: 'font-file',
      describe: 'Source font (to create subsets from)',
      type: 'string',
      demandOption: true,
      default: undefined,
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
    l: {
      alias: 'lower-case',
      describe: 'Convert font name to lower case',
      type: 'boolean',
      default: undefined,
    },
    e: {
      alias: 'keep-ext',
      describe: 'Keep original font extension',
      type: 'boolean',
      conflicts: ['w', 'a'],
      default: undefined,
    },
    w: {
      alias: 'use-woff',
      describe: 'Use woff instead of default woff2',
      conflicts: 'a',
      type: 'boolean',
      default: undefined,
    },
    a: {
      alias: 'use-both',
      describe: 'Use woff and woff2 at the same time',
      type: 'boolean',
      default: undefined,
    },
    c: {
      alias: 'css',
      describe: 'Generate css file with @font-face rules',
      type: 'boolean',
      default: undefined,
    },
    m: {
      alias: 'font-family',
      describe: 'Specify "font-family" for your css file',
      implies: 'c',
      type: 'string',
    },
    b: {
      alias: 'font-weight',
      describe: 'Specify "font-weight" for your css file',
      implies: 'c',
      type: 'string',
    },
    s: {
      alias: 'font-style',
      describe: 'Specify "font-style" for your css file',
      implies: 'c',
      type: 'string',
    },
    i: {
      alias: 'font-display',
      describe: 'Specify "font-display" for your css file',
      implies: 'c',
      type: 'string',
    },
    u: {
      alias: 'url-prefix',
      describe: 'Prefix for your @font-face urls',
      implies: 'c',
      type: 'string',
    },
    x: {
      alias: 'local',
      describe: 'Use local name to check user’s system font',
      implies: 'c',
      type: 'string',
    },
    d: {
      alias: 'skip-css',
      describe: 'Do not generate css file',
      conflicts: 'c',
      type: 'boolean',
      default: undefined,
    },
    t: {
      alias: 'copy-original',
      describe: 'Copy original file to the output folder',
      implies: 'o',
      type: 'boolean',
      default: undefined,
    },
  })
  .help()
  .alias('h', 'help')
  .version()
  .alias('v', 'version')
  .strict(true)
  .demandCommand(0, 0)
  .argv;
