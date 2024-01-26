class Button extends SceneObject{

    active = true;

    constructor(sprite, width, height,action) {
        super(sprite, width, height);
        this.action = action;
    }

    setPower(power){
        if (this.active){
            this.power = power;
            this.element.props.sprite.name = power;
        }
    }

    setActive(active){
        this.active = active;
        this.element.props.sprite.name = (this.active) ? this.power : (this.power + "_destroy");
    }

    press(){
        
    }

    postpress(){

    }

    onclick(){
        if (this.active)
            this.action()
    }

    onmousemove(x,y){
    }

    onmouseup(){
    }

    onmousedown(){
        this.press();
    }
}