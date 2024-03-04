class BaseComponent{

    constructor(props){
        const {type = "body", left = 0, top = 0} = props;
        this.type = type;
        this.parent = parent;
        this.left = left;
        this.top = top;
    }

    setTop(top){
        this.setPosition(this.left, top);
    }

    setLeft(left){
        this.setPosition(left, this.top);
    }

    setPosition(left,top){
        this.top = top;
        this.left = left;
        this.updatePosition();
    }

    updatePosition(){
        this.old.x = this.x;
        this.old.y = this.y;
        this.x = this.parent.x + this.left;
        this.y = this.parent.y + this.top;
    }
}