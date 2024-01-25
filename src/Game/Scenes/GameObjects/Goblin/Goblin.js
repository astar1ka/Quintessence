class Goblin extends SceneObject{

    animation = {
        step: 1,
        name: 'idle',
        base: 'idle'
    }

    hp = 15;

    dmg = 2;
    alive = true;

    constructor(){
        super('goblin',300,300);
        this.spritesName = 'goblin';
        this.animations = GoblinAnimations;
        this.setAnimation('idle');
    }

    attack(enemy){
        this.setAnimation("atk");
        enemy.damage(this.dmg);
    }

    play(){
        if(this.alive) {
            this.animation.step ++;
            if (this.animation.step >= this.animations[this.animation.name].maxStep) {
                if (this.animation.name !="dead") 
                    this.setAnimation(this.animation.base)
                else
                    this.alive = false
            };
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

}