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
        /*console.clear();
        console.log("HP:" + this.hero.hp);
        console.log("ENERGY:");
        console.log("|Fire|:" + this.energy.fire);
        console.log("|Water|:" + this.energy.water);
        console.log("|Earth|:" + this.energy.earth);
        console.log("|Nature|:" + this.energy.nature);
        console.log("|Wind|:" + this.energy.wind);
        console.log("--------------------------------");
        console.log("ENEMY")
        console.log("HP:" + this.enemy.hp);*/
    }


}