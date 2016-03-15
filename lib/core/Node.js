var Arrows = require('./Arrows');
var Label = require('./Label');
var nodeCount = 0;
var Node = function(text, type, flowtex){
    function formatText(text){
      function boldLatex(text){
        var re = /\*\*([^*]*)\*\*/g;
        return text.replace(re, "\\textbf{$1}");
      }
      text = boldLatex(text);
      text = text.replace('<-', "$\\leftarrow$");
      text = text.replace('->', "$\\righttarrow$");
      return text;
    }
    this.text = formatText(text);
    /*
    this.name = text
        .toLowerCase().split(' ').join('').split("'").join('');
    /*/
    this.name = "node" + nodeCount;
    ++nodeCount;
    //*/
    if ( typeof type === "undefined" || type == null ){
        this.typeNode = "startstop";
    } else {
        this.typeNode = type;
    }
    this.aboveOf = null;
    this.belowOf = null; // node which up of me
    this.leftOf = null;
    this.rightOf = null;
    this.aboveNode = null;
    this.belowNode = null; // node which below of me
    this.leftNode = null;
    this.rightNode = null;
    this.originTargetName = null;
    this.offsets = {x: null, y: null};
    this.flowtex = typeof flowtex === "undefined" ? null : flowtex;
    this._width = null;
    return this;
};

Node.prototype.type = function(type){
    this.typeNode = type;
    return this;
};

Node.prototype.above = function(node){
    node.aboveOf = this;
    this.aboveNode = node;
    return this;
};

Node.prototype.below = function(node){
    node.belowOf = this;
    this.belowNode = node;
    return this;
};

Node.prototype.left = function(node){
    node.leftOf = this;
    this.leftNode = node;
    node.offsetXOpp();
    return this;
};

Node.prototype.right = function(node){
    node.rightOf = this;
    this.rightNode = node;
    return this;
};

Node.prototype.aboveGoto = function(node){
  this.above(node);
  this.goto(node);
  return this;
};

Node.prototype.belowGoto = function(node){
  this.below(node);
  this.goto(node);
  return this;
};

Node.prototype.rightGoto = function(node){
  this.right(node);
  this.goto(node);
  return this;
};

Node.prototype.leftGoto = function(node){
  this.left(node);
  this.goto(node);
  return this;
};


Node.prototype.goto = function(node){
    this.origin('path:' + this.name);
    node.target('path:' + this.name);
    return node;
};

Node.prototype.origin = function(name){
    this.originTargetName = name;
    this.flowtex.lastAction = {
        name: "origin",
        node: this,
        rule: name
    };
    this.flowtex.arrows.putOrigin(name, this);
    return this;
};

Node.prototype.target = function(name){
    this.originTargetName = name;
    this.flowtex.lastAction = {
        name: "target",
        node: this,
        rule: name
    };
    this.flowtex.arrows.putTarget(name, this);
    return this;
};

Node.prototype.width = function(n){
  this._width = Number(n);
  return this;
};

Node.setLabel = function(self, direction, text){
    var lastAction = self.flowtex.lastAction;
    if ( lastAction == null
        || ( lastAction.name != "target" && lastAction.name != "origin" ) ){
        return;
    }
    var rule = lastAction.rule;
    var node = lastAction.node;
    self.flowtex.arrows.putLabel(
        rule,
        node,
        new Label( direction, text )
    );
};

Node.prototype.leftLabel = function(text){
    Node.setLabel(this, 'left', text);
    return this;
};

Node.prototype.rightLabel = function(text){
    Node.setLabel(this, 'right', text);
    return this;
};

Node.prototype.topLabel = function(text){
    Node.setLabel(this, 'up', text);
    return this;
};

Node.prototype.downLabel = function(text){
    Node.setLabel(this, 'down', text);
    return this;
};

Node.prototype.offsetX = function(n){
    this.offset(n, this.offsets.y);
    return this;
};

Node.prototype.offsetY = function(n){
    this.offset(this.offsets.x, n);
    return this;
};

Node.prototype.offsetXOpp = function(){
    this.offset("-", this.offsets.y);
    return this;
};

Node.prototype.offsetYOpp = function(){
    this.offset(this.offsets.x, "-");
    return this;
};

Node.prototype.offset = function(x,y){
    if ( x == "-" && this.flowtex.default.offset.x != null ){
        this.offsets.x = -this.flowtex.default.offset.x;
    } else {
        this.offsets.x = x;
    }
    if ( y == "-" && this.flowtex.default.offset.y != null ){
        this.offsets.y = -this.flowtey.default.offset.y;
    } else {
        this.offsets.y = y;
    }
    return this;
};

Node.prototype.toLatex = function(){
    var caption = "{" + this.text + "}";
    var options = "[" + this.typeNode ;
    if ( this.aboveOf != null ){
        options += ", above of=" + this.aboveOf.name;
    } else if ( this.belowOf != null ){
        options += ", below of=" + this.belowOf.name;
    } else if ( this.leftOf != null ){
        options += ", left of=" + this.leftOf.name;

        if (this.offsets.x == null && this.flowtex.default.offset.x != null) {
            options += ", xshift=" + this.flowtex.default.offset.x + this.flowtex.default.unit;
        }
        if (this.offsets.y != null && this.flowtex.default.offset.y != null) {
            options += ", yshift=" + this.flowtex.default.offset.y + this.flowtex.default.unit;
        }
    } else if ( this.rightOf != null ){
        options += ", right of=" + this.rightOf.name;

        if (this.offsets.x == null && this.flowtex.default.offset.x != null) {
            options += ", xshift=" + this.flowtex.default.offset.x + this.flowtex.default.unit;
        }
        if (this.offsets.y == null && this.flowtex.default.offset.y != null) {
            options += ", yshift=" + this.flowtex.default.offset.y + this.flowtex.default.unit;
        }
    }

    if ( this.offsets.x != null && this.offsets.x != '-' ){
        options += ", xshift=" + this.offsets.x + this.flowtex.default.unit;
    }
    if ( this.offsets.y != null && this.offsets.y != '-' ){
        options += ", yshift=" + this.offsets.y + this.flowtex.default.unit;
    }

    if ( this._width !== null ){
      options += ", text width=" + this._width + this.flowtex.default.unit;
    }

    options += "]";
    var node = "\\node (" + this.name + ") " + options + " " + caption + ";\n";
    if ( this.aboveNode != null ){
        node += this.aboveNode.toLatex();
    }
    if ( this.leftNode != null ){
        node += this.leftNode.toLatex();
    }
    if ( this.rightNode != null ){
        node += this.rightNode.toLatex();
    }
    if ( this.belowNode != null ){
        node += this.belowNode.toLatex();
    }
    return node;
};

module.exports = Node;
