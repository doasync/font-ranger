
module.exports = function fontFace ({
  fontFamily,
  fontWeight,
  fontStyle,
  fontDisplay,
  fontUrlMap,
  unicodeRange,
  subsetName,
  locals = [],
}) {
  return `${subsetName ? `/* ${subsetName} */\n` : ''}@font-face {
  ${
  fontFamily
    ? `font-family: '${fontFamily}';\n  ` : ''}${
  fontStyle
    ? `font-style: ${fontStyle};\n  ` : ''}${
  fontWeight
    ? `font-weight: ${fontWeight};\n  ` : ''}${
  fontDisplay
    ? `font-display: ${fontDisplay};\n  ` : ''}src:${
  locals.map(
    localName => (localName ? `\n    local('${localName}'),` : ''),
  ).join('')}${
  Object.entries(fontUrlMap).map(
    ([format, url]) => `\n    url('${url}') format('${format}')`,
  ).join(',')};
  unicode-range: ${unicodeRange};
}
`;
};
