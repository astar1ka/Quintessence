class BaseElement{
    constructor(id, manager){
        this.id = id;
        this.manager = manager;
    }

    addEventListenner(name, func){
        this.manager.subcribe(name, func, this.id);
    }

    deleteEventListenner(name){
        this.manager.unsubcribe(name, this.id);
    }

    delete(){
        this.manager.deleteElement(this.id);
    }
}