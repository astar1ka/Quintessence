class Element{

    left;
    top;
    width;
    height;

    constructor(canvas, id, type, parent, props){
        const {width, height, left, top} = props;
        this.id = id;
        this.type = type;
        this._width = width;
        this._height = height;
        this._left = left;
        this._top = top;
        this.parent = parent;
        this.canvas = canvas;
        this.children = [];
        
        Object.defineProperty(this, 'width', {
            get: () => this._width,
            set: (value) => {
                this._width = value;
                this.updateY();
                this.canvas.render(this.id);
            }
        })

        Object.defineProperty(this, 'height', {
            get: () => this._height,
            set: (value) => {
                this._height = value;
                this.canvas.render(this.id);
            }
        });

        Object.defineProperty(this, 'left', {
            get: () => this._left,
            set: (value) => {
                this._left = value;
                this.updateX();
                this.canvas.render(this.id);
            }
        })

        Object.defineProperty(this, 'top', {
            get: () => this._top,
            set: (value) => {
                this._top = value;
                this.canvas.render(this.id);
            }
        })
    }

    updateX(){
        this.x = this.getParent().x + this.left;
        this.children.forEach(child => child.updateX());
    }

    updateY(){
        this.x = this.getParent().y + this.top;
        this.children.forEach(child => child.updateY());
    }

    getParent(){
        return this.canvas.getElement(this.parent);
    }
}