/* Possibly Import Class Using ES6 Style Import Statements? */

class Grid {
    static SELECT_LIMIT = 3;

    constructor(gridItems) {
        this.gridItems = gridItems;
    }

    /* Methods */
    getItem(index) {
        return this.gridItems[index];
    }

    gridLength() {
        return this.gridItems.length;
    }

    activeCount() {
        let count = 0;
        for(const item of this.gridItems) if(item.isActive()) ++count;
        return count;
    }

    activeItems() {
        let items = [];
        for(const item of this.gridItems) if(item.isActive()) items.push(item);
        return items;
    }
}

class GridItem {
    constructor(active, url, elem) {
        this.active = active;
        this.url = url;
        this.elem = elem;
    }

    /* Methods */
    isActive() {
        return this.active;
    }

    getURL() {
        return this.url;
    }

    getElem() {
        return this.elem;
    }

    toggle() {
        this.active = !this.active;
    }
}

const elements = document.querySelectorAll('#grid-container div');

const temp = [];
for(let i = 0; i < elements.length; ++i) {
    temp.push(new GridItem(false, `rune${i + 1}.html`, elements[i]));
}

const grid = new Grid(temp);

// I am so sorry for what you're about to witness ;)
for(let i = 0; i < grid.gridLength(); ++i) {
    grid.getItem(i).getElem().addEventListener('click', () => {
        if(!grid.getItem(i).isActive() && grid.activeCount() < Grid.SELECT_LIMIT) {
            grid.getItem(i).toggle();   // active = true
            grid.getItem(i).getElem().style.backgroundColor = 'hsl(115, 98%, 55%)';
        } else if(grid.getItem(i).isActive()) {
            grid.getItem(i).toggle();   // active = false
            grid.getItem(i).getElem().style.backgroundColor = 'black';
        }   // **************************** TURN SOME OF THESE LINES INTO METHODS OF GRID OR GRID ITEM IDK BUT DO IT!
        console.log(grid.activeItems());
    })
}

// do i use DOM ON cotnent loaded?
// sequence puzzel 50 click sequence



// I am trying to be more object oriented OKAY
// document this class okay!
// Linked List
// class LinkedList {
//     static generateList(data) {
//         let nodes = [];
//         for(let i = 0; i < data.length; ++i) {
//             if(i === 0) nodes.push(new Node(null, data[i + 1].url));
//             else if(i === 1) nodes.push(new Node(data[i - 1].url, data[i + 1].url));
//             else nodes.push(new Node(data[i - 1].url, `https://symboltracker.net`));
//         }
//         return nodes;
//     }

//     constructor(nodes) {
//         this.start = 0;
//         this.end = nodes.length - 1;
//         this.current = 0;           // Initially Current And Start Have The Same Value
//         this.nodes = LinkedList.generateList(nodes);
//     }

//     /* METHODS */
//     getStart() { return this.start; }
//     getEnd() { return this.end; }
//     getCurrent() { return this.current; }
//     getNode(index) { return this.nodes[index]; }

//     setCurrent(current) { this.current = current; }

// }

// // document as well
// class Node {
//     constructor(prev, next) {
//         this.prev = prev;
//         this.next = next;
//     }

//     /* METHODS */
//     getPrev() { return this.prev; }
//     getNext() { return this.prev; }
// }

class URLChain {
    // Accepts an array of gridItem objects and returns an array containing the gridItem URLs
    static createChain(data) {
        let urls = [];
        // for(const item of data) {
        //     urls.push(item.getURL());
        // }
        for(let i = 0; i < data.length; ++i) {
            i === 0 ? urls.push(`kf_locaions/${data[i].url}`) : urls.push(data[i].url);
        }
        console.log(urls)
        return urls;    // turn this into a one line statement using an array method which return a new array 
    }

    constructor(data) {
        this.chain = URLChain.createChain(data);
        this.current = -1;
    }

    // Add some error checking as well.
    nextURL() {
        this.current++;
        localStorage.setItem('urlChain', JSON.stringify(this));  // why do I stringify again?
        return this.chain[this.current]; 
    }

    prevURL() { 
        this.current--;
        return this.chain[this.current]; 
    }
}

let btn = document.querySelector('#nav a');
btn.addEventListener('click', event => {
    event.preventDefault()
    if(grid.activeCount() == 3) {
        const urlChain = new URLChain(grid.activeItems());   
        console.log(urlChain)
        window.open(urlChain.nextURL(), '_self');
    }
});