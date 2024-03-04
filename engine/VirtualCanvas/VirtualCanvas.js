class VirtualCanvas{
    map = {};
    elements = {};
    elementsCache = {};
    lastId = 0;
    constructor(width, height){
        this.body = Engine.Elements.Body.create({width, height});
        this.width = Math.trunc((width+32) / 64);
        this.height = Math.trunc((height+32) / 64);
        for(let i = 1; i <= this.width; i++) {
            this.map[i] = {};
            for(let j = 1; j <= this.height; j++) this.map[i][j] = {};
        }
    
    }

    _calc(coor){
        return Math.trunc(coor / 64);
    }

    _getChunk(x,y){
        const X = this._calc(x);
        const Y = this._calc(y);
        if (this.map[X]) return this.map[X][Y] || null;
        return null;
    }

    createElement(type,props){
        this.lastId++;
        this.elements[this.lastId] =
        return this.elements[this.lastId];
    }

    render(elementId){
        const element = this.elements[elementId];

    }

    getElements(left, top, width, height, element = this.body){
        const result = [element];
        element.props.childrens.forEach(children => {
            if ((children.props.left >= left && children.props.left <= left + width) && (children.props.top >= top && children.props.top <= top + height)) 
            result.push(this.render(0,0,width - children.props.left, height - children.props.height, children));
        })
        return result;
    }
}