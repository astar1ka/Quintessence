class ResourcesManager extends Manager{
    constructor(mediator){
        super(mediator);
        this.mediator.set("GET_IMAGE", (values) => this.getImage(...values));
        this.mediator.set("GET_SOUND", (values) => this.getSound(...values));
        this.mediator.set("LOAD_IMAGE", (values) => this.loadImage(...values));
        this.mediator.set("LOAD_SPRITE_MAP", (values) => this.loadSpriteMap(...values));
        this.mediator.set("LOAD_SOUND", (values) => this.loadSound(...values));
    }

    saveSource(name, source){
        this.mediator.call("SAVE_DATA", [name, source]);
    }

    getSource(name){
        this.mediator.call("GET_DATA", [name]);
    }


    createImage(path, dx, dy, width, height){
        return new Promise((resolve) => {
            const image = new Image(width, height);
            image.onload = () => resolve({
                    img: image,
                    dx,
                    dy,
                    width,
                    height
                });
            image.src = path;
        });
    }

    createAudio(path){
        return new Promise((resolve) => {
            const audio = new Audio;
            audio.onload = () => resolve(audio);
            audio.src = path;
        });
    }

    async loadImage(name, path, width, height, dx = 0, dy = 0){
        const images = this.getSource("images");
        images[name] = await this.createImage(path, dx, dy, width, height);
        this.saveSource("images", images);
        return (images[name]);
    }

    async loadSound(name, path, volume, loop){
        const sounds = this.getSource("images");
        const audio = await this.createAudio(path);
        sounds[name] = audio;
        audio.defaultMuted = true;
        audio.volume = volume;
        audio.loop = loop;
        this.saveSource("sounds", sounds);
        return (audio);
    }

    async loadSpriteMap(path, atlas){
        let  i = 0;
        await atlas.forEach( async image => {
            const {name, dx, dy, width, height} = image;
            const result = await this.loadImage(name, path, width, height, dx, dy)
            if (!result) return false;
        })
    return true;
    }

    getImage(name){
        return this.getSource("images")[name];
    }

    getSound(name){
        return this.getSource("sounds")[name];
    }
}