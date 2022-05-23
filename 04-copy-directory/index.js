const fs = require('fs');
const fsPromises = fs.promises;
const { readdir, copyFile } = require('fs/promises');
const path  = require('path');
const folderPath = path.join(__dirname, 'files');
const folderCopy = path.join(__dirname, 'files-copy');

const copyDirectory = () => {
  fsPromises.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });
  (async function (_path) {
    const files = await readdir(_path);
    files.forEach(file => {
      fsPromises.unlink(path.join(__dirname, 'files-copy', file));
    });
  })(folderCopy);

  (async function (_path) {
    const files = await readdir(_path, {withFileTypes: true});
    files.forEach(file => {
      if (file.isFile()) {
        copyFile(path.join(folderPath, file.name), path.join(__dirname, 'files-copy', file.name));
      }
    });
  })(folderPath);
};

const copy = async function() {
  copyDirectory();
};

copy();
  

