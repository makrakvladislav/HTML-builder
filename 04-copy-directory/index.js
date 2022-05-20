const fs = require('fs');
const fsPromises = fs.promises;
const { readdir, copyFile } = require('fs/promises');
const path  = require('path');
const folderPath = path.join(__dirname, '', 'files');

fsPromises.mkdir(`${__dirname}\\files-copy`, { recursive: true }).then(function() {
  (async function (_path) {
    const files = await readdir(_path);
    files.forEach(file => {
      fsPromises.unlink(path.join(__dirname, 'files-copy', file));
    });
  })(`${__dirname}\\files-copy`);

  (async function (_path) {
    const files = await readdir(_path, {withFileTypes: true});
    files.forEach(file => {
      if (file.isFile()) {
        copyFile(path.join(folderPath, file.name), path.join(__dirname, 'files-copy', file.name));
      }
    });
  })(folderPath);
});
