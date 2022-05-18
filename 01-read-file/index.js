const fs = require('fs');
const path = require('path');
const {stdout} = process;
const filePath = path.join(__dirname, '', 'text.txt');
const readFile = fs.createReadStream(filePath);
readFile.on('data', chunk => stdout.write(chunk.toString()));
