class Hero extends SceneObject{

    animation = {
        step: 1,
        name: 'idle',
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

    constructor(spritesName){
        super(spritesName,512,256);
        this.spritesName = spritesName;
        this.animations = HeroAnimations;
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
                if (this.animation.name !="dead") 
                this.setAnimation(this.animation.base)
                else
                this.alive = false;
                this.updateSprite();
        }
    }

    updateSprite(){
        this.element.props.sprite.name = this.spritesName + "." + this.animation.name + "_"+ (Math.trunc(this.animation.step/this.animations[this.animation.name].stepOnFrame) + 1);
    }

    setAnimation(name){
        this.animation.step = 1;
        this.animation.name = name;
        //this.element.props.z = 10;
    }

    attack(enemy, type){
            this.setAnimation(type);
            this.element.props.z = 15;
            enemy.damage(this.dmg[type])
            return -1*this.costs[type];
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