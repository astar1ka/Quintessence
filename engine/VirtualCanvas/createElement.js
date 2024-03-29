function createElement(type, parent = null) {
    const element = {
        type: type,
        props: {
            childrens: [],
            parent: parent,
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            z: 0
        }
    }
    switch (type){
        case 'sprite': {
            element.props.sprite = {
                name: ''
            };
            break;
        }
        case 'text': {
            element.props.font = "Tahoma 12px";
            element.props.text = "";
            break;
        }
        case 'div': {
            element.props.color = 'black',
            element.props.stroke = {
                color: 'black',
                width: 1
            }
            break;
        }
    }
    if(parent) element.props.parent.props.childrens.push(element);
    return element;
}