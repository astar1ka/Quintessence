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
        await this._load('back', "./src/assets/backgrounds/MainBackground.png");
        await this._load('back_1', "./src/assets/backgrounds/Background_1.png");
        await this._resources.loadSpriteMap("./src/assets/sprites/Hero.png", HeroSpriteAtlas);
        await this._resources.loadSpriteMap("./src/assets/sprites/Goblin.png", GoblinSpriteAtlas);
        await this._resources.loadSpriteMap("./src/assets/sprites/Elements.png", ElementsSpriteAtlas);
        this.background = new RenderArea(this._canvas,0,0,800,450);
        this.renderArea = new RenderArea(this._canvas,50,150,256,256);
        this.battleArea = new RenderArea(this._canvas,280,150,280,280);
        this.enemyArea = new RenderArea(this._canvas,550,150,256,256);
    }

    async create() {
        this.hero = new Hero('hero');
        this.enemy = new Goblin;
        this.player = new Player("1", this.hero, this.enemy);
        this.battleground = new BattleGround(this.player, this.enemy, 6,6);
        this.back = this.createObject('back');
        this.back.setScale(1.2);
        this.background.addRenderObject(this.back);
        Object.keys(this.battleground.nodes).forEach(nodeId => {
            const obj = new Element(this.battleground.nodes[nodeId], this.battleground);
            obj.x = 280 + nodeId % 6 * 40;
            obj.y = 150 + Math.trunc(nodeId / 6)*40;
            obj.setScale(0.4);
            this.battleArea.addRenderObject(obj);
            this.gameObjects.push(obj);
        });
        this.background.addChild(this.renderArea);
        this.background.addChild(this.battleArea);
        this.background.addChild(this.enemyArea);
        this._reverse = true;
        this.enemy.x = 500;
        this.enemy.y = 220;
        this.enemy.setScale(0.8);
        console.log(this.enemy);
        this.hero.x = 10;
        this.hero.y = 80;
        this.hero.z = 1;
        this.hero.setScale(0.6, 1.2);
        this.hero.body = {
            dx: 100,
            dy: 170,
            width: 150,
            height: 150
        }
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
        this.battleground.update();
        this.renderArea._dirty = true;
        this.renderArea.render();
        this.battleArea._dirty = true;
        this.battleArea.render();
        this.enemyArea._dirty = true;
        this.enemyArea.render();
        this.hash = {};
    }
}