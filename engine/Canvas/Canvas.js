class Canvas {
    constructor(){
        this._canvas = document.createElement("canvas");
        this._canvas.width = 0;
        this._canvas.height = 0;
        this._context = this._canvas.getContext("2d");
    }

    check(right, bottom){
        if (this._canvas.width < right) this._canvas.width = right;
        if (this._canvas.height < bottom) this._canvas.height = bottom;
    }

    draw(obj, dx, dy, width, height, sx, sy){
        this.check(dx + width,dy + height);
        if (obj.reverse) {
            this._context.translate(-1,0)
        }
        
        this._context.drawImage(obj.image.img, obj.image.dx + sx, obj.image.dy + sy,  obj.image.width, obj.image.height, dx, dy, width, height);
        if (obj.reverse)  this._context.scale(-1,1);
    }

    render(type, props, dx, dy, width, height, sx, sy){
        this._context.save();
        switch(type){
            case'sprite': this.draw(props, dx, dy, width, height, sx, sy);
                break;
        }
        this._context.restore();
    }
}