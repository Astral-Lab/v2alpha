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

export { Grid, GridItem };