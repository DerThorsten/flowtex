process.bin = process.title = 'flowtex';

var Flowtex = require('./core/Flowtex')
fs = require('fs')
// node types helpers
var flowchart = new Flowtex();
function N(text) { return flowchart.createNode(text); }
function P(text) { return N(text).type('process'); }
function D(text) { return N(text).type('decision'); }
function API(text) { return N(text).type('api'); }
function IO(text){ return N(text).type('io'); }

var filename = process.argv[2];

fs.readFile(filename, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  eval(data);
  console.log(flowchart.toLatex());
});
