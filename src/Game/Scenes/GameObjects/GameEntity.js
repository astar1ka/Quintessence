class GameEntity extends SceneObject{

    _HP = 0;
    _maxHP = 0;
    _active = true;

    constructor(sprite, data){
        super(sprite);
        this._maxHP = data.hp;
        this._setHP(this._maxHP);
    }

    _setHP(value){
        const prevHP = this._HP;
        this._HP = value;
        if (this._HP <= 0) {
            this._HP = 0;
            this._dead();
            this.onChangeHP(this._HP, this._maxHP, prevHP);
        }
    }

    getHP(){
        return this._HP;
    }

    damage(value){
        if (this._active)
            this._setHP(this._HP - value);
    }

    dead(){
        this._active = false;
    }

    onChangeHP(hp, maxHP, prevHP){
    }
}