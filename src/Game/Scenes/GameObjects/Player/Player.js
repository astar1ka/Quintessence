class Player{

    energy = {
        fire: 0,
        water: 0,
        earth: 0,
        nature: 0,
        wind: 0
    }
    actions = 0;

    constructor(name,hero, enemy){
        this.name = name;
        this.hero = hero;
        this.enemy = enemy;
    }

    setEnergy(power, dValue){
        if (power != ""){
            this.energy[power] += dValue;
            if (this.energy[power] < 0) this.energy[power] = 0;
            this.status();
        }
    }

    restore(power){
        switch(power){
            case "water":
                this.hero.hp += 1; 
            break;
            case "earth":
                this.hero.block = true;
            break;
        }
        this.actions = this.hero.speed;
        this.status();
    }

    status(){
        this.energyPoints.forEach(point => point.element.props.hide = true)
        for(let i = 0; i < this.energy[this.hero.power]; i++) this.energyPoints[i].element.props.hide = false;
        if (this.hpBar) this.hpBar.props.width = 300*this.hero.hp/this.hero.maxHp;
        if (this.enemyHpBar) this.enemyHpBar.props.width = 300*this.enemy.hp/this.enemy.maxHp;
        
    }


}