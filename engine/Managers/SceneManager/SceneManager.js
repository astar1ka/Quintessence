class SceneManager{

    scenes = {};

    constructor(scenes, gameScreen){
        scenes.forEach( scene => this.add(scene));
        this.gameScreen = gameScreen;
        this.gameScreen.onclick = (event) => console.log(event);
    }

    add(scene){
        this.scenes[scene.getName()] = {
            scene: scene,
            hash: {}
        };
    }

    close(scene){
        delete this.scenes[scene.getName()];
    }

    render(){
        Object.keys(this.scenes).forEach(key => {
            const {scene, hash} = this.scenes[key];
            if (scene.checkHash(hash)){
                this.gameScreen.getContext("2d").fillStyle = "white";
                this.gameScreen.getContext("2d").fillRect(0,0,this.gameScreen.width, this.gameScreen.height);
                this.gameScreen.getContext("2d").drawImage(scene.getCanvas(), 0, 0);
                this.scenes[key].hash = scene.getHash();
            }
        });
        requestAnimationFrame(()=> this.render());
    }

    destroy(){
        this.scenes = {};
        this.gameScreen = null;
    }
}