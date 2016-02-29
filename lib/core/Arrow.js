var Arrow = function(origin, target){
        this.arrowType = "--";
        this.originNode = typeof origin === "undefined" ? null : origin;
        this.targetNode = typeof target === "undefined" ? null : target;
        this.labelNode = null;
};

Arrow.prototype.origin = function(node){
    if ( typeof node === "undefined" ){
        return this.originNode;
    }
    this.originNode = node;
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
    return "\\draw [arrow] (" + this.originNode.name + ") "
        + this.arrowType
        + (this.labelNode == null ? '' : this.labelNode.toLatex())
        + " (" + this.targetNode.name + ");\n"
    ;
};

module.exports = Arrow;
