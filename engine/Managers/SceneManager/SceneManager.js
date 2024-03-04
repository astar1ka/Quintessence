class SceneManager{

    scenes = {};
    activeScene = '';

    constructor(scenes = [], game){
        if (scenes[0]) {
            scenes.forEach(scene => {
                this.scenes[scene.getName()] = scene;
                scene.own(game, this);
            });
            this.play(scenes[0].getName());
        }
    }

    add(scene){
        this.scenes[scene.getName()] = scene;
    }

    async play(name){
        await this.scenes[name].preload();
        await this.scenes[name].create();
        this.activeScene = name;
    }

    close(scene){
        delete this.scenes[scene.getName()];
    }

    render(){
        
    }

    destroy(){
        this.scenes = {};
        this.gameScreen = null;
    }

    getActiveScene(){
        return this.scenes[this.activeScene];
    }
}