const powers = ['fire', 'water', 'earth', 'nature', 'wind'];

class BattleGround{

    nodes = {};
    lastPower = "";

    constructor(player, enemy, width, height = width){
        this.player = player;
        this.enemy = enemy;
        this.width = width;
        this.height = height;
        this.width = width;
        this.height = height;
        for(let i=0; i < width*height; i++) this.nodes[i] = new NodeField(i, this._nearlyNodes(i));
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

    newBattle(){
        this.player.restore(this.lastPower);
        Object.values(this.nodes).forEach(node => node.element.setPower(powers[Math.round(Math.abs(Math.random()*5-0.501))]));
    }

    fullCheck(id){
        const node = this.nodes[id];
        if (node && node.element.power != "") {
            const horizontal = [...this.check(node.paths.left, 'left', node.element.power,[]), ...this.check(node.paths.right, 'right', node.element.power,[])];
            const vertical = [...this.check(node.paths.top, 'top', node.element.power,[]), ...this.check(node.paths.bot, 'bot', node.element.power,[])];
            vertical.push(node);
            horizontal.push(node);
            if (horizontal.length >= 3) horizontal.forEach(node => this.kill(node));
            if (vertical.length >= 3) vertical.forEach(node => this.kill(node));
        }
    }

    check(id, direction, power, result){
        const node = this.nodes[id];
        if (node && node.element.power === power && power != "") {
            result.push(node);
            this.check(node.paths[direction], direction, power, result);
        }
        return result;
    }

    kill(node){
        this.player.setEnergy(node.element.power, 1);
        this.lastPower = node.element.power;
        node.element.setPower('');
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

    swap(node1,node2){
        if (this.player.actions > 0 ){
            const power = node1.element.power;
            node1.element.setPower(node2.element.power)
            node2.element.setPower(power);
            this.player.actions --;
            this.fullCheck(node1.id);
            this.fullCheck(node2.id);
            if (this.player.actions === 0) {
                this.enemy.attack(this.player.hero);
                setTimeout(() => this.newBattle(), 1000);
            }
        }
    }


}