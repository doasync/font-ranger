
module.exports = function fontFace ({
  fontFamily,
  fontWeight,
  fontStyle,
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
  ` : ''}src:${locals.map(local => ` local('${local}'),`).join('')} url("${fontUrl}") format('${fontFormat}');
  unicode-range: ${range};
}
`;
};
