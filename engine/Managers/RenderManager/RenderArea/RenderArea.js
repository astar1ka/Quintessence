class RenderArea{

    _children = [];
    _parent = this;
    _renderObject = [];


    constructor(canvas, x, y, width, height){
        this.canvas = canvas;
        this._canvas = document.createElement("canvas");
        this._canvas.width = width;
        this._canvas.height = height;
        this._contex = this._canvas.getContext("2d");
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this._dirty = true;
    }

    addChild(child){
        this._dirty = true;
        this._children.push(child);
        child._parent = this;
    }

    deleteChild(child){
        this._dirty = true;
        this._children = this._children.filter(el => el != child);
    }

    getCross(x11,y11,x12,y12,x21,y21,x22,y22){
        const x1 = (x11 > x21) ? x11 : x21;
        const y1 = (y11 > y21) ? y11 : y21;
        const x2 = (x12 < x22) ? x12 : x22;
        const y2 = (y12 < y22) ? y12 : y22;
        if ((x1 <= x2) && (y1<=y2)) 
        return {
            x: x1,
            y: y1,
            width: x2-x1,
            height: y2-y1
        };
        return null;
    }

    getRenderObjects(x = this.x, y = this.y, width = this.width, height = this.height){
        let result = [];
        this._renderObject.forEach(obj => {
            const cross = this.getCross(
                x, y, x+width, y + height,
                obj.x, obj.y, obj.x+obj.sprite.width*obj._scaleX, obj.y + obj.sprite.height*obj._scaleY);
            if (cross) result.push({
                sprite: {
                    name: obj.sprite.name,
                    dx: (cross.x - obj.x)/obj._scaleX,
                    dy: (cross.y - obj.y)/obj._scaleY,
                    width: cross.width/obj._scaleX,
                    height: cross.height/obj._scaleY

                },
                x: cross.x,
                y: cross.y,
                scaleX: obj._scaleX,
                scaleY: obj._scaleY,
                reverse: obj._reverse
            });
        })
        this._children.forEach(child => {
            const cross = this.getCross(
                x, y, x+width, y + height,
                child.x, child.y, child.x+child.width, child.y + child.height);
            if (cross) {
                const objs = child.getRenderObjects(cross.x, cross.y, cross.width, cross.height);
                result = result.concat(objs);
            };
        });
        return result;
    }

    addRenderObject(obj){
        this._renderObject.push(obj);
    }
    
    render(){
        if (this._dirty){
            this._dirty = false;
            let objs = this._parent.getRenderObjects(this.x, this.y, this.width, this.height);
            objs.sort( (a,b) => a.z - b.z).forEach(obj => this.canvas.draw(obj));
            objs = null;
        }
    }
}