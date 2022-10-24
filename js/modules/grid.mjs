class Grid {
    static SELECT_LIMIT = 3;

    // why static? We do not need it once the object is created.
    // scans the DOM for #grid-container divs and returns an array
    // of GridItem objects
    static initGrid() {
        const elements = document.querySelectorAll('#grid-container div');
        const gridItems = [];
        for(let i = 0; i < elements.length; ++i) {
            gridItems.push(new GridItem(false, `symbol_${i + 1}.html`, elements[i]));
        }
        return gridItems;
    }

    constructor() {
        this.gridItems = Grid.initGrid();

        for(const item of this.gridItems) {
            item.addBehaviour(this);
        }
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
        this.colour;
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

    addBehaviour(grid) {
        this.elem.addEventListener('click', () => { 
            if(!this.active && grid.activeCount() < Grid.SELECT_LIMIT) {
                this.toggle();
                // Duplicated code, make class method or new class?
                const path = window.location.href;  
                // We do not want to include the '/', hence the +1
                const fileIndex = path.lastIndexOf('/') + 1;
                const seprator = path.lastIndexOf('_');
                const raidName = path.substring(fileIndex, seprator);
                switch(raidName) {
                    case 'kf':
                        this.colour = '#2ffd1c';
                        break;
                    case 'vow':
                        this.colour = '#e4af00';
                        break;
                }
                this.elem.style.backgroundColor = this.colour;
            } else if(this.active) {  
                this.toggle();
                this.elem.style.backgroundColor = '#000000'; 
            }
        });
    }
}

export { Grid, GridItem };