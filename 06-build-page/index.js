const fs = require('fs');
const fsPromises = require('fs/promises');
const { readdir, readFile } = require('fs/promises');
const path = require('path');

const componentsPath = path.join(__dirname, 'components');
const outputPath = path.join(__dirname, 'project-dist');
const outputAssets = path.join(__dirname, 'project-dist\\assets');
let templatePath = path.join(__dirname, 'template.html');
const stylesPath = path.join(__dirname, '', 'styles');
const assetsPath = path.join(__dirname, '', 'assets');

const buildTemplate = async function (_path) {
  const outputfile = fs.createWriteStream(path.join(outputPath, 'index.html'));
  const files = await readdir(_path, {withFileTypes: true});
  let template = await readFile(templatePath, { encoding: 'utf8' });
  
  files.forEach(file => {
    let components = fs.createReadStream(path.join(componentsPath, file.name));
    components.on('data', chunk => {
      const name = file.name.split('.')[0];
      template = template.replace(`{{${name}}}`, chunk.toString());
      fs.writeFile(outputfile.path, template, function(err) {
        if(err) console.log('error', err);
      });
    });
  });
};

const buildStyles = async function (_path) {
  const files = await readdir(_path, {withFileTypes: true});
  const outputfile = fs.createWriteStream(path.join(outputPath, 'style.css'));
  
  files.forEach(file => {
    if (file.isFile()) {
      if (path.extname(file.name) === '.css') {
        const readFile = fs.createReadStream(path.join(stylesPath, file.name));
        readFile.on('data', chunk => {
          outputfile.write(`${chunk.toString()}\n`);
        });
      }
    }
  });
};

const copyAssets = async function(input, output) {
  fsPromises.mkdir(output, { recursive: true, force: true });
  const files = await readdir(input, {withFileTypes: true},  { recursive: true });

  files.forEach(file => {
    const newInput = path.join(input, file.name);
    let newOutput = path.join(`${output}`, file.name);
    if (file.isDirectory(file)) {
      copyAssets(newInput, newOutput);
    } else {
      newOutput = path.join(`${output}`, file.name);
      fsPromises.copyFile(newInput, newOutput);
    }
  });
};

const buildPage = async function() {
  await fsPromises.rm(outputPath, { recursive: true, force: true }, () => console.log('done'));
  await fsPromises.mkdir(outputPath, { recursive: true }, () => console.log('done'));
 
  buildTemplate(componentsPath).catch((err) => console.log(err));
  buildStyles(stylesPath).catch((err) => console.log(err));
  copyAssets(assetsPath, outputAssets).catch((err) => console.log(err));
};

buildPage();
