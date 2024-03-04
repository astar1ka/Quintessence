class Elements{
    Body = {create: (props) => this._create("body",props)}

    constructor(){

    }

    _create(type, props){
        if (props instanceof Object) return this._acceptProps(this._createElement(type), props)
        return null;
    }

    _acceptProps(element, props){
        Object.keys(props).forEach(key => {
            if (element.props[key]) element[key] = props[key];
            if (props[0]){

            }
        })
    }

    _observe(props){

    }

    _createElement(type){
        const props = {
                width: 0,
                height: 0,
                top: 0,
                left: 0,
                z: 0,
                parent: null,
                childs: [],
                img: '',
                color: '',
            }
        return {
            type,
            get: (name) => props[name],
            set: (name, value) => this._setProp(props, name, value),
        }
    }

    useEffect(){

    }

}