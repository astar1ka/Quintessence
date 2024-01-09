const powers = [
    'fire', 
    'water', 
    'earth', 
    'nature', 
    'wind'
];

class BattleGround{

    nodes = [];
    active = true;

    constructor(width, height = width){
        this.width = width;
        this.height = height;
        for(i=0; i < width; i++) this.nodes.push([]);
        this.new();
    }

    getNode(x,y){
        return this.nodes[x][y];
    }

    new(){
        this.nodes.forEach(row => {
            for(i=0;i<this.height; i++) row.push( 
                {
                    power: powers[Math.round(Math.abs(Math.random()*5-0.501))]
                }
            )
        })
    }

    move(x1, y1, x2, y2){
        if (Math.abs(x1+y1-x2-y2) == 1){
            const node1 = this.getNode(x1,y1);
            const node2 = this.getNode(x2,y2);
            const power = node1.power;
            node1.power = node2.power;
            node2.power = power;
            this.render(x1,y1);
            this.render(x2,y2);
        }
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