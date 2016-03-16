var Node = require('./Node');
var Arrows = require('./Arrows');

var Flowtex = function(){
    this.start = null;
    this.arrows = new Arrows();
    this.lastAction = null;
    this.default = {
        offset: {
            x: null,
            y: null
        },
        unit: "cm",
        nodeDistance: 2
    };
};

Flowtex.prototype.createNode = function(text){
    var node = new Node(text, null, this);
    if ( this.start == null ){
        this.start = node;
    }
    return node;
};

Flowtex.prototype.unit = function(n){
    this.default.unit = n;
};

Flowtex.prototype.nodeDistance = function(n){
  this.default.nodeDistance = n;
};

Flowtex.prototype.offsetX = function(n){
    this.default.offset.x = n;
};

Flowtex.prototype.offsetY = function(n){
    this.default.offset.y = n;
};

Flowtex.prototype.offset = function(x, y){
    this.default.offset = {x: x, y: y};
};

Flowtex.prototype.toLatex = function(){
    var out = "\\begin{center}\n";
    out += "\\begin{tikzpicture}[node distance="
      + this.default.nodeDistance + this.default.unit + "]\n";
    this.arrows.process();
    out += this.start.toLatex();
    out += this.arrows.toLatex();
    out += "\\end{tikzpicture}\n";
    out += "\\end{center}\n";
    return out;
};

module.exports = Flowtex;
