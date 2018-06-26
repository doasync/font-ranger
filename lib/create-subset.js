/* eslint-disable no-console,no-unused-expressions */

const fs = require('fs');
const util = require('util');
const fileSize = require('filesize');
const childProcess = require('child_process');

const exec = util.promisify(childProcess.exec);
const fsStat = util.promisify(fs.stat);

module.exports = async function createSubset ({
  fontFile,
  range,
  flavor,
  outputFile,
}) {
  const flags = [
    flavor ? ` --flavor="${flavor}"` : '',
    range ? ` --unicodes="${range}"` : '',
    outputFile ? ` --output-file="${outputFile}"` : '',
  ];

  const command = `pyftsubset ${fontFile}${flags.join('')}`;
  const { stdout, stderr } = await exec(command);
  const { size } = await fsStat(outputFile);

  stdout && console.log(stdout);
  stderr && console.error(stderr);

  console.log('+ ', `${outputFile} - ${fileSize(size)}`);
};
