class Hero2 extends SceneObject{

    animation = {
        step: 1,
        name: 'jump',
        base: 'idle'
    }

    power = 'fire';
    costs = {
        "atk1": 1,
        "atk2": 2,
        "atk3": 4,
        "skill": 7
    };
    dmg = {
        "atk1": 1,
        "atk2": 3,
        "atk3": 7,
        "skill": 10
    }
    speed = 5;
    hp = 15;
    maxHp = 15;
    alive = true;
    shield = 0;
    speed = {x: 0, y: 0};
    target = {x: 0, y: 0}

    constructor(spritesName){
        super(spritesName,512,256);
        this.spritesName = spritesName;
        this.animations = GroundHeroAnimations;
        this.setAnimation('idle');
        this.power = "fire";
        this.body = {
            dx: 150,
            dy: 100,
            width: 150,
            height: 150
        }
    }

    play(){
        if (this.alive) {
            this.animation.step ++;
            if (this.animation.step >= this.animations[this.animation.name].maxStep)
                if (this.animation.name !="dead"){
                    if (this.animation.name ==="walk") this.animation.step = 1;
                    else this.setAnimation(this.animation.base)
                } 
                
                else
                this.alive = false
                this.updateSprite();
        }
    }

    walk(){
        const dx = Math.abs(this.target.x - this.element.props.left);
        const dy = Math.abs(this.target.y - this.element.props.top);
        if (dx > 5 || dy > 5){
            this.element.props.left += this.speed.x;
            this.element.props.top += this.speed.y;
        } else if (this.animation.name === "walk") this.setAnimation(this.animation.base)

    }

    goto(x,y){
        this.setAnimation("jump");
        const dx = x - this.element.props.left;
        const dy = y - this.element.props.top;
        this.element.props.reverse = (dx < 0);
        const len = Math.sqrt(dx*dx+dy*dy);
        this.target = {x,y};
        this.speed.x = 8*dx/len;
        this.speed.y = 8*dy/len;
    }

    updateSprite(){
        this.element.props.sprite.name = this.spritesName + "." + this.animation.name + "_"+ (Math.trunc(this.animation.step/this.animations[this.animation.name].stepOnFrame) + 1);
    }

    setAnimation(name){
        this.animation.step = 1;
        this.animation.name = name;
    }

    attack(enemy, energy, type){
        if (energy[this.power] >= this.costs[type]) {
            this.setAnimation(type);
            enemy.damage(this.dmg[type])
            return -1*this.costs[type];
        }
        return 0;
    }

    damage(dmg){
        dmg -= this.shield;
        this.shield = 0;
        if (dmg < 0) dmg = 0;
        this.hp -= dmg;
        setTimeout(() => {
            this.setAnimation("hit")
            if(this.hp <= 0) this.dead();
        }, 500);
    }

    dead(){
        this.setAnimation("dead");
    }

    onclick(){
    }

    onmousemove(x,y){
    }

    onmouseup(){
    }

    onmousedown(){
    }

}