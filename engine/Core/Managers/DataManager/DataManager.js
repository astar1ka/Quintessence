class DataManager extends Manager{

    data = {};

    constructor(mediator){
        super(mediator);

        this.mediator.set("GET_DATA", (values) => this.getData(...values));
        this.mediator.set("SET_DATA", (values) => this.setData(...values));
    }

    set(name, value){
        this.data[name] = value;
    }

    get(name){
        return this.data[name];
    }
}