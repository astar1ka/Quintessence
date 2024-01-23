const scripts = [
    'engine/Logic/LogicObject/LogicObject.js',

    'engine/Managers/ResourceManager/EventManager.js',
    'engine/Managers/ResourceManager/ResourceManager.js',
    'engine/Managers/RenderManager/RenderArea/RenderArea.js',
    'engine/Canvas/Canvas.js',
    'engine/Scene/Scene.js',
];

scripts.forEach(script =>
    document.write(`<script src='${script}'></script>`));

class Game{

    constructor(config){
        this.managers = {
            events: new EventManager(this),
            resources: new ResourceManager(),
            render: new RenderManager(),
            data: new DataManager(),
            logic: new LogicManager(),
            area: new AreaManager()
        }
        this.gameScreen = document.getElementById(config.canvas);
        this.gameScreen.width = config.width;
        this.gameScreen.height = config.height;
        this.SceneManager = new SceneManager(config.scenes, this.gameScreen);
        this.run();
    }

    run(){
        this.SceneManager.render();
    }

    addScene(scene){
        this.SceneManager.add(scene);
    }

    close(){
        this.gameScreen.destroy();
    }


}