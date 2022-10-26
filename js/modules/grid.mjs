class Grid {
    // Sets the limit for the number of selectable symbols on the symbol select webpages.
    static SELECT_LIMIT = 3;

    /*
     * The purpose of this static method is to obtain all the symbols on the symbol 
     * select webpages, when creating a new instance of a Grid object.
     * I decided to encapsulate this method in the constructor as, while we could
     * have the user pass in an array containing the symbols (Grid Items), I feel like
     * that approach is somewhat prone to errors and unnecessary for the programmer.
     * 
     * Pay attention to the second argument of the GridItem constructor. While absolute
     * paths would work as well, designing the project where the symbol location pages 
     * are somewhat normalised allows for a much easier and cleaner way of handling the URLs.
     */
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

    /*
     * The GridItem objects are stored in an array called 'gridItems'
     * so to access them this method takes an index and returns the
     * corresponding GridItem.
     * 
     * Some error checking would be valuable here, for example, a range
     * check between 0 <= index < gridItems.length. 
     */
    getItem(index) {
        return this.gridItems[index];
    }

    /*
     * Nothing special going on here. Just following the 'keep properties'
     * private and access them using methods'.
     */
    gridLength() {
        return this.gridItems.length;
    }

    /*
     * We need a way to know how many symbols are currently selected.
     * This is achieved by calling the activeItems() method and returning
     * the length of this array. Originally I looped through the gridItems
     * array and returned a variable storing the count of active item. A few
     * minutes before I wrote this, the below change was implemented, making
     * good use of methods!
     */
    activeCount() {
        return this.activeItems().length;
    }

    /*
     * Rather than return the number of active GridItems, this method returns 
     * an array of references, allowing use to create the URLChain once needed.
     */
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

    // Has the symbol been clicked? 
    isActive() {
        return this.active; 
    }

    getURL() {
        return this.url;
    }

    // Returns all the HTML element data.
    getElem() {
        return this.elem;
    }

    // Negates the active property. F -> T, T -> F.
    toggle() {
        this.active = !this.active;
    }

    /*
     * It may seem like there is a lot going on here, but not really.
     * We use this method only on the symbol select pages, so think
     * of the clickable symbols specifically.
     * The user has to select three symbols and for each symbol selected
     * we want the background of that symbol to change colour. This is
     * basicaaly what the body of the 'if' does. 
     * Now if a symbol has already been selected, i.e. it has a blue background, 
     * then we want to change the background back to the default value (black), 
     * hence the use of the toggle method.
     * The colour the symbol background changes to is dependent on the symbol
     * select page. This is why we use the 'switch' statement, which gets 
     * passed the 'initials' of the raid (kf, vow, etc).
     */
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