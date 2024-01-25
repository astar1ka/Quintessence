class EventManager{
    __events = {};
    
    constructor(canvas, scenes){
        this.scenes = scenes;
        canvas.onclick = (event) => this.onMouseEvent('click', event.clientX, event.clientY);
        canvas.onmousedown = (event) => this.onMouseEvent('mousedown', event.clientX, event.clientY);
        canvas.onmouseup = (event) => this.onMouseEvent('mouseup', event.clientX, event.clientY);
        canvas.onmousemove = (event) => this.onMouseEvent('mousemove', event.clientX, event.clientY);
    }

    addEvent(name){
        this.__events[name] = {};
    }

    onMouseEvent(event, x, y){
        const obj = this.scenes.getActiveScene().interactiveObjects.sort((a,b) => b.element.props.z - a.element.props.z).find(obj => (obj.element.props.left+obj.body.dx <= x && obj.element.props.left+obj.body.dx + obj.body.width>= x));
        if (obj) {
            if(event === "click") obj.onclick();
            if(event === "mousedown") obj.onmousedown();
            if(event === "mouseup") obj.onmouseup();
            if(event === "mousemove") obj.onmousemove();
        }
    }

    call(name, event){
        if (this.__events[name])
            Object.values(this.__events[name]).forEach(cb => cb(event));
    }

    unsubscribe(name, id){
        delete this.__events[name][id];
    }

    clear(id){
        Object.values(this.__events).forEach(event => delete event[id]);
    }
}