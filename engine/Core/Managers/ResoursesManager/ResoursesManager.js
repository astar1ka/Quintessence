class ResourcesManager extends Manager {
    constructor(mediator) {
        super(mediator);
        this.mediator.set("GET_IMAGE", (values) => this.getImage(...values));
        this.mediator.set("GET_SOUND", (values) => this.getSound(...values));
        this.mediator.set("LOAD_IMAGE", (values) => this.loadImage(...values));
        this.mediator.set("LOAD_SPRITE_MAP", (values) => this.loadSpriteMap(...values));
        this.mediator.set("LOAD_SOUND", (values) => this.loadSound(...values));
    }

    saveSource(name, source) {
        this.mediator.call("SAVE_DATA", [name, source]);
    }

    getSource(name) {
        this.mediator.call("GET_DATA", [name]);
    }


    createImage(path) {
        return new Promise((resolve) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.src = path;
        });
    }

    createAudio(path) {
        return new Promise((resolve) => {
            const audio = new Audio;
            audio.onload = () => resolve(audio);
            audio.src = path;
        });
    }

    toImageData(img, dx, dy, width, height) {
        return { img, dx, dy, height, width }
    }

    async loadImage(name, path, width, height) {
        const images = this.getSource("images");
        const image = await this.createImage(path);
        if (image) {
            images[name] = this.toImageData(image, 0, 0, width, height);
            this.saveSource("images", images);
        }
    }

    async loadSound(name, path, volume, loop) {
        const sounds = this.getSource("images");
        const audio = await this.createAudio(path);
        sounds[name] = audio;
        audio.defaultMuted = true;
        audio.volume = volume;
        audio.loop = loop;
        this.saveSource("sounds", sounds);
        return (audio);
    }

    async loadSpriteMap(path, atlas) {
        const images = this.getSource("images");
        const image = await this.createImage(path);
        if (image) {
            await atlas.forEach(async sprite => 
                images[name] = this.toImageData(image, sprite.dx, sprite.dy, sprite.width, sprite.height));
            this.saveSource("images", images);
        }

        return true;
    }

    getImage(name) {
        return this.getSource("images")[name];
    }

    getSound(name) {
        return this.getSource("sounds")[name];
    }
}