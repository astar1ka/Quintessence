const powers = ['fire', 'water', 'earth', 'nature', 'wind'];

class BattleGround{

    nodes = {};
    lastPower = "";
    isActive = false;
    selectedNode = null;
    select = null;
    turned = false;

    selectedNodes = [];

    constructor(scene, contents, columns, lines = columns){
        this.columns = columns;
        this.lines = lines;
        this.contents = contents;
        this.player = scene.player;
        scene.createSprite(this, scene.background.element, this.columns*90 + 50, this.lines*90+50);
        this.element.props.left = 0;
        this.element.props.top = 335;
        this.element.props.z = 10;
        this.element.props.sprite.name = "bg";
        scene.setInteractive(this);
        for(let i=0; i < (this.columns * this.lines); i++){
            const node = new NodeField(i, this._nearlyNodes(i));
            this.nodes[i] = node;
            const obj = new Element(node, this);
            obj.x = 30 + (i % this.columns) * 90;
            obj.y = 30 + Math.trunc(i / this.columns) * 90;
            scene.gameObjects.push(obj);
            scene.createSprite(obj, this.element, 80, 80);
            obj.element.props.left = obj.x;
            obj.element.props.top = obj.y;
        }
        this.render = () => scene._render.updateElement(this.element);
    }

    _nearlyNodes(node){
        const x = node % this.columns;
        const y = Math.trunc(node / this.columns);
        const result = {};
        if (x-1 >= 0) result.left = this.columns*y+x-1;
        if (x+1 < this.columns) result.right = this.columns*y+x+1;
        if (y-1 >= 0) result.top = x+this.columns*(y-1);
        if (y+1 < this.lines) result.bot = x+this.columns*(y+1);
        return result;
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

    getNode(id){
        return this.nodes[id];
    }

    randomPower(node){
        node.element.setPower(this.contents[Math.round(Math.abs(Math.random()*this.contents.length-0.501))]);
    }

    newBattle(){
        this.isActive = true;
        Object.values(this.nodes).forEach(node => {
            node.element.setActive(true);
            this.randomPower(node);
        });
    }

    endTurn(){
        this.isActive = false;
        setTimeout( () => this.newTurn(), 1000);
    }

    newTurn(){
        this.isActive = true;
    }

    kill(node){
        this.lastPower = node.element.power;
        this.randomPower(node);
        return 1;
    }

    turn(node){
        let point = 0;
        this.fullCheck(node.id).forEach(node => point += this.kill(node));
        this.render();
        return point;
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
            const id = Math.trunc(x/90)+Math.trunc(y/90)*this.columns;
            return this.nodes[id]
        }
    }

    selectNode(node){
        if (this.selectedNode == node){
            this.selectedNode = null;
            return false;
        }

        this.selectedNode = node;
        return true;
    }

    onmousemove(x,y){
        /*const node = this.getNodeByXY(x - this.element.props.left - 25,y - this.element.props.top - 25);
        if (node) {
            if ( !node.selected && this.selectedNodes[0] && this.selectedNodes[this.selectedNodes.length - 1].canMove(node.id)) {
                if (this.selectedNodes[0].element.power != node.element.power) {
                    if (this.selectedNodes.length === 1) {
                        node.selected = true;
                        this.selectedNodes.push(node);
                        node.element.setActive(true)
                    } else this.selectedNodes = [];
                    this.endSelect();
                } else {
                    node.selected = true;
                    this.selectedNodes.push(node);
                    node.element.setActive(true)
                    this.render()
                }
            };
        } else this.endSelect();*/

    }

    onmousedown(x,y){
        /*if (!this.selectedNodes[0]) {
            this.selectedNodes = [];
            const node = this.getNodeByXY(x - this.element.props.left - 25,y - this.element.props.top - 25);
            if (node) {
                Object.values(this.nodes).forEach( node => node.element.setActive(false));
                node.selected = true;
                node.element.setActive(true)
                this.selectedNodes.push(node);
                this.render()
            };
        } else this.endSelect();*/
    }

    onmouseup(){
        //this.endSelect();
    }

    endSelect(){
        if (this.selectedNodes.length > 2) {
            this.player.action(this.selectedNodes[0].element.power,this.selectedNodes.length);
            this.selectedNodes.forEach(node => this.kill(node));
        } else {
            if (this.selectedNodes.length === 2 && this.selectedNodes[0].element.power != this.selectedNodes[1].element.power) {
                const power = this.selectedNodes[0].element.power;
                this.selectedNodes[0].element.setPower(this.selectedNodes[1].element.power);
                this.selectedNodes[1].element.setPower(power);
            }
        }
        this.selectedNodes = [];
        this.select = null;
        Object.values(this.nodes).forEach( node => {
            node.element.setActive(true);
            node.selected = false
        });
        this.render();
    }

    onmouseout(){
        this.endSelect();
    }

    onclick(x,y){
            const node = this.getNodeByXY(x - this.element.props.left - 25,y - this.element.props.top - 25);
            if (node) {
                if (!this.select) {
                    this.select = node;
                    Object.values(this.nodes).forEach( node => node.element.setActive(false));
                    node.selected = true;
                    node.element.setActive(true)
                    this.render();
                    return;
                }
                if (node === this.select){
                    this.endSelect();
                    return;
                }
                this.player.setEnergy(this.player.energy.current - 1);
                if (this.player.acceptTurn()) {
                    const power = this.select.element.power;
                    this.select.element.setPower(node.element.power);
                    node.element.setPower(power);
                    setTimeout(() => this.turn(node), 300);
                    const temp = this.select;
                    setTimeout(() => this.fullCheck(temp), 300);
                } else this.player.cancelTurn();


            } 
            this.endSelect()
    }

    onmousein(){
        console.log();
    }

}