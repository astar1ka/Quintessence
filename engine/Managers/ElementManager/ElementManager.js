class ElementManager{

    elements = {};

    constructor(game){
        this.id = 0;
        this.game = game;
    }

    addElement(element){
        const id = this.id;
        this.id++;
        this.elements[id] = element;
        return id;
    }

    deleteElement(id){
        this.elements[id] = null;
    }

    getElement(id){
        this.getElement(id);
        this.game.managers.events.clear(id);
    }

    subscribe(name, func, id){
        this.game.managers.events.subscribe(name, func, id);
    }

    unsubscribe(name, id){
        this.game.managers.events.unsubscribe(name, id);
    }
}