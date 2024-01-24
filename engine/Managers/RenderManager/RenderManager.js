class RenderManager{

    constructor(gameScreen){
        this.gameScreen = gameScreen;
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

    checkInside(x,y,area){
        return ((x >= area.left && x <= area.left + area.width) && (y >= area.top && y <= area.top + area.height))
    }

    elementToPicture(element,dx = 0, dy = 0){
        switch(element.type){
            case 'sprite':         
                return {
                    x: dx + element.props.left,
                    y: dy + element.props.top,
                    z: element.props.z,
                    image: this.resources.getImage(element.props.sprite)
                }
            case 'text': 
                return {
                    x: dx + element.props.left,
                    y: dy + element.props.top,
                    z: element.props.z,
                    image: this.resources.getImage(element.props.sprite)
                }
        }
    }


    getElements(area, element = this.body, x = 0, y = 0){
        const picture = this.elementToPicture(element,x,y);
        const result = [picture];
        element.props.childrens.forEach(children => {
            if (this.checkInside(children.props.left, children.props.top, area))
                result.push(this.getElements(
                    {
                        left: 0,
                        top: 0,
                        width: area.width - children.left,
                        height: area.height - children.top,
                    },
                    children,
                    picture.x,
                    picture.y
            ));
        })
        return result;
    }

    render(area){
        const elements = this.getElements(area).sort(a.props.z - b.props.z);
        elements.forEach(elem => {
            this.canvas.draw(elem)
        });
        if (this.checkInside(area.left, area.top, this.camera)) 
            this.gameScreen.getContext("2d").draw(
                this.canvas._canvas, 
                area.left, 
                area.top, 
                this.camera.width, 
                this.camera.height,
                area.left - this.camera.left,
                area.top - this.camera.top,
                area.width,
                area.height
                );
    }

    update(){
        gameScreen.getContext("2d").drawImage(gameScene._canvas._canvas, x, y, width, height, );
    }

    updateElement(element){
        const elements = this.virtualCanvas.getElements(element.left, element.top, element.width, element.height);
        this.render(XY.x, XY.y, element.width,element.height);
    }

    getElementXY(element){
        const result = {
            x: element.left,
            y: element.top
        }
        if (element.props.parent) {
            const parent = this.getElementXY(element.props.parent);
            result += parent.x;
            result += parent.y;
        }
        return result
    }

}