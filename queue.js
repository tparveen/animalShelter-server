//must use 'use strict' 
//and module.exports = Queue; to export this
'use strict';

function createNode(data=null, next=null, prev=null) {
    return {
        data,
        next,
        prev
    };
}
class Queue {
    constructor() {
        this.first = null;
        this.last = null;
    }

    enqueue(data) {
        const node = createNode(data);
        if (this.last) {
            node.next = this.last;
            this.last.prev = node;

        }
        
        this.last = node;

        if (this.first === null) {
            this.first = node;
        }
    }
    dequeue() {
        if (this.first === null) {
            return;
        }
        const node = this.first;
        this.first = node.prev;

        if (node === this.last) {
            this.last = null;
        }

        return node.data;
    }
}
module.exports = Queue;

/*
function display() {
    //let q = new Queue();
    let node = q.first;
    while (node !== null) {
        console.log(node.data);
        node = node.prev;
    }
}

let q = new Queue();
q.enqueue("Tauhida");
q.enqueue("Joe");
//q.enqueue("Tim");
//display();

//console.log(q.dequeue());
//display();
//q.enqueue("Alison");
//q.enqueue("Chris");
//console.log(q.dequeue());
//display();
*/