class Elements{
    static create(type, parent){
        return {
            type: type,
            props: {
                childrens: [],
                parent: parent,
                width: 0,
                height: 0,
                top: 0,
                left: 0,
                z: 0,
                source: ""
            }
        }
    }
}