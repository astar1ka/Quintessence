class RenderManager{

    constructor(gameScreen,resourcesManager){
        this.gameScreen = gameScreen;
        this.resources = resourcesManager;
        this.root = createElement('sprite');
        this.canvas = new Canvas;
        this.camera = {
            left: 0,
            top: 0,
            width: this.gameScreen.width,
            height: this.gameScreen.height
        }
    }

    createElement(type, parent = this.root){
        return createElement(type, parent);
    }

    getCross(area1,area2){
        if (
                (area1.right >= area2.left && area1.left <= area2.right) &&
                (area1.bottom >= area2.top && area1.top <= area2.bottom)
        ){
            return {
                left: (area1.left > area2.left) ? area1.left: area2.left,
                top: (area1.top > area2.top) ? area1.top: area2.top,
                bottom: (area1.bottom < area2.bottom) ? area1.bottom: area2.bottom,
                right: (area1.right < area2.right) ? area1.right : area2.right,
            }
        }
        return null;
    }

    toArea(data, x0 = 0, y0 = 0){
        return {
            left: data.left + x0,
            right: data.left + data.width + x0,
            top: data.top + y0,
            bottom: data.top + data.height + y0
        }
    }

    renderElements(area, element = this.root, x0 = 0, y0 = 0){
        const x = x0 + element.props.left;
        const y = y0 + element.props.top;
        this.canvas.render(
            element.type,
            {
                data: (element.type === "sprite") ? 
                this.resources.get(element.props.sprite.name) :
                (element.type === "div") ? {
                    color: element.props.color,
                    stroke: element.props.stroke
                } : null,
                original: {
                    width: element.props.width,
                    height: element.props.height    
                },
                reverse: element.props.reverse
            },
            area.left, 
            area.top, 
            area.right - area.left, 
            area.bottom - area.top, 
            (area.left > x) ? area.left - x : 0, 
            (area.top > y) ? area.top - y : 0);
        element.props.childrens.sort((a,b) => a.props.z - b.props.z).forEach(children => {
            const crossArea = this.getCross(area, this.toArea(children.props,x,y));
            if (crossArea && !children.props.hide){
                this.renderElements(crossArea,children, x, y)
            }
        })
    }

    render(){
        const ctx = this.gameScreen.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.drawImage(this.canvas._canvas,this.camera.left, this.camera.top, this.camera.width, this.camera.height, 0, 0, this.camera.width, this.camera.height);
    }

    async updateElement(element){
        const XY = this.getElementXY(element);
        const area = {
            left: XY.x,
            right: XY.x + element.props.width,
            top: XY.y,
            bottom: XY.y + element.props.height
        }
        this.renderElements(area);
        const cross = this.getCross(area, this.toArea(this.camera));
        if (cross) {
            this.render();
        }
    }

    getElementXY(element){
        const result = {
            x: element.props.left,
            y: element.props.top
        }
        if (element.props.parent) {
            const parent = this.getElementXY(element.props.parent);
            result.x += parent.x;
            result.y += parent.y;
        }
        return result
    }

}