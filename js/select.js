import { Grid } from './modules/grid.mjs';
import { Navigation } from './modules/navigation.mjs';

// do i use DOM ON content loaded?
const grid = new Grid();
const btns = Navigation.getNavButtons();
const navigation = new Navigation(btns);
navigation.addClickListeners(grid);