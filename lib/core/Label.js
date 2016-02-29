var Label = function(direction, text){
    switch (direction) {
        case 'left':
            this.direction = "east";
            break;
        case 'right':
            this.direction = "west";
            break;
        case 'up':
            this.direction = "south";
            break;
        case 'down':
            this.direction = "north";
            break;
        default:
            throw "direction must be up, down, left or right";
    }
    this.text = text;
};

Label.prototype.toLatex = function(){
    return "node[anchor=" + this.direction + "] {" + this.text +"}";
};

module.exports = Label;
