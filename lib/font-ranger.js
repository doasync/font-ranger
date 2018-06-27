/* eslint-disable no-console */

const path = require('path');
const fsExtra = require('fs-extra');
const fontFace = require('./font-face');
const createSubset = require('./create-subset');

const trimLeadingDot = string => string.replace(/^\./, '');

module.exports = async function fontRanger ({
  fontFile,
  outputFolder = '.',
  fontFamily,
  fontWeight,
  fontStyle,
  fontName,
  lowerCase,
  keepExt,
  useWoff,
  skipCss,
  ranges,
  urlPrefix = '',
  copyOriginal,
  local,
}) {
  let fontExt = path.extname(fontFile);
  let fontFileName = path.basename(fontFile, fontExt);
  fontExt = trimLeadingDot(fontExt);
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
  const fontUrlFolder = path.relative('.', outputFolder);

  await fsExtra.ensureDir(outputFolder);

  await Promise.all(Object.entries(ranges).map(([rangeName, range]) => {
    const outputFileName = `${fontFileName}.${rangeName}.${outputExt}`;
    const outputFile = `${outputFolder}/${outputFileName}`;
    const fontUrl = `${urlPrefix}${fontUrlFolder}/${outputFileName}`;

    cssData += fontFace({
      fontFamily,
      fontWeight,
      fontStyle,
      fontUrl,
      fontFormat: outputExt,
      range,
      rangeName,
      locals: Array.isArray(local) ? local : [local],
    });

    return createSubset({
      fontFile,
      range,
      flavor,
      outputFile,
    });
  }));

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
