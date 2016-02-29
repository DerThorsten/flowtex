var Arrows = require('./Arrows');
var Label = require('./Label');

var Node = function(text, type, flowtex){
    this.text = text;
    this.name = text.toLowerCase().replace(' ', '');
    if ( typeof type === "undefined" || type == null ){
        this.typeNode = "startstop";
    } else {
        this.typeNode = type;
    }
    this.belowOf = null;
    this.leftOf = null;
    this.rightOf = null;
    this.belowNode = null;
    this.leftNode = null;
    this.rightNode = null;
    this.originTargetName = null;
    this.flowtex = typeof flowtex === "undefined" ? null : flowtex;
    return this;
};

Node.prototype.type = function(type){
    this.typeNode = type;
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
    return this;
};

Node.prototype.right = function(node){
    node.rightOf = this;
    this.rightNode = node;
    return this;
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
    Node.setLabel(this, 'top', text);
    return this;
};

Node.prototype.downLabel = function(text){
    Node.setLabel(this, 'down', text);
    return this;
};

Node.prototype.toLatex = function(){
    var caption = "{" + this.text + "}";
    var options = "[" + this.typeNode ;
    if ( this.belowOf != null ){
        options += ", below of=" + this.belowOf.name;
    } else if ( this.leftOf != null ){
        options += ", left of=" + this.leftOf.name;
    } else if ( this.rightOf != null ){
        options += ", right of=" + this.rightOf.name;
    }
    options += "]";
    var node = "\\node (" + this.name + ") " + options + " " + caption + ";\n";
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
