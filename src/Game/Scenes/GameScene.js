class GameScene extends Scene {
    constructor(gameScreen, name, mediator) {
        super(name);
        this.game = gameScreen;
        this.mediator = mediator;
        this.canvas = document.createElement('canvas');
        this.canvas.width = 800;
        this.canvas.height = 450;
        this.hash = {};
        this.game.onclick = (event) => {
            const x = event.clientX * this.canvas.width / document.documentElement.clientWidth;
            const y = event.clientY * this.canvas.height / document.documentElement.clientHeight;
            this.gameObjects.forEach(obj => {
                if (obj.into(x,y)) {
                    obj.onclick();
                };
            });
        };
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

        this.background = new RenderArea(this._canvas,0,0,this.canvas.width,this.canvas.height);
        this.ui = new RenderArea(this._canvas,0,0,800,450);
        this.renderArea = new RenderArea(this._canvas,50,150,256,256);
        this.battleArea = new RenderArea(this._canvas,280,0,280,400);
        this.enemyArea = new RenderArea(this._canvas,470,150,256,256);
    }

    async create() {
        this.hero = new Hero('hero');
        this.enemy = new Goblin;
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

        this.energyMeter = this.createObject('energymeter');
        this.energyMeter.x = 10;
        this.energyMeter.y = 10;
        this.energyMeter.setScale(0.5);

        this.back.setScale(1.2);
        this.background.addRenderObject(this.back);

        this.ui.addRenderObject(this.hpBar);
        this.ui.addRenderObject(this.hpMeter);
        this.ui.addRenderObject(this.energyMeter);
        Object.keys(this.battleground.nodes).forEach(nodeId => {
            const obj = new Element(this.battleground.nodes[nodeId], this.battleground);
            obj.x = 325 + nodeId % 5 * 30;
            obj.y = 150 + Math.trunc(nodeId / 5)*30;
            obj.setScale(0.4);
            this.battleArea.addRenderObject(obj);
            this.gameObjects.push(obj);
        });
        this.background.addChild(this.renderArea);
        this.background.addChild(this.battleArea);
        this.background.addChild(this.enemyArea);
        this.background.addChild(this.ui);
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
            this.renderArea.addRenderObject(point);
            point.setScale(0.25);
            point.x = pointX;
            point.y = 250;
            pointX += 20;
        })

        this.hero.setScale(1);
        this.renderArea.addRenderObject(this.hero);
        this.enemyArea.addRenderObject(this.enemy);
        this.battleground.newBattle();
        this.background.render();
        this.hero.state = 1;
        this.gameObjects.push(this.hero);
        this.hero.onclick = () => {
            this.player.setEnergy(this.hero.power,this.hero.attack(this.enemy, this.player.energy[this.hero.power]));
            
        }
    }

    async update() {
        this.hero.play();
        this.enemy.play();
        this.hpMeter.sprite.width = 128 + 512 * this.hero.hp/15;
        this.energyMeter.sprite.width = 120 + 280 * this.player.energy.fire/20;
        this.battleground.update();
        this.renderArea._dirty = true;
        this.renderArea.render();
        this.battleArea._dirty = true;
        this.battleArea.render();
        this.enemyArea._dirty = true;
        this.enemyArea.render();
        this.ui._dirty = true;
        this.ui.render();
        this.hash = {};
    }
}