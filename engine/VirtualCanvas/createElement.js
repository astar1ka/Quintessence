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
            element.props.font = {
                size: 0,
                family: '',
                color: 'black',
            };
            break;
        }
    }
    if(parent) element.props.parent.props.childrens.push(element);
    return element;
}