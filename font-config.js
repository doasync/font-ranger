// TODO: remove this file

const path = require('path');

module.exports = {
  'roboto-light': {
    fontFile: path.resolve(__dirname, './fonts/ttf/Roboto-Light.ttf'),
    outputFolder: 'fonts/Roboto',
    lowerCase: true,
    useBoth: true,
    fontFamily: 'Roboto',
    fontWeight: 300,
    fontStyle: 'normal',
    fontDisplay: 'swap',
    urlPrefix: '/',
    local: ['Roboto Light', 'Roboto-Light'],
  },
  'roboto-regular': {
    fontFile: path.resolve(__dirname, './fonts/ttf/Roboto-Regular.ttf'),
    outputFolder: 'fonts/Roboto',
    lowerCase: true,
    useBoth: true,
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontStyle: 'normal',
    fontDisplay: 'swap',
    urlPrefix: '/',
    local: ['Roboto', 'Roboto-Regular'],
  },
  'roboto-medium': {
    fontFile: path.resolve(__dirname, './fonts/ttf/Roboto-Medium.ttf'),
    outputFolder: 'fonts/Roboto',
    lowerCase: true,
    useBoth: true,
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontStyle: 'normal',
    fontDisplay: 'swap',
    urlPrefix: '/',
    local: ['Roboto Medium', 'Roboto-Medium'],
  },
};
