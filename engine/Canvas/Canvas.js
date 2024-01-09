class Canvas {
    constructor(width, height, resources){
        this._canvas = document.createElement("canvas");
        this._canvas.width = width;
        this._canvas.height = height;
        this._context = this._canvas.getContext("2d");
        this._resources = resources;
    }

    draw(obj){
        const image = this._resources.get(obj.sprite.name);
        this._context.save();
        let x = obj.x;
        let scaleX = obj.scaleX;
        if (obj.sprite.reverse) {
            x = -x - image.width * obj.scaleX;
            scaleX *= -1;
        }
        this._context.scale(scaleX, obj.scaleY);
        x = x / obj.scaleX;
        const y = obj.y / obj.scaleY;
        this._context.drawImage(image.img, image.dx + obj.sprite.dx, image.dy+ obj.sprite.dy,  obj.sprite.width, obj.sprite.height, x, y, obj.sprite.width, obj.sprite.height);
        this._context.restore();
        obj = null;
    }
}