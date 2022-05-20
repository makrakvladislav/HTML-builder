const fs = require('fs');
const { readdir } = require('fs/promises');
const path  = require('path');
const folderStyles = path.join(__dirname, '', 'styles');
const outputFolder = path.join(__dirname, '', 'project-dist');
const outputfile = fs.createWriteStream(path.join(outputFolder, '', 'bundle.css'));

(async function (_path) {
  const files = await readdir(_path, {withFileTypes: true});
  files.forEach(file => {
    if (file.isFile()) {
      if (path.extname(file.name) === '.css') {
        const readFile = fs.createReadStream(path.join(folderStyles, file.name));
        readFile.on('data', chunk => {
          outputfile.write(chunk.toString());
        });
      }
    }
  });
})(folderStyles);