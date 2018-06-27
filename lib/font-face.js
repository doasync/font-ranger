
module.exports = function fontFace ({
  fontFamily,
  fontWeight,
  fontStyle,
  fontDisplay,
  fontUrl,
  fontFormat,
  range,
  rangeName,
  locals = [],
}) {
  return `/* ${rangeName} */
@font-face {
  ${
  fontFamily
    ? `font-family: '${fontFamily}';
  ` : ''}${
  fontStyle
    ? `font-style: ${fontStyle};
  ` : ''}${
  fontWeight
    ? `font-weight: ${fontWeight};
  ` : ''}${
  fontDisplay
    ? `font-display: ${fontDisplay};
  ` : ''}src:${
  locals.map(
    local => (local ? ` local('${local}'),` : ''),
  ).join('')} url("${fontUrl}") format('${fontFormat}');
  unicode-range: ${range};
}
`;
};
