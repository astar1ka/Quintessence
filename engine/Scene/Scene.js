class Scene{

    interactiveObjects = [];

    constructor(name, config){
        this._name = name;
        this._renderManager = {};
    }

    setInteractive(obj){
        this.interactiveObjects.push(obj);
        obj.body = {
            dx: 0,
            dy: 0,
            width: obj.element.props.width,
            height: obj.element.props.height
        }
    }


    own(game, scenes){
        this._resources = game.managers.resources;
        this._render = game.managers.render;
        this._scenes = scenes;
        this.background = this._render.createElement("sprite");
    }

    createSprite(logic, parent = this.background, width = 0, height = 0){
        const element = this._render.createElement("sprite", parent);
        logic.element = element;
        //logic.updateSprite();
        element.props.width = width;
        element.props.height = height;
    }

    createDiv(parent = this.background){
        return this._render.createElement("div", parent);
    }

    createButton(parent, name, props, onclick, sprite = ""){
        const element = this._render.createElement("sprite", parent);
        const button = this.createObject(name);
        button.element = element;
        element.props.left = props.left;
        element.props.top = props.top;
        element.props.width = props.width;
        element.props.height = props.height;
        element.props.sprite.name = sprite;
        this.setInteractive(button);
        button.onclick = onclick;
        button.onmousemove = () => {};
        button.onmousedown = () => {};
        button.onmouseup = () => {};
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