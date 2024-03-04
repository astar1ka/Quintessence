class Cell{
    constructor(content){
        this.content = content;
    }

    neighbours = {
        up: null,
        down: null,
        right: null,
        left: null
    };

    constructor(id,paths){
        this.id = id;
        this.paths = paths;
    }

    canMove(direction){
        return this.neighbours[direction];
    }

    setContent(){

    }

    getContent(){

    }
}