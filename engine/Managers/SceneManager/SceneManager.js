class SceneManager{

    scenes = {};
    activeScene = '';

    constructor(scenes = [], game){
        if (scenes[0]) {
            scenes.forEach(scene => {
                this.scenes[scene.getName()] = scene;
                scene.own(game);
            });
            this.play(scenes[0].getName());
        }
    }

    add(scene){
        this.scenes[scene.getName()] = scene;
    }

    async play(name){
        this.activeScene = name;
        /*await this.scenes[name].preload();
        this.scenes[name].create();*/
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