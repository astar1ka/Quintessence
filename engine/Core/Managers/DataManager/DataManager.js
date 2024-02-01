class DataManager extends Manager{

    data = {};

    constructor(mediator){
        super(mediator);
        this.localStorage = window.localStorage;
        this.load();
        this.mediator.set("GET_DATA", (values) => this.getData(...values));
        this.mediator.set("SET_DATA", (values) => this.setData(...values));

    }

    set(name, value, saved = false){
        this.data[name] = value
        if (saved) this.save(name);
    }

    get(name){
        return this.data[name] || null;
    }

    save(name){
        const data = this.localStorage.getItem("data") || {};
        data[name] = this.data[name];
        this.localStorage.setItem("data", data);
    }

    load(){
        const data = this.localStorage.getItem("data");
        if (data) Object.keys(data).forEach(key = this.data[key] = data[key]);
    }
}