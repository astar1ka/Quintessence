class GameScene extends Scene {
    constructor(name) {
        super(name);
        this.gameObjects = [];
    }



    async preload() {
        await this._load('bg', "./src/assets/sprites/Battleground.png");
        await this._load('menu', "./src/assets/sprites/Menu.png");
        await this._load('swords', "./src/assets/sprites/Swords.png");
        await this._load('back_1', "./src/assets/backgrounds/Background_1.png");
        //await this._resources.loadSpriteMap("./src/assets/sprites/Hero_fire.png", HeroSpriteAtlas);
        //await this._resources.loadSpriteMap("./src/assets/sprites/Hero_water.png", HeroSpriteAtlas);
        await this._resources.loadSpriteMap("./src/assets/sprites/fire_hero.png", HeroSpriteAtlas);
        await this._resources.loadSpriteMap("./src/assets/sprites/Goblin.png", GoblinSpriteAtlas);
        await this._resources.loadSpriteMap("./src/assets/sprites/Elements.png", ElementsSpriteAtlas);
        await this._resources.loadSpriteMap("./src/assets/sprites/Actions.png", ActionsSpriteAtlas);
        await this._resources.loadSpriteMap("./src/assets/sprites/SkillMeter.png", ElementsSkillAtlas);


    }

    async create() {
        this.hero = new Hero('hero');
        this.createSprite(this.hero, this.background, 288*4, 128*4);
        this.hero.element.props.top = 135;
        this.hero.element.props.left = 380;
        this.hero.element.props.z = 0;
        this.background.props.width = 1920;
        this.background.props.height = 1080;
        this.background.props.sprite.name = "back";

        this.enemy = new Goblin;
        this.createSprite(this.enemy, this.background, 600, 600);
        this.enemy.element.props.top = 230;
        this.enemy.element.props.left = 760;

        this.player = new Player("1", this.hero, this.enemy);
        this.battleground = new BattleGround(this, ['fire', 'water', 'earth', 'nature', 'wind'], 4, 4);
        this.battleground.element.props.left = 1480;
        this.battleground.newBattle();

        this.actionsField = new BattleGround(this, ['left', 'right', 'shield'], 4, 4);
        this.actionsField.element.props.left = 30;
        this.actionsField.newBattle();

        const energyPoints = []
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 8; j++) {
                const point = this.createObject('skill.fire');
                energyPoints.push(point);
                this.createSprite(point, this.hero.element, 32, 32);
                point.element.props.left = 350 + j * 39;
                point.element.props.top = 180 + i * 39;
                point.element.props.sprite.name = point.sprite.name;
                this._render.updateElement(point.element);
                this.gameObjects.push(point);
                point.element.props.hide = true;
            }

        this.player.energyPoints = energyPoints;

        const endTurnCallback = () => {
            this.battleground.newTurn();
            this._render.updateElement(this.battleground.element);
            this.enemy.attack(this.hero);
            this.player.turn = 1 + this.player.energy.fire;
            this.player.energy.fire = 0;
            setTimeout(() => this.player.status(), 500);
        }

        this.endTurnButton = new Button("swords", 200, 200, endTurnCallback);

        const elementsPoint = this.createObject("elements");
        this.createSprite(elementsPoint, this.background.element, 200, 200);
        elementsPoint.element.props.left = 860;
        elementsPoint.element.props.top = 850;
        elementsPoint.element.props.z = 10000;
        elementsPoint.element.props.sprite.name = "menu";
        this._render.updateElement(elementsPoint.element);
        this.gameObjects.push(elementsPoint);


        this.createSprite(this.endTurnButton, elementsPoint.element, 100, 100);
        this.endTurnButton.element.props.left = 55;
        this.endTurnButton.element.props.top = 50;
        this.endTurnButton.element.props.z = 1000;
        this.endTurnButton.element.props.sprite.name = this.endTurnButton.sprite.name;
        this._render.updateElement(this.endTurnButton.element);
        this.gameObjects.push(this.endTurnButton);

        this.setInteractive(this.endTurnButton);

        const hpBar = this.createDiv(this.background.element);
        hpBar.props.left = 350;
        hpBar.props.top = 50;
        hpBar.props.width = 508;
        hpBar.props.height = 38;
        hpBar.props.color = "rgba(0,0,0,0.7)";
        hpBar.props.z = 100;

        const hp = this.createDiv(this.background.element);
        hp.props.left = 354;
        hp.props.top = 54;
        hp.props.width = 500;
        hp.props.height = 30;
        hp.props.color = "rgba(0,120,0,0.7)";
        hp.props.z = 100;
        this.player.hpBar = hp;

        const enemyHpBar = this.createDiv(this.background.element);
        enemyHpBar.props.left = 1062;;
        enemyHpBar.props.top = 50;
        enemyHpBar.props.width = 508;
        enemyHpBar.props.height = 38;
        enemyHpBar.props.color = "rgba(0,0,0,0.7)";
        enemyHpBar.props.z = 100;

        const enemyHp = this.createDiv(this.background.element);
        enemyHp.props.left = 1066;
        enemyHp.props.top = 54;
        enemyHp.props.width = 500;
        enemyHp.props.height = 30;
        enemyHp.props.color = "rgba(0,120,0,0.7)";
        enemyHp.props.z = 100;
        this.player.enemyHpBar = enemyHp;

        this.battleground.lastElement = {}

        const fireEnd = this.createObject("fireEnd");
        this.createSprite(fireEnd, elementsPoint.element, 32, 32);
        fireEnd.element.props.left = 12;
        fireEnd.element.props.top = 60;
        fireEnd.element.props.z = 1000;
        fireEnd.element.props.sprite.name = "skill.fire_disabled";

        const waterEnd = this.createObject("waterEnd");
        this.createSprite(waterEnd, elementsPoint.element, 32, 32);
        waterEnd.element.props.left = 145;
        waterEnd.element.props.top = 145;
        waterEnd.element.props.z = 1000;
        waterEnd.element.props.sprite.name = "skill.water_disabled";

        const natureEnd = this.createObject("natureEnd");
        this.createSprite(natureEnd, elementsPoint.element, 32, 32);
        natureEnd.element.props.left = 83;
        natureEnd.element.props.top = 8;
        natureEnd.element.props.z = 1000;
        natureEnd.element.props.sprite.name = "skill.nature_disabled";

        const windEnd = this.createObject("windEnd");
        this.createSprite(windEnd, elementsPoint.element, 32, 32);
        windEnd.element.props.left = 30;
        windEnd.element.props.top = 145;
        windEnd.element.props.z = 1000;
        windEnd.element.props.sprite.name = "skill.wind_disabled";

        const earthEnd = this.createObject("earthEnd");
        this.createSprite(earthEnd, elementsPoint.element, 32, 32);
        earthEnd.element.props.left = 165;
        earthEnd.element.props.top = 60;
        earthEnd.element.props.z = 1000;
        earthEnd.element.props.sprite.name = "skill.earth_disabled";

        this.battleground.lastElement.fire = fireEnd;
        this.battleground.lastElement.water = waterEnd;
        this.battleground.lastElement.nature = natureEnd;
        this.battleground.lastElement.wind = windEnd;
        this.battleground.lastElement.earth = earthEnd;

        this._render.updateElement(elementsPoint.element);

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