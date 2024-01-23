class EventManager{
    __events = {};
    
    constructor(){

    }

    addEvent(name){
        this.__events[name] = {};
    }

    subscribe(name, callback, id){
        if (callback instanceof Function)
            this.__events[name][id] = (event) => callback(event);
    }

    call(name, event){
        Object.values(this.__events[name]).forEach(cb => cb(event));
    }

    unsubscribe(name, id){
        delete this.__events[name][id];
    }

    clear(id){
        Object.values(this.__events).forEach(event => delete event[id]);
    }
}