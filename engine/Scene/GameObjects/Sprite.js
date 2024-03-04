class Sprite extends GameObject{

    animation = {
        step: 1,
        name: "",
        base: "",
    }

    constructor(props){
        super(props.scene);
        this.element = this._render.createElement("sprite", props.parent);
        this.element.props.width = width.width;
        this.element.props.height = height.height;
    }

    _setAnimation(name){
        this.animation.step = 1;
        this.animation.name = name;
    }

    
}