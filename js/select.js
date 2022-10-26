import { Grid } from './modules/grid.mjs';
import { Navigation } from './modules/navigation.mjs';

/*
 * What we're doing here is, constructing a custom object called 'Grid',
 * which stores all selectable symbols for the '<raidName>_select' webpages.
 * It handles all the behaviour of the symbols, such as, when clicked change
 * the background colour to X and only allow three selected symbols at a time.
 * 
 * The Navigation object handles the behaviour of the next button for this page.
 * For example, once it is clicked where do we go? Internally, a URLChain object
 * (tells the website how to traverse the webpages) is created and this is what 
 * the Navigation object interacts with. 
 */
const grid = new Grid();
const btns = Navigation.getNavButtons();
const navigation = new Navigation(btns);
navigation.addClickListeners(grid);