
const fs = require('fs');
const path = require('path');
const util = require('util');
const fsExtra = require('fs-extra');
const { getFontFormat } = require('./utils');
const fontFace = require('./font-face');
const createSubset = require('./create-subset');
const defaultSubsets = require('./default-subsets');

const fsAccess = util.promisify(fs.access);

const trimComma = string => string.replace(/,$/, '');

async function asyncCheckFontFile (fontFile) {
  if (!fontFile) {
    throw new Error('fontFile is not defined');
  }

  // eslint-disable-next-line no-bitwise
  await fsAccess(fontFile, fs.constants.F_OK | fs.constants.R_OK).catch(() => {
    throw new Error(`No such font file: ${fontFile}`);
  });
}

function checkSubsetMap (subsetMap) {
  if (subsetMap && typeof subsetMap !== 'object') {
    throw new Error('subsetMap is not an object');
  }

  if (!Object.keys(subsetMap).length) {
    throw new Error('subsetMap is empty');
  }
}

function getSubsetMap ({ subsets = [], ranges = [] }) {
  const subsetMap = {};

  const normalizedSubsets = subsets
    .map(subset => trimComma(subset).toLowerCase());

  for (const subsetName of normalizedSubsets) {
    if (defaultSubsets[subsetName]) {
      subsetMap[subsetName] = defaultSubsets[subsetName];
    } else {
      // eslint-disable-next-line no-console
      throw new Error(`unknown subset "${subsetName}"`);
    }
  }

  const customRange = ranges
    .map(range => trimComma(range).toUpperCase()) // UpperCase for IE & Edge
    .join(', ');

  if (customRange) {
    subsetMap['custom-subset'] = customRange;
  }

  return subsetMap;
}

module.exports = async function fontRanger ({
  fontFile,
  outputFolder = '.',
  subsets,
  ranges,
  subsetMap = getSubsetMap({ subsets, ranges }),
  urlPrefix = '',
  fontName,
  fontFamily,
  fontWeight,
  fontStyle,
  fontDisplay,
  keepFormat = false,
  addWoff = false,
  skipCss = false,
  copyOriginal = false,
  locals = [],
}) {
  await asyncCheckFontFile(fontFile);
  checkSubsetMap(subsetMap);

  let fontExt = path.extname(fontFile);
  let fontFileName = path.basename(fontFile, fontExt);
  fontExt = fontExt.replace(/^\./, ''); // trim leading dot
  let cssData = '';

  if (fontName) {
    fontFileName = fontName;
  }

  const outputCssFile = `${outputFolder}/${fontFileName}.css`;

  await fsExtra.ensureDir(outputFolder);

  function* subsetGenerator () {
    for (const [subsetName, unicodeRange] of Object.entries(subsetMap)) {
      const [outputExt, flavor] = keepFormat ? [fontExt, null] : ['woff2', 'woff2'];
      const outputFile = `${outputFolder}/${fontFileName}.${subsetName}.${outputExt}`;
      const fontFormat = getFontFormat(outputExt);
      const fontUrlMap = {
        [fontFormat]: `${urlPrefix}${fontFileName}.${subsetName}.${outputExt}`,
      };

      yield createSubset({ fontFile, unicodeRange, flavor, outputFile });

      if (addWoff) {
        fontUrlMap.woff = `${urlPrefix}${fontFileName}.${subsetName}.woff`;

        yield createSubset({
          fontFile,
          unicodeRange,
          flavor: 'woff',
          outputFile: `${outputFolder}/${fontFileName}.${subsetName}.woff`,
        });
      }

      cssData += fontFace({
        fontFamily,
        fontWeight,
        fontStyle,
        fontDisplay,
        fontUrlMap,
        unicodeRange,
        subsetName,
        locals: locals.map(trimComma),
      });
    }
  }

  await Promise.all(subsetGenerator());

  if (!skipCss) {
    await fsExtra.outputFile(outputCssFile, cssData);
    // eslint-disable-next-line no-console
    console.log('+ ', outputCssFile);
  }

  if (copyOriginal) {
    const outputFile = `${outputFolder}${path.basename(fontFile)}`;
    await fsExtra.copy(fontFile, outputFile);
    // eslint-disable-next-line no-console
    console.log('> ', outputFile);
  }
};
