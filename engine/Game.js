[
    'engine/Logic/LogicObject/LogicObject.js',

    'engine/VirtualCanvas/createElement.js',

    'engine/Managers/EventManager/EventManager.js',
    'engine/Managers/ResourceManager/ResourceManager.js',
    'engine/Managers/RenderManager/RenderManager.js',
    'engine/Managers/RenderManager/RenderArea/RenderArea.js',
    'engine/Canvas/Canvas.js',
    'engine/Scene/Scene.js',
].forEach(script =>
    document.write(`<script src='${script}'></script>`));

class Game{

    constructor(config){
        const gameScreen = document.getElementById(config.canvas);
        this.timer = new Timer;
        
        this.managers = {};
        this.gameScreen = gameScreen;
        this.gameScreen.width = config.width;
        this.gameScreen.height = config.height;
        //this.SceneManager = new SceneManager(config.scenes, this.gameScreen);
        this.registrationManagers(gameScreen);
    }

    registrationManagers(gameScreen){
        this.managers.events = new EventManager(this);
        this.managers.resources = new ResourceManager();
        this.managers.render = new RenderManager(gameScreen,this.managers.resources);
            //data: new DataManager(),
            //logic: new LogicManager(),
            //area: new AreaManager(),
            //scenes: new SceneManager()
    }

    async run(){
        await this.scene.preload();
        this.scene.create();
        this.updateId = this.timer.add(() => this.update(), 0);
    }

    addScene(scene){
        this.scene = scene;
        this.scene.own(this);
    }

    close(){
        this.gameScreen.destroy();
    }

    update(){
        this.scene.update()
    }


}