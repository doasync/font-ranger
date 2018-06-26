
module.exports = function fontFace ({
  fontFamily,
  fontWeight,
  fontStyle,
  fontUrl,
  fontFormat,
  range,
  rangeName,
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
  ` : ''}src: url("${fontUrl}") format('${fontFormat}');
  unicode-range: ${range};
}
`;
};
