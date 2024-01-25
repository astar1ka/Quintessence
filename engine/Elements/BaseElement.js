class BaseComponent{
    constructor(element, render){
        this.element = element;
        this.baseWidth = this.element.props.width;
        this.baseHeight = this.element.props.height;
        this.rennder = () => render(this.element);
    }

    render(){

    }

    setScale(x,y){
        this.element.props.width = this.baseWidth * x;
        this.element.props.width = this.baseHeight * y;
    }
}