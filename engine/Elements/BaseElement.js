class BaseComponent{

    children = [];
    old = [];
    dirty = true;
    cache = [];

    constructor(props){
        this.baseWidth = props.width;
        this.baseHeight = props.height;
        this.width = this.baseWidth;
        this.height = this.baseHeight;
        this.left = props.left;
        this.top = props.top;
        this.x = props.parent.x + this.left;
        this.y = props.parent.y + this.top;
        this.parent = props.parent;
        this.old.x = this.x;
        this.old.y = this.y;
        this.old.width = this.width;
        this.old.height = this.height;
    }

    setScale(scaleX, scaleY){
        this.width = this.baseWidth * scaleX;
        this.height = this.baseHeight * scaleY;
    }

    setLeft(){

    }

    setTop(){

    }

    setPosition(left,top){
        this.top = top;
        this.left = left;
        this.update();
    }

    getCache(){
        return this.cache.map();
    }

    updateCache(){
        this.cache = parent.getCache().push(Rect.intersection(this, parent));
        this.old.cache = parent.getCache().push(Rect.intersection(this.old, parent));
    }

    updatePosition(){
        this.old.x = this.x;
        this.old.y = this.y;
        this.x = this.parent.x + this.left;
        this.y = this.parent.y + this.top;
        this.updateCache();
        this.children.forEach(child => child.update());
        this.dirty = true;
    }
}