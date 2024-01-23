class ResourceManager{

    constructor(){
        
    }
    

    _resources = {};

    _saveResource(name,img, dx, dy, width, height){
        this._resources[name] = { img, dx, dy, width, height };
    }

    async load(name, src, width, height){
        return new Promise((resolve) => {
            const image = new Image(width, height);
            image.onload = () => {
                this._saveResource(name, image, 0, 0, image.naturalWidth, image.naturalHeight);
                resolve(true);
            };
            image.src = src;
        });
    }

    get(name){
        return this._resources[name] || {
            img: new Image(0,0),
            dx: 0,
            dy: 0,
            width: 0,
            height: 0
        };
    }

    async loadSpriteMap(src, atlas){
        return new Promise((resolve) => {
            const image = new Image();
            image.src = src;
            image.onload = () => {
                atlas.forEach(sprite => {
                    this._saveResource(
                        sprite.name, 
                        image, 
                        sprite.dx, 
                        sprite.dy, 
                        sprite.width, 
                        sprite.height);
                })
                resolve(true);
            }
        });
    }
}