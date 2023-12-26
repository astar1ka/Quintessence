class Timer{
    constructor(){
        this.id = 1;
        this.events = {};
        this._update();
        this.head = null;
    }

    _update(){
        const time = Date.now();
        while (this.head && this.head.runtime <= time) {
            const head = this.head;
            this.head = this.head.next;
            this._run(head);
            }
        setTimeout(() => this._update(),30);
    }

    _run(head) {
        if (this.events[head.id]) {
            if (this.events[head.id].status == 2){
                this.events[head.id].do();
                if (head.interval !=0) {
                    head.runtime += head.interval;
                    this._include(head);
                } else this.delete(head.id);
            } else this.events[head.id].status = 0;
        }
    }

    _include(event){
        let head = this.head;
        if (head) {
            while(head.next && head.next.runtime < event.runtime) head = head.next;
        }
        this._paste(event,head);
        return event.id;
    }

    add(event, delay, interval = 0){
        if (event instanceof Function){
            while (this.events[this.id] && this.events[this.id]?.status != 0) this.id++;
            const id = this.id;
            this.events[id] = {
                status: 2,
                do: () => event()
            };
            const newEvent = {
                id: id,
                interval: interval,
                runtime: Date.now() + delay,
                next: null
            };
            this.id = 1;
            return this._include(newEvent);
        }
    }

    _paste(newEvent, head){
        if (head){
            const next = head.next;
            head.next = newEvent;
            newEvent.next = next;
        }
        else {
            newEvent.next = this.head;
            this.head = newEvent;
        }
    }

    delete(id){
        if (this.events[id] && this.events[id].status === 2) this.events[id].status = 1;
    }
}