class Canvas {
    constructor(){
        this._canvas = document.createElement("canvas");
        this._canvas.width = 0;
        this._canvas.height = 0;
        this._precanvas = document.createElement("canvas");
        this._precanvas.width = 1000;
        this._precanvas.height = 1000;
        this._context = this._canvas.getContext("2d");
        this._context.imageSmoothingEnabled = false;
        this.baseFont = "12px serif"
    }

    check(right, bottom){
        if (this._canvas.width < right) this._canvas.width = right;
        if (this._canvas.height < bottom) this._canvas.height = bottom;
    }

    write(x,y,text,font = this.baseFont){
        this._context.font = font;
        this._context.fillText(text, x, y)
    }

    draw(obj, dx, dy, width, height, sx, sy){
        const scaleX = width/obj.original.width;
        const scaleY = height/obj.original.height;
        this.check(dx + width,dy + height);
        let dX = obj.data.dx + sx*obj.data.width/obj.original.width;
        let x = dx;
        if (obj.reverse) {
            x = -width;
            //dX = obj.data.img.width - dX - obj.data.width*width/obj.original.width;
            this._context.translate(dx,0);
            this._context.scale(-1,1);
        }
        this._context.drawImage(obj.data.img, dX, obj.data.dy + sy*(obj.data.height/obj.original.height || 1),  obj.data.width*scaleX, obj.data.height*scaleY, x, dy, width, height);
    }

    rect(props, dx, dy, width, height, sx, sy){
        this._precanvas.width = props.original.width;
        this._precanvas.height = props.original.height;
        const ctx = this._precanvas.getContext("2d");
        ctx.save();
        ctx.clearRect(0,0,this._precanvas.width, this._precanvas.height);
        ctx.fillStyle = props.data.color;
        ctx.fillRect(0,0,props.original.width, props.original.height);
        ctx.fill();
        props.data = {
                img: this._precanvas,
                dx: 0,
                dy: 0,
                width: props.original.width,
                height: props.original.height
        }
        ctx.restore();
        this.draw(props, dx, dy, width, height, sx, sy);
    }

    render(type, props, dx, dy, width, height, sx, sy){
        this._context.save();
        switch(type){
            case'sprite': this.draw(props, dx, dy, width, height, sx, sy);
                break;
            case'div': this.rect(props, dx, dy, width, height, sx, sy);
                break;
            case 'text': this.write(dx, dy, props.text, props.font);
                break;
        }
        this._context.restore();
    }
}