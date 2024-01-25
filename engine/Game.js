[
    'engine/Logic/LogicObject/LogicObject.js',

    'engine/VirtualCanvas/createElement.js',

    'engine/Managers/EventManager/EventManager.js',
    'engine/Managers/ResourceManager/ResourceManager.js',
    'engine/Managers/RenderManager/RenderManager.js',
    'engine/Managers/SceneManager/SceneManager.js',
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
        this.registrationManagers(gameScreen,config);
    }

    registrationManagers(gameScreen, config){
        this.managers.resources = new ResourceManager();
        this.managers.render = new RenderManager(gameScreen,this.managers.resources);
            //data: new DataManager(),
            //logic: new LogicManager(),
            //area: new AreaManager(),
        this.managers.scenes =  new SceneManager(config.scenes,this);
        this.managers.events = new EventManager(gameScreen, this.managers.scenes);
    }

    async run(){
        await this.managers.scenes.getActiveScene().preload();
        this.managers.scenes.getActiveScene().create();
        this.updateId = this.timer.add(() => this.update(), 0, 30);
        /*this.managers.events.subscribe('click', (event) => this.managers.scenes.getActiveScene().mouseEvent("click", event.clientX, event.clientY));
        this.managers.events.subscribe('mouseup', (event) => this.managers.scenes.getActiveScene().mouseEvent("mouseup", event.clientX, event.clientY));
        this.managers.events.subscribe('mousedown', (event) => this.managers.scenes.getActiveScene().mouseEvent("mousedown", event.clientX, event.clientY));
        this.managers.events.subscribe('mousemove', (event) => this.managers.scenes.getActiveScene().mouseEvent("mousemove", event.clientX, event.clientY));*/
    }

    addScene(scene){
        this.scene = scene;
        this.scene.own(this);
    }

    close(){
        this.gameScreen.destroy();
    }

    update(){
        this.managers.scenes.getActiveScene().update();
    }


}