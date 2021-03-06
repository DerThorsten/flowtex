var Arrow = require('./Arrow');
var Arrows = function(){
    this.map = {
        /*
        "a": {
            origins: [ node0, ..., nodeN ],
            targets: [ node0, ..., nodeK ],
            labels: {}
        }
        */
    };
    this.arrows = [];
    this.specialArrows = {};
};

Arrows.prototype.putLabel = function(name, node, label){
    if ( typeof this.map[ name ] === "undefined" ){
        throw "rule " + name +" not found";
    }
    this.map[ name ].labels[ node.name ] = label;
}

Arrows.prototype.putOrigin = function(name, node){
    if ( typeof this.map[ name ] === "object" ){

        var origins = this.map[ name ].origins;
        var found = false;
        origins.forEach(function(elem, index){
          if (elem.name == node.name){ found = true;}
        })
        if (!found){
          origins.push( node );
        }
    } else {
        this.map[ name ] = {
            origins: [ node ],
            targets: [],
            labels: {}
        }
    }
};

Arrows.prototype.putTarget = function(name, node){
    if ( typeof this.map[ name ] === "object" ){
        this.map[ name ].targets.push( node );
    } else {
        this.map[ name ] = {
            origins: [],
            targets: [ node ],
            labels: {}
        }
    }
}

Arrows.prototype.putArrowType = function(origin, target, type){
  var rule = this.map['path:' + origin.name + '@' + target.name];
  if (typeof rule === 'undefined'){
    return;
  }
  if (typeof this.specialArrows[origin.name + '@' + target.name] === 'undefined'){
    this.specialArrows[origin.name + '@' + target.name] = new Arrow(origin, target, type);
  } else {
    this.specialArrows[origin.name + '@' + target.name].setType(type);
  }
};

Arrows.prototype.putArrowOffset = function(origin, target, offset){
  var rule = this.map['path:' + origin.name + '@' + target.name];
  if (typeof rule === 'undefined'){
    return;
  }
  if (typeof this.specialArrows[origin.name + '@' + target.name] === 'undefined'){
    this.specialArrows[origin.name + '@' + target.name] = new Arrow(origin, target, '--', offset);
  } else {
    this.specialArrows[origin.name + '@' + target.name].setOffset(offset);
  }
};

Arrows.prototype.process = function(){
    var self = this;
    for (var rule in this.map){
        var origins = this.map[ rule ].origins;
        var targets = this.map[ rule ].targets;
        var labels = this.map[ rule ].labels;
        origins.forEach(function(origin, k, a){
            targets.forEach(function(target, j, b){
                var arrow;
                var specialArrow = self.specialArrows[origin.name + '@' + target.name];
                if (typeof specialArrow === 'undefined'){
                  arrow = new Arrow(origin, target);
                } else {
                  arrow = specialArrow;
                }
                if ( typeof labels[ origin.name ] !== "undefined" ){
                  arrow.setLabel(labels[ origin.name ]);
                } else if ( typeof labels[ target.name ] !== "undefined" ){
                  arrow.setLabel(labels[ target.name ]);
                }

                self.arrows.push(arrow);

            });
        });
    }
};

Arrows.prototype.toLatex = function(){
    var out = "";
    for (var i in this.arrows){
        out += this.arrows[i].toLatex();
    }
    return out;
};

module.exports = Arrows;
