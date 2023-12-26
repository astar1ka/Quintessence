class NodeField{

    paths = {};

    constructor(id,paths){
        this.id = id;
        this.paths = paths;
    }

    canMove(node){
        return Object.values(this.paths).includes(node);
    }

}