// ESLint root is here
process.chdir(__dirname);

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: true,
    codeFrame: false
  },
  extends: ['airbnb-bundle'],
  rules: {
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'always',
        asyncArrow: 'always'
      }
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: [
          '.js'
        ]
      }
    ],
    'import/prefer-default-export': 'off',
  }
};
