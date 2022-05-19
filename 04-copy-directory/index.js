const fs = require('fs');
const fsPromises = fs.promises;
const { readdir, copyFile } = require('fs/promises');
const path  = require('path');
const folderPath = path.join(__dirname, '', 'files');

fsPromises.mkdir(`${__dirname}\\files-copy`, { recursive: true }).then(function() {
  (async function (path) {
    const files = await readdir(path);
    files.forEach(file => {
      fsPromises.unlink(`${__dirname}\\files-copy\\${file}`);
    });
  })(`${__dirname}\\files-copy`);

  (async function (path) {
    const files = await readdir(path);
    files.forEach(file => {
      copyFile(`${folderPath}\\${file}`, `${__dirname}\\files-copy\\${file}`);
    });
  })(folderPath);
});
