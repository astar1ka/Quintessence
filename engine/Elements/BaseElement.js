class BaseElement{
    constructor(parent = null, childrens = []){
        this._left = 0;
        this._top = 0;
        this._childrens = childrens;
        this._parent = parent;
    }

    addChildren(children){
        this._childrens.push(chidlren);
    }

    removeChildren(children){
        this._childrens = this._childrens.filter(el => el != children);
    }

    getHead(){
        if (this._parent.getHead) return this._parent.getHead();
        return this;
    }
}

/*    

addEventListenner(name, func){
        this.manager.subcribe(name, func, this.id);
    }

    deleteEventListenner(name){
        this.manager.unsubcribe(name, this.id);
    }

    delete(){
        this.manager.deleteElement(this.id);
    }

*/