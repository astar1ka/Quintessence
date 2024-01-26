class GameScene extends Scene {
    constructor(name) {
        super(name);
        this.gameObjects = [];
    }



    async preload() {
        await this._load('swords', "./src/assets/sprites/Swords.png");
        await this._load('atk1', "./src/assets/sprites/FireAtk1.png");
        await this._load('atk2', "./src/assets/sprites/FireAtk2.png");
        await this._load('atk3', "./src/assets/sprites/FireAtk3.png");
        await this._load('back_1', "./src/assets/backgrounds/Background_1.png");
        await this._resources.loadSpriteMap("./src/assets/sprites/Hero.png", HeroSpriteAtlas);
        await this._resources.loadSpriteMap("./src/assets/sprites/Goblin.png", GoblinSpriteAtlas);
        await this._resources.loadSpriteMap("./src/assets/sprites/Elements.png", ElementsSpriteAtlas);
        await this._resources.loadSpriteMap("./src/assets/sprites/SkillMeter.png", [
            {
                name: "skill.fire",
                dx: 0,
                dy: 0 * he,
                width: we,
                height: he
            },
            {
                name: "skill.water",
                dx: we,
                dy: 0 * he,
                width: we,
                height: he
            },
            {
                name: "skill.nature",
                dx: we * 2,
                dy: 0 * he,
                width: we,
                height: he
            },
            {
                name: "skill.earth",
                dx: we * 3,
                dy: 0 * he,
                width: we,
                height: he
            },
            {
                name: "skill.wind",
                dx: we * 4,
                dy: 0 * he,
                width: we,
                height: he
            }
        ]);

        
    }
    
    async create() {
    this.hero = new Hero('hero');
    this.createSprite(this.hero, this.background, 1000, 500);
    this.hero.element.props.top = 300;
    this.hero.element.props.left = -200;
    this.hero.element.props.z = 0;
    this.background.props.width = 1920;
    this.background.props.height = 1080;
    this.background.props.sprite.name = "back";

    this.enemy = new Goblin;
    this.createSprite(this.enemy, this.background, 600, 600);
    this.enemy.element.props.top = 430;
    this.enemy.element.props.left = 1300;

    this.player = new Player("1", this.hero, this.enemy);
    this.battleground = new BattleGround(this.player, this.enemy, 7, 7);


    const battleground = this.createDiv();

    battleground.props.left = 620;
    battleground.props.top = 0;
    battleground.props.width = 620;
    battleground.props.height = 1080;
    battleground.props.z = 1;
    battleground.props.color = "rgba(0,0,0,0.7)";
    battleground.props.z = 100;



    this.battleground.element = battleground;

    this.battleground.onmousemove = (x, y) => {
        if (this.battleground.drag) {
            this.battleground.drag.element.props.left = x - this.battleground.element.props.left - 32;
            this.battleground.drag.element.props.top = y - this.battleground.element.props.top - 32;
            this._render.updateElement(this.battleground.element)
        };
    }

    this.setInteractive(this.battleground);


    Object.keys(this.battleground.nodes).forEach(nodeId => {
        const obj = new Element(this.battleground.nodes[nodeId], this.battleground);
        obj.x = 30 + nodeId % 7 * 80;
        obj.y = 200 + Math.trunc(nodeId / 7) * 80;
        obj.setScale(0.4);
        this.gameObjects.push(obj);
        this.createSprite(obj, this.battleground.element, 64, 64);
        obj.element.props.left = obj.x;
        obj.element.props.top = obj.y;
    });
    this.enemy.x = 480;
    this.enemy.y = 140;
    this.hero.x = -100;
    this.hero.y = 80;
    this.hero.z = 1;
    this.test = []
    this.player.inventory = [];
    for (i = 0; i < 5; i++) {
        const obj = new Element({}, this.battleground);
        this.player.inventory.push(obj);
        obj.x = 110 + i % 7 * 80;
        obj.y = 850;
        obj.setScale(0.4);
        this.gameObjects.push(obj);
        this.createSprite(obj, this.battleground.element, 64, 64);
        obj.element.props.left = obj.x;
        obj.element.props.top = obj.y;
        obj.element.props.z = 1000;
        obj.setPower("fire");
        this.setInteractive(obj);
        obj.onmousemove = (x, y) => {
            if (this.battleground.drag) {
                this.battleground.drag.element.props.left = x - this.battleground.element.props.left - 32;
                this.battleground.drag.element.props.top = y - this.battleground.element.props.top - 32;
                this._render.updateElement(this.battleground.element);
            };
        }
        obj.onmousedown = () => {
            if (obj.active)
                this.battleground.drag = obj;
        }
        obj.onmouseup = () => {
            this.battleground.drag = null;
            const node = this.battleground.getNodeByXY(obj.element.props.left, obj.element.props.top);
            obj.element.props.left = obj.x;
            obj.element.props.top = obj.y;
            if (node) {
                const power = obj.power;
                obj.setPower(node.element.power);
                node.element.setActive(true);
                node.element.setPower(power);
                this.battleground.fullCheck(node.id)
                obj.setActive(false);
            }
            this._render.updateElement(this.battleground.element);
        }
        this.test.push(obj)
    }

    const energyPoints = []
    for (let i = 0; i < 3; i++)
        for(let j = 0; j < 8; j++){
        const point = this.createObject('skill.fire');
        energyPoints.push(point);
        this.createSprite(point, this.hero.element, 32, 32);
        point.element.props.left = 350 + j*39;
        point.element.props.top = 180 + i*39;
        point.element.props.sprite.name = point.sprite.name;
        this._render.updateElement(point.element);
        this.gameObjects.push(point);
        point.element.props.hide = true;
    }

    this.player.energyPoints = energyPoints;

    this.battleground.newBattle();
    this.hero.state = 1;


    this.atk1Button = new Button("atk1", 200, 200, () => this.player.setEnergy(this.hero.power, this.hero.attack(this.enemy, this.player.energy, "atk1")));
    this.createSprite(this.atk1Button, this.background, 90, 90);
    this.atk1Button.element.props.left = 150;
    this.atk1Button.element.props.top = 900;
    this.atk1Button.element.props.sprite.name = this.atk1Button.sprite.name;
    this._render.updateElement(this.atk1Button.element);
    this.gameObjects.push(this.atk1Button);

    this.atk2Button = new Button("atk2", 200, 200, () => this.player.setEnergy(this.hero.power, this.hero.attack(this.enemy, this.player.energy, "atk2")));
    this.createSprite(this.atk2Button, this.background, 90, 90);
    this.atk2Button.element.props.left = 250;
    this.atk2Button.element.props.top = 900;
    this.atk2Button.element.props.sprite.name = this.atk2Button.sprite.name;
    this._render.updateElement(this.atk2Button.element);
    this.gameObjects.push(this.atk2Button);

    this.atk3Button = new Button("atk3", 200, 200, () => this.player.setEnergy(this.hero.power, this.hero.attack(this.enemy, this.player.energy, "atk3")));
    this.createSprite(this.atk3Button, this.background, 90, 90);
    this.atk3Button.element.props.left = 350;
    this.atk3Button.element.props.top = 900;
    this.atk3Button.element.props.sprite.name = this.atk3Button.sprite.name;
    this._render.updateElement(this.atk3Button.element);
    this.gameObjects.push(this.atk3Button);

    const endTurnCallback = () => {
        this.battleground.newBattle();
        this.player.inventory.forEach(item => item.setActive(true));
        this._render.updateElement(this.battleground.element);
        this.enemy.attack(this.hero);
        setTimeout(() => this.player.status(), 500);
    }

    this.endTurnButton = new Button("swords", 200, 200, endTurnCallback);
    this.createSprite(this.endTurnButton, this.battleground.element, 150, 150);
    this.endTurnButton.element.props.left = 230;
    this.endTurnButton.element.props.top = 930;
    this.endTurnButton.element.props.z = 1000;
    this.endTurnButton.element.props.sprite.name = this.endTurnButton.sprite.name;
    this._render.updateElement(this.endTurnButton.element);
    this.gameObjects.push(this.endTurnButton);

    this.setInteractive(this.atk1Button);
    this.setInteractive(this.atk2Button);
    this.setInteractive(this.atk3Button);
    this.setInteractive(this.endTurnButton);

    const hpBar = this.createDiv(this.hero.element);
    hpBar.props.left = 346;
    hpBar.props.top = 136;
    hpBar.props.width = 308;
    hpBar.props.height = 20;
    hpBar.props.color = "rgba(0,0,0,0.7)";
    hpBar.props.z = 100;

    const hp = this.createDiv(this.hero.element);
    hp.props.left = 350;
    hp.props.top = 140;
    hp.props.width = 300;
    hp.props.height = 12;
    hp.props.color = "rgba(0,120,0,0.7)";
    hp.props.z = 100;
    this.player.hpBar = hp;



    const enemyHpBar = this.createDiv(this.enemy.element);
    enemyHpBar.props.left = 136;
    enemyHpBar.props.top = 6;
    enemyHpBar.props.width = 308;
    enemyHpBar.props.height = 20;
    enemyHpBar.props.color = "rgba(0,0,0,0.7)";
    enemyHpBar.props.z = 100;

    const enemyHp = this.createDiv(this.enemy.element);
    enemyHp.props.left = 140;
    enemyHp.props.top = 10;
    enemyHp.props.width = 300;
    enemyHp.props.height = 12;
    enemyHp.props.color = "rgba(0,120,0,0.7)";
    enemyHp.props.z = 100;
    this.player.enemyHpBar = enemyHp;

    this.gameObjects.push(this.hero);
    this._render.updateElement(this.background);
}

    async update() {
    this.hero.play();
    this._render.updateElement(this.hero.element);
    this.enemy.play();
    this._render.updateElement(this.enemy.element);
}
}