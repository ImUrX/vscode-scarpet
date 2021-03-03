const webfontsGenerator = require('webfonts-generator');
const fs = require('fs');

const svgs = [
    "scarpetFileIcon.svg" 
];

webfontsGenerator({
  files: svgs.map(i => `./icons/${i}`),
  dest: './out/',
  types: ['woff'],
  fontName: 'icons',
  css: false,
  html: false,
  startCodepoint: 0xE000

}, function(error) {
  if (error) {
    console.log('Font creation failed.', error);
    return;
  }
  fs.copyFileSync('./out/icons.woff', './assets/icons.woff');
  console.log('Font created at ./assets/icons.woff');
});