class SceneObject{

    _scaleX = 1;
    _scaleY = 1;
    _reverse = false;
    x = 0;
    y = 0;
    z = 0;
    sprite = {
        name: '',
        width: 0,
        height: 0
    }
    body = {
        dx: 0,
        dy: 0,
        width: 0,
        height: 0
    }

    

    constructor(name, width, height){
        this.sprite.name = name;
        this.sprite.width = width;
        this.sprite.height = height;
        this.body.width = width;
        this.body.height = height;
    }

    setScale(x, y = x){
        this._scaleX = x;
        this._scaleY = y;
    }

    into(x,y){
        const left = this.x + this.body.dx;
        const top = this.y + this.body.dy;
        return (x >= left && x <= left + this.body.width*this._scaleX && y >= top && y <= top + this.body.height*this._scaleY)
    }

    onclick(){
        
    }
}