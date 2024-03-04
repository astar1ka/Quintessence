class NodeField{

    paths = {};

    constructor(id,paths){
        this.id = id;
        this.paths = paths;
        this.selected = false;
    }

    canMove(node){
        return Object.values(this.paths).includes(node);
    }
}