class NewGame extends Scene{
    constructor(name) {
        super(name);
        this.gameObjects = [];
        this.interactiveObjects = [];
    }

    async preload(){
        await this._load('back', "./src/assets/backgrounds/bg1.png");
        await this._load('bg2', "./src/assets/backgrounds/bg2.png");
        await this._resources.loadSpriteMap("./src/assets/sprites/ground_hero.png", GroundSpriteAtlas);
        this._load("back")

    }

    async create(){
        this.background.props.width = 1920;
        this.background.props.height = 1080;
        this.background.props.sprite.name = "back";
        const hero = new Hero2("ground_hero");
        this.createSprite(hero, this.background, 700, 350);
        hero.element.props.left = 100;
        hero.element.props.top = 100;
        hero.element.props.sprite.name = "ground_hero.idle_1";
        console.log(hero);
        this._render.updateElement(hero.element);
        this.hero = hero;
        const pole = this.createObject("pole");
        pole.element = this.background;
        this.setInteractive(pole);
        const pointer = {x:0, y:0};
        const bg2 = this.createObject("bg2");
        this.createSprite(bg2,this.background,1920,1080);
        bg2.element.props.sprite.name = "bg2"
        bg2.element.props.hide = true;
        pole.onclick = () => {
            hero.goto(pointer.x, pointer.y);
        }
        pole.onmousemove = (x,y) => {
            pointer.x = x - 350;
            pointer.y = y - 330;
        }
        pole.onmousedown = () => {
            bg2.element.props.hide = false;
            
        }
        pole.onmouseup = () => {
            bg2.element.props.hide = true;
        }
    }

    update(){
        this.hero.play();
        this.hero.walk();
        this._render.updateElement(this.background);
    }


}