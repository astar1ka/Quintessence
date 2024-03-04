class Player{

    energy = {
        max: 5,
        current: 5,
        counter: 5,
        restore: 2
    }


    constructor(name,hero, enemy){
        this.name = name;
        this.hero = hero;
        this.enemy = enemy;
    }

    setEnergy(value){
        this.energy.counter = value;
        this.status();
    }

    acceptTurn(){
        if (this.energy.counter < 0) return false; 
        this.energy.current = this.energy.counter;
        this.status();
        return true;
    }

    cancelTurn(){
        this.setEnergy(this.energy.current);
    }



    restore(power){
        /*switch(power){
            case "water":
                this.hero.hp += 1; 
            break;
            case "earth":
                this.hero.shield = 2;
            break;
            case "fire":
                this.hero.damageBonus = 1;
            break;
            case "wind":
                this.setEnergy(this.hero.power, 1);
            break;
            case "nature":
                this.hero.restore = true;
            break;
        }*/
    }

    status(){
        /*this.energyPoints.forEach(point => point.element.props.hide = true)
        for(let i = 0; i < this.energy[this.hero.power]; i++) this.energyPoints[i].element.props.hide = false;*/
        console.log(this.energy.counter);
        if (this.hpBar) this.hpBar.props.width = 300*this.hero.hp/this.hero.maxHp;
        if (this.enemyHpBar) this.enemyHpBar.props.width = 300*this.enemy.hp/this.enemy.maxHp;
        
    }

    action(type, value){
        if (type === this.hero.power) {
            if (value === 3) this.hero.attack(this.enemy, "atk1");
            if (value === 4) this.hero.attack(this.enemy, "atk2");
            if (value === 5) this.hero.attack(this.enemy, "atk3");
        }
        this.status();
    }


}