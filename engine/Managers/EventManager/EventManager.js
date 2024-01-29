class EventManager{
    __events = {};
    
    constructor(canvas, scenes){
        this.scenes = scenes;
        this.scaleX = canvas.width/canvas.clientWidth;
        this.scaleY = canvas.height/canvas.clientHeight;
        canvas.onclick = (event) => this.onMouseEvent('click', event.clientX*this.scaleX, event.clientY*this.scaleY);
        canvas.onpointerdown = (event) => this.onMouseEvent('mousedown', event.clientX*this.scaleX, event.clientY*this.scaleY);
        canvas.onpointerup = (event) => this.onMouseEvent('mouseup', event.clientX*this.scaleX, event.clientY*this.scaleY);
        canvas.onpointermove = (event) => this.onMouseEvent('mousemove', event.clientX*this.scaleX, event.clientY*this.scaleY);
        window.onresize = () => {
            this.scaleX = canvas.width/canvas.clientWidth;
            this.scaleY = canvas.height/canvas.clientHeight;
        }
    }

    addEvent(name){
        this.__events[name] = {};
    }

    getObjX(obj){
        return obj.element.props.left + (obj.element.props.parent.props.left);
    }

    getObjY(obj){
        return obj.element.props.top + obj.element.props.parent.props.top;
    }

    onMouseEvent(event, x, y){
        const obj = this.scenes.getActiveScene().interactiveObjects
            .sort((a,b) => b.element.props.z - a.element.props.z)
            .find(obj => (this.getObjX(obj)+obj.body.dx <= x 
                && this.getObjX(obj)+obj.body.dx + obj.body.width>= x
                && this.getObjY(obj)+obj.body.dy <= y
                && this.getObjY(obj)+obj.body.dy + obj.body.height >= y));
        if (obj) {
            if(event === "click") obj.onclick();
            if(event === "mousedown") obj.onmousedown();
            if(event === "mouseup") obj.onmouseup();
            if(event === "mousemove") obj.onmousemove(x,y);
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