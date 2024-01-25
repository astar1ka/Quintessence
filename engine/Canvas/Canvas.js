class Canvas {
    constructor(){
        this._canvas = document.createElement("canvas");
        this._canvas.width = 0;
        this._canvas.height = 0;
        this._context = this._canvas.getContext("2d");
    }

    clear(area){
        this._context.fillRect(area.left, area.top, area.right-area.left, area.bottom-area.top);
        this._context.fill();
    }


    check(right, bottom){
        if (this._canvas.width < right) this._canvas.width = right;
        if (this._canvas.height < bottom) this._canvas.height = bottom;
    }

    draw(obj, dx, dy, width, height, sx, sy){
        const scaleX = width/obj.original.width;
        const scaleY = height/obj.original.height;
        this.check(dx + width,dy + height);
        let dX = obj.image.dx + sx*obj.image.width/obj.original.width;
        let x = dx;
        if (obj.reverse) {
            x = -width;
            dX = obj.image.img.width - dX - obj.image.width*width/obj.original.width;
            this._context.translate(dx,0);
            this._context.scale(-1,1);
        }
        this._context.drawImage(obj.image.img, dX, obj.image.dy + sy*obj.image.height/obj.original.height,  obj.image.width*scaleX, obj.image.height*scaleY, x, dy, width, height);
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