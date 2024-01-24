function createElement(type, parent = null) {
    const element = {
        type: type,
        props: {
            childrens: [],
            parent: null,
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            z: 0
        },
        dirty: true
    }
    switch (type){
        case 'sprite': {
            element.props.image = '';
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
    if(parent) element.parent.props.childrens.push(element);
    return element;
}