class GameScene extends Scene {
    constructor(gameScreen, name, mediator) {
        super(name);
        this.game = gameScreen;
        this.mediator = mediator;
        /*this.game.onclick = (event) => {
            const x = event.clientX * this.canvas.width / document.documentElement.clientWidth;
            const y = event.clientY * this.canvas.height / document.documentElement.clientHeight;
            this.gameObjects.forEach(obj => {
                if (obj.into(x,y)) {
                    obj.onclick();
                };
            });
        };*/
        this.gameObjects = [];
    }



    async preload() {
        await this._load('hpbar', "./src/assets/sprites/HPBar.png");
        await this._load('hpmeter', "./src/assets/sprites/HPMeter.png");
        await this._load('energymeter', "./src/assets/sprites/EnergyMeter.png");
        await this._load('back', "./src/assets/backgrounds/MainBackground.png");
        await this._load('back_1', "./src/assets/backgrounds/Background_1.png");
        await this._resources.loadSpriteMap("./src/assets/sprites/Hero.png", HeroSpriteAtlas);
        await this._resources.loadSpriteMap("./src/assets/sprites/Goblin.png", GoblinSpriteAtlas);
        await this._resources.loadSpriteMap("./src/assets/sprites/Elements.png", ElementsSpriteAtlas);
    }

    async create() {
        this.hero = new Hero('hero');
        console.log(this.hero);
        this.createSprite(this.hero, this.background, 800, 400);
        this.hero.element.props.top = 400;
        this.setInteractive(this.hero);
        //this.hero.element.props.left = 400;
        this.hero.element.props.z = 3;
        this.background.props.width = 1920;
        this.background.props.height = 1080;
        this.background.props.sprite.name = "back";
        this.background.props.sprite.reverse = true;
        this._render.updateElement(this.background);
        this.enemy = new Goblin;
        this.createSprite(this.enemy, this.background, 400, 400);
        this.enemy.element.props.top = 530;
        this.enemy.element.props.left = 800;
        this._render.updateElement(this.enemy.element);
        this.player = new Player("1", this.hero, this.enemy);
        this.battleground = new BattleGround(this.player, this.enemy, 5, 5);
        this.back = this.createObject('back');
        this.hpBar = this.createObject('hpbar');
        this.hpBar.x = 10;
        this.hpBar.y = 10;
        this.hpBar.setScale(0.5);
        this.hpMeter = this.createObject('hpmeter');
        this.hpMeter.x = 10;
        this.hpMeter.y = 10;
        this.hpMeter.setScale(0.5);
        //this.hero.attack(this.enemy, 1);
        this.enemy.attack(this.hero);
        //this.hero.setAnimation("atk3")
        this.energyMeter = this.createObject('energymeter');
        this.energyMeter.x = 10;
        this.energyMeter.y = 10;
        this.energyMeter.setScale(0.5);

        this.back.setScale(1.2);
        Object.keys(this.battleground.nodes).forEach(nodeId => {
            const obj = new Element(this.battleground.nodes[nodeId], this.battleground);
            obj.x = 325 + nodeId % 5 * 30;
            obj.y = 150 + Math.trunc(nodeId / 5)*30;
            obj.setScale(0.4);
            this.gameObjects.push(obj);
        });
        this._reverse = true;
        this.enemy.x = 480;
        this.enemy.y = 140;
        this.enemy.setScale(1);
        this.hero.x = -100;
        this.hero.y = 80;
        this.hero.z = 1;

        this.skillPoint1 = this.createObject('skill.fire');
        this.skillPoint2 = this.createObject('skill.fire');
        this.skillPoint3 = this.createObject('skill.fire');
        this.skillPoint4 = this.createObject('skill.fire');
        const skillPoints = [
            this.skillPoint1,
            this.skillPoint2,
            this.skillPoint3,
            this.skillPoint4,
        ];
        let pointX = 130;
        skillPoints.forEach((point) => {
            point.setScale(0.25);
            point.x = pointX;
            point.y = 250;
            pointX += 20;
        })

        this.hero.setScale(1);
        this.battleground.newBattle();
        this.hero.state = 1;
        this.gameObjects.push(this.hero);
    }

    async update() {
        this.hero.play();
        this._render.updateElement(this.hero.element);
        this.enemy.play();
        this._render.updateElement(this.enemy.element);
    }
}