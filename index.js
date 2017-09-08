var fetch = require('node-fetch');
var csstree = require('css-tree');

var url = 'https://www.telia.fi/';

// Step 1: fetch the page
fetch(url).then((response) => {
  response.text().then((text) => {
    var cssFiles = text.match(/[^'"() !;]+\.css(?=["'])/gi);
    cssFiles.forEach((file) => {
      analyzeFile(file);
    });
  });
});

function analyzeFile(file) {
  var targetUrl = url + file.replace(/^\//, '');
  console.log('loading', targetUrl);
  fetch(targetUrl).then((response) => {
    response.text().then((text) => {
      var tree = csstree.parse(text);
      console.log('parsed');
      csstree.walk(tree, (node) => {
        console.log(node.type);
      });
    });
  });
}