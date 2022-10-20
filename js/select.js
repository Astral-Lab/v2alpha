/* Possibly Import Class Using ES6 Style Import Statements? */
import { Grid, GridItem } from './modules/grid.mjs';
import { URLChain } from './modules/urlChain.mjs';

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


let btn = document.querySelector('#nav a');
btn.addEventListener('click', event => {
    event.preventDefault()
    if(grid.activeCount() == 3) {
        const urlChain = new URLChain(grid.activeItems(), 'accepted.html');   
        console.log(urlChain)
        window.open(`kf_locations/${urlChain.nextURL()}`, '_self');
    }
});