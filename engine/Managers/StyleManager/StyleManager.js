class StyleManager{

    __styles = {
        
    }

    __setters = {

    }

    constructor(def){
        this.default = def;
    }

    __copyStyle(name, style){
        this.__styles[name] = {
            left: style.left || this.default.left,
            top: style.left || this.default.left,
            width: style.width || this.default.width,
            height: style.width || this.default.width,
        }
    }

    addPattern(name, pattern){

    }

    addStyle(name, patternName, style){
        this.__copyStyle(name, style);
        this.__setters[name] = [];
    }

    getStyle(name, onset){
        if (onset instanceof Function) {

        }
        onset(this.__styles[name]);
        this.__setters[name] = () => onset(this.__styles[name]);
    }

    setStyle(name, style){
        this.__copyStyle(name, style);
        this.__setters[name].forEach( func => func());
    }
}