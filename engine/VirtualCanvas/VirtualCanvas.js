class VirtualCanvas{
    constructor(width, height){
        this.body = Engine.Elements.Body.create({width, height});
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