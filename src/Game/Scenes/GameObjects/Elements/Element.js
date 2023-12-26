class Element extends SceneObject{

    selected = false;

    constructor(node, battleground){
        super('fire', 64, 64);
        this.node = node;
        this.battleground = battleground;
        this.node.element = this;
    }

    setPower(power){
        this.power = power;
        this.sprite.name = power;
    }

    select(){
        this.sprite.name = this.power + '_select'
        this.battleground.selected = this;
    }

    unselect(){
        this.sprite.name = this.power;
        this.battleground.selected = null;
    }

    onclick(){
        const selected = this.battleground.selected;
        if (selected) {
            selected.unselect();
            if (this.node.canMove(selected.node.id) && this.power != "" && selected.power != "") 
                this.battleground.swap(this.node,selected.node) 
                else this.select();
        } else this.select();
    }
}