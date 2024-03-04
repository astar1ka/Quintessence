class EventManager{
    __events = {};
    activeElement = null;
    
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

    isInside(obj, x, y){
        const X = this.getObjX(obj)+obj.body.dx;
        const Y = this.getObjY(obj)+obj.body.dy;
        const result = ( X <= x 
        && X + obj.body.width >= x
        && Y <= y
        && Y + obj.body.height >= y);
        return result;
    }

    getActiveElement(){

    }

    onMouseEvent(event, x, y){
        const obj = this.scenes.getActiveScene().interactiveObjects
        .sort((a,b) => b.element.props.z - a.element.props.z)
        .find(obj => this.isInside(obj, x, y));
        if (this.activeElement && (this.activeElement != obj || !this.isInside(this.activeElement, x, y))){
            if (this.activeElement.onmouseout && this.activeElement.onmouseout instanceof Function) this.activeElement.onmouseout();
            if (obj) {
                if (obj.onmousein && obj.onmousein instanceof Function) obj.onmousein();
            }
            this.activeElement = null;
        }
        if (obj){
            this.activeElement = obj;
            if(event === "click") this.activeElement.onclick(x,y);
            if(event === "mousedown") this.activeElement.onmousedown(x,y);
            if(event === "mouseup") this.activeElement.onmouseup(x,y);
            if(event === "mousemove") this.activeElement.onmousemove(x,y);
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