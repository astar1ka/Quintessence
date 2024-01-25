class Scene{

    interactiveObjects = [];

    constructor(name, config){
        this._name = name;
        this._renderManager = {};
    }

    setInteractive(obj){
        this.interactiveObjects.push(obj);
    }


    own(game){
        console.log(game);
        this._resources = game.managers.resources;
        this._render = game.managers.render;
        this.background = this._render.createElement("sprite");
    }

    createSprite(logic, parent = this.background, width = 0, height = 0){
        const element = this._render.createElement("sprite", parent);
        logic.element = element;
        logic.updateSprite();
        element.props.width = width;
        element.props.height = height;
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