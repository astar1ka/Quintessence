class Scene{


    constructor(name, config){
        this._name = name;
        //this._canvas = new Canvas(1600,900, this._resources);
        this._renderManager = {};
    }

    own(game){
        this._resources = game.managers.resources;
        this._render = game.managers.render;
        this.background = this._render.createElement("sprite");
    }

    createSprite(logic, parent = this.background){
        logic.element = this._render.createElement("sprite", parent);
    }


    async _load(name, src, width, height){
        return await this._resources.load(name, src, width, height);
    }

    createObject(name){
        const image = this._resources.get(name);
        return new SceneObject(name, image.width, image.height);
    }

    getName(){
        return this._name;
    }

    isDirty(){
        return this._dirty;
    }

    setDirty(isDirty = !this._dirty){
        this._hash = isDirty;
    }

    render(){
        this._renderManager.render();
    }


}