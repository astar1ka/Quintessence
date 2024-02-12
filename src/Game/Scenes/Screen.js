class Screen extends Scene{
    constructor(name) {
        super(name);
        this.gameObjects = [];
    }

    async preload(){
        await this._load('back', "./src/assets/backgrounds/MainBackground.png");
        await this._load('button', "./src/assets/sprites/screenButton.png");
        await this._load('button.hover', "./src/assets/sprites/screenButtonHover.png");
        await this._load('buttonR', "./src/assets/sprites/screenButtonRating.png");
        await this._load('buttonR.hover', "./src/assets/sprites/screenButtonRatingHover.png");
        this.mainTheme = new Audio("./src/assets/audio/mainTheme.mp3");
        this.mainTheme.defaultMuted = true;
        this.mainTheme.volume = 0;
        this.mainTheme.loop = true;
    }

    async create(){
        const button = new Button("button", 300, 200, async () => {
            await this._scenes.play("main");
            this.mainTheme.play();
            this.mainTheme.volume = 0.2;
            console.log(this._scenes)
            //document.body.requestFullscreen();
        })
        this.createSprite(button, this.background,400,100);
        button.element.props.left = 760;
        button.element.props.top = 490;
        button.element.props.sprite.name = "button";

        const buttonR = new Button("button", 300, 200, () => {
        })
        this.createSprite(buttonR, this.background,400,100);
        buttonR.element.props.left = 760;
        buttonR.element.props.top = 640;
        buttonR.element.props.sprite.name = "buttonR";
        this.setInteractive(buttonR);
        buttonR.onmousemove = () => {
            buttonR.element.props.sprite.name = "buttonR.hover";
            this._render.updateElement(buttonR.element);
        }


        this.background.props.sprite.name = "back";
        this.background.props.width = 1920;
        this.background.props.height = 1080;
        this.setInteractive(button);
        button.onmousemove = () => {
            button.element.props.sprite.name = "button.hover";
            this._render.updateElement(button.element);
        }
        const obj = this.createObject("hover");
        obj.element = this.background;
        this.setInteractive(obj);
        obj.onmousemove = () => {
            button.element.props.sprite.name = "button";
            buttonR.element.props.sprite.name = "buttonR";
            this._render.updateElement(button.element);
            this._render.updateElement(buttonR.element);
        }
        this._render.updateElement(this.background);
        
    }

    update(){

    }


}