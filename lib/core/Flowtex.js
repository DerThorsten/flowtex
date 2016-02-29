var Node = require('./Node');
var Arrows = require('./Arrows');

var Flowtex = function(){
    this.start = null;
    this.arrows = new Arrows();
    this.lastAction = null;
};

Flowtex.prototype.createNode = function(text){
    var node = new Node(text, null, this);
    if ( this.start == null ){
        this.start = node;
    }
    return node;
};

Flowtex.prototype.toLatex = function(){
    var out = "\\begin{center}\n";
    out += "\\begin{tikzpicture}[node distance=2cm]\n";
    this.arrows.process();
    out += this.start.toLatex();
    out += this.arrows.toLatex();
    out += "\\end{tikzpicture}\n";
    out += "\\end{center}\n";
    return out;
};

module.exports = Flowtex;
