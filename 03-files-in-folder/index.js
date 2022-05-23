const { readdir } = require('fs/promises');
const fs = require('fs');
const path  = require('path');
const filePath = path.join(__dirname, 'secret-folder');

(async function (_path) {
  const files = await readdir(_path);
  files.forEach(file => {
    const ext = path.extname(file).replace(/\./g, '');
    const name = file.split('.')[0];
    fs.stat(path.join(filePath, file), (err, stats) => {
      const fileSize = stats.size;
      if (stats.isDirectory() === false) {
        console.log(`${name} - ${ext} - ${fileSize}byt`);
      }
    });
  });
})(filePath);
