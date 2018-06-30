
module.exports = function fontFace ({
  fontFamily,
  fontWeight,
  fontStyle,
  fontDisplay,
  fontUrl,
  fontMap,
  fontFormat,
  range,
  rangeName,
  local,
  // eslint-disable-next-line no-nested-ternary
  locals = Array.isArray(local)
    ? local : (typeof local === 'string' ? [local] : []),
}) {
  return `/* ${rangeName} */
@font-face {
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
  fontMap
    ? Object.entries(fontMap).map(
      ([format, url]) => `\n    url('${url}') format('${format}')`,
    ).join(',')
    : `\n    url('${fontUrl}') format('${fontFormat}')`};
  unicode-range: ${range};
}
`;
};
