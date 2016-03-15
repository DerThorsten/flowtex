var Arrow = function(origin, target, type, offset){
        this.originNode = typeof origin === "undefined" ? null : origin;
        this.targetNode = typeof target === "undefined" ? null : target;
        this.labelNode = null;
        this.setType(type);
        this.setOffset(offset);
};

Arrow.prototype.origin = function(node){
    if ( typeof node === "undefined" ){
        return this.originNode;
    }
    this.originNode = node;
};

Arrow.prototype.setType = function(type){
  this.arrowType = typeof type === "undefined" ? "--" : type;
};

Arrow.prototype.setOffset = function(offset){
  this.arrowOffset = typeof offset === "undefined" ? null : offset;
};

Arrow.prototype.target = function(node){
    if ( typeof node === "undefined" ){
        return this.targetNode;
    }
    this.targetNode = node;
};

Arrow.prototype.setLabel = function(label){
    this.labelNode = label;
};

Arrow.prototype.toLatex = function(){
    if ( typeof this.originNode === "undefined" ||
        typeof this.targetNode === "undefined" ){
            return "% arrow error\n";
        }
    var offset = "";
    if (this.arrowOffset !== null){
      offset += " ++(" + this.arrowOffset.x + ", "
        + this.arrowOffset.y + ") " + this.arrowType + " ";
    }
    return "\\draw [arrow] (" + this.originNode.name + ") "
        + (this.arrowOffset === null ? this.arrowType : '--')
        + (this.labelNode == null ? '' : this.labelNode.toLatex())
        + offset
        + " (" + this.targetNode.name + ");\n"
    ;
};

module.exports = Arrow;
