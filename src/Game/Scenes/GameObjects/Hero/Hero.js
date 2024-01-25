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
        "atk2": 2,
        "atk3": 4,
        "skill": 7
    }
    speed = 5;
    hp = 15;
    alive = true;

    constructor(spritesName){
        super(spritesName,512,256);
        this.spritesName = spritesName;
        this.animations = HeroAnimations;
        this.setAnimation('idle');
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
                this.alive = false
                this.updateSprite();
        }
    }

    updateSprite(){
        this.element.props.sprite.name = this.spritesName + "." + this.animation.name + "_"+ (Math.trunc(this.animation.step/this.animations[this.animation.name].stepOnFrame) + 1);
    }

    setAnimation(name){
        this.animation.step = 1;
        this.animation.name = name;
    }

    attack(enemy, energy){
        if (energy >= this.costs["skill"]) {
            this.setAnimation('skill');
            enemy.damage(this.dmg['skill'])
            return -1*this.costs["skill"];
        }
        if (energy >= this.costs["atk3"]) {
            this.setAnimation('atk3');
            enemy.damage(this.dmg['atk3'])
            return -1*this.costs["atk3"];
        }
        if (energy >= this.costs["atk2"]) {
            this.setAnimation('atk2');
            enemy.damage(this.dmg['atk2'])
            return -1*this.costs["atk2"];
        }
        if (energy >= this.costs["atk1"]) {
            this.setAnimation('atk1');
            enemy.damage(this.dmg['atk1'])
            return -1*this.costs["atk1"];
        }
        return 0;
    }

    damage(dmg){
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
        console.log('hero click')
    }

    onmousemove(x,y){
    }

    onmouseup(){
        console.log('hero up')
    }

    onmousedown(){
        console.log('hero down')
    }

}