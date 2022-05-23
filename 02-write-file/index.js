const fs = require('fs');
const {stdout, stdin} = process;
const path  = require('path');
const file = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdout.write('Input text \n');

stdin.on('data', data => {
  if (data.indexOf('exit') >= 0) {
    stdout.write('Good bye!');
    process.exit();
  } else {
    file.write(data);
  }

});

process.on('SIGINT', () => {
  stdout.write('Good bye!');
  process.exit();
});
