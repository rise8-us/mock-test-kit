const fs = require('fs');
const path = require('path');

const readFiles = (dirname, onFileContent) => {
  fs.readdirSync(dirname).forEach(function (filename) {
    if (fs.statSync(path.join(dirname, filename)).isDirectory()) {
      readFiles(path.join(dirname, filename), onFileContent);
    } else {
      onFileContent(filename, fs.readFileSync(path.join(dirname, filename), 'utf-8'));
    }
  });
};

module.exports = {
  readFiles,
};

