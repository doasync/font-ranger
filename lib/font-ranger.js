/* eslint-disable no-console,no-restricted-syntax */

const fs = require('fs');
const path = require('path');
const util = require('util');
const fsExtra = require('fs-extra');
const fontFace = require('./font-face');
const createSubset = require('./create-subset');

const fsAccess = util.promisify(fs.access);

module.exports = async function fontRanger ({
  fontFile,
  outputFolder = '.',
  fontFamily,
  fontWeight,
  fontStyle,
  fontDisplay,
  fontName,
  lowerCase,
  keepExt,
  useWoff,
  useBoth,
  skipCss,
  ranges,
  urlPrefix = '',
  copyOriginal,
  local,
}) {
  if (!fontFile) {
    console.error('ERROR: fontFile is not defined');
    process.exit(0);
  }

  // eslint-disable-next-line no-bitwise
  await fsAccess(fontFile, fs.constants.F_OK | fs.constants.R_OK).catch(() => {
    console.error(`ERROR: No such font file: ${fontFile}`);
    process.exit(0);
  });

  let fontExt = path.extname(fontFile);
  let fontFileName = path.basename(fontFile, fontExt);
  fontExt = fontExt.replace(/^\./, ''); // trim leading dot
  let flavor = 'woff2';
  let outputExt = 'woff2';
  let cssData = '';

  if (fontName) {
    fontFileName = fontName;
  }

  if (lowerCase) {
    fontFileName = fontFileName.toLowerCase();
  }

  if (keepExt) {
    flavor = null;
    outputExt = fontExt;
  }

  if (useWoff) {
    flavor = 'woff';
    outputExt = 'woff';
  }

  const outputCssFile = `${outputFolder}/${fontFileName}.css`;
  const fontUrlFolder = path.relative('.', outputFolder).replace(/\\/g, '/'); // keep forward slashes

  await fsExtra.ensureDir(outputFolder);

  function* subsetGenerator () {
    for (const [rangeName, range] of Object.entries(ranges)) {
      const outputFile = `${outputFolder}/${fontFileName}.${rangeName}.${outputExt}`;
      const fontUrl = `${urlPrefix}${fontUrlFolder}/${fontFileName}.${rangeName}.${outputExt}`;
      let fontMap;

      yield createSubset({ fontFile, range, flavor, outputFile });

      if (useBoth) {
        fontMap = {
          woff2: fontUrl,
          woff: `${urlPrefix}${fontUrlFolder}/${fontFileName}.${rangeName}.woff`,
        };

        yield createSubset({
          fontFile,
          range,
          flavor,
          outputFile: `${outputFolder}/${fontFileName}.${rangeName}.woff`,
        });
      }

      cssData += fontFace({
        fontFamily,
        fontWeight,
        fontStyle,
        fontDisplay,
        fontUrl,
        fontMap,
        fontFormat: outputExt,
        range,
        rangeName,
        local,
      });
    }
  }

  await Promise.all(subsetGenerator());

  if (!skipCss) {
    await fsExtra.outputFile(outputCssFile, cssData);
    console.log('+ ', outputCssFile);
  }

  if (copyOriginal) {
    const outputFile = `${outputFolder}${path.basename(fontFile)}`;
    await fsExtra.copy(fontFile, outputFile);
    console.log('> ', outputFile);
  }
};
