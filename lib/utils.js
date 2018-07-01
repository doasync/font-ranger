// Pure referentially transparent functions which have no side effects

function getFontFormat (fontExtension) {
  return {
    woff: 'woff',
    woff2: 'woff2',
    ttf: 'truetype',
    otf: 'opentype',
    eot: 'embedded-opentype',
    svg: 'svg',
  }[fontExtension];
}

module.exports = {
  getFontFormat,
};
