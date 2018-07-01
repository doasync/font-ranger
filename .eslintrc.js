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
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          minProperties: 10,
          multiline: true,
          consistent: true
        },
        ObjectPattern: {
          minProperties: 10,
          multiline: true,
          consistent: true
        }
      }
    ],
    'linebreak-style': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'no-await-in-loop': 'off',
  }
};
