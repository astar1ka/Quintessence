const powers = ['fire', 'water', 'earth', 'nature', 'wind'];

class BattleGround{

    nodes = {};
    lastPower = "";
    state = {
        active: false,
    }

    constructor(player, enemy, width, height = width){
        this.player = player;
        this.enemy = enemy;
        this.width = width;
        this.height = height;
        for(let i=0; i < (this.width * this.height); i++) this.nodes[i] = new NodeField(i, this._nearlyNodes(i));
        console.log(this.nodes);
        
    }

    _nearlyNodes(node){
        const x = node % this.width;
        const y = Math.trunc(node / this.width);
        const result = {};
        if (x-1 >= 0) result.left = this.width*y+x-1;
        if (x+1 < this.width) result.right = this.width*y+x+1;
        if (y-1 >= 0) result.top = x+this.width*(y-1);
        if (y+1 <this.height) result.bot = x+this.width*(y+1);
        return result;
    }

    getNode(id){
        return this.nodes[id];
    }

    randomPower(node){
        node.element.setPower(powers[Math.round(Math.abs(Math.random()*5-0.501))]);
    }

    newBattle(){
        this.state.active = true;
        Object.values(this.nodes).forEach(node => {
            node.element.setActive(true);
            this.randomPower(node);
        });
    }

    endTurn(){
        this.state.active = false;
        this.player.restore(this.lastPower);
        setTimeout( () => this.newTurn(), 1000);
    }

    newTurn(){
        this.state.active = true;
        this.player.restore(this.lastPower);
        Object.values(this.nodes).forEach(node => {
            node.element.setActive(true);
        });
    }

    fullCheck(id){
        const node = this.nodes[id];
        if (node && node.element.active) {
            const horizontal = [...this.check(node.paths.left, 'left', node.element.power,[]), ...this.check(node.paths.right, 'right', node.element.power,[])];
            const vertical = [...this.check(node.paths.top, 'top', node.element.power,[]), ...this.check(node.paths.bot, 'bot', node.element.power,[])];
            vertical.push(node);
            horizontal.push(node);
            if (horizontal.length >=3) {
                if (vertical.length >=3) {
                    horizontal.pop();
                    return [...horizontal, ...vertical];
                }
                return horizontal;
            }
            if (vertical.length >=3) return vertical;
        }
        return [];
    }

    check(id, direction, power, result){
        const node = this.nodes[id];
        if (node && node.element.power === power && node.element.active) {
            result.push(node);
            this.check(node.paths[direction], direction, power, result);
        }
        return result;
    }

    kill(node){
        this.lastPower = node.element.power;
        this.randomPower(node);
        node.element.setActive(false);
        return 1;
    }

    turn(node){
        const power = node.element.power;
        /*const family = this.fullCheck(node.id);
        
        family.forEach(node => point += this.kill(node));
        /*
        if (family.length >=3) {
            Object.keys(this.lastElement).forEach( element => {
                this.lastElement[element].element.props.sprite.name = "skill." + element + "_disabled";
            })
            this.lastElement[power].element.props.sprite.name = "skill." + power;
            return true;
        }
        return false*/
        let point = 0;
        this.fullCheck(node.id).forEach(node => point += this.kill(node));
        this.player.setEnergy(power, Math.trunc((point*point+point)/10));
        return true;
    }

    update(){
        Object.values(this.nodes).forEach(node => {
            if (node.paths.bot) {
                if (this.nodes[node.paths.bot].element.power === "") {
                    this.nodes[node.paths.bot].element.setPower(node.element.power);
                    node.element.setPower("");
                }
            }
        });
    }

    getNodeByXY(x,y){
        if ( x > 0 && y > 0){
            const id = Math.trunc(x/90)+Math.trunc(y/90)*this.width;
            return this.nodes[id]
        }
    }

    onmousemove(x,y){
        
    }

    onmousedown(){

    }

    onmouseup(){

    }

    onclick(x,y){
    }


}