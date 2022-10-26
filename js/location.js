import { URLChain } from './modules/urlChain.mjs';
import { Navigation } from './modules/navigation.mjs';

/*
 * Again, all we're doing here is creating a new instance of 
 * a Navigation object. Internally, the localStorage URLChain
 * object is getting its prototype set, as localStorage does
 * not support storing function defintions. I believe there's
 * the possiblity to create a custom stringify method for the 
 * URLChain class, but setting the prototype internally seemed
 * to be considerably easier at the time of writing this. 
 */
const btns = Navigation.getNavButtons();
const navigation = new Navigation(btns, URLChain.GetLocalChain());
navigation.addClickListeners();

/*
 * I've been having this ongoing (randomly occuring) issue where the iframe's will not load until the page has been refreshed.
 * The issue seems to be related to the videos needing to be looped, so most likely casue is located in the iframe element.
 * My short term solution is to automatically refresh the iframe when the page loads, so even if the iframe does not load on the 
 * iniitial load it does not matter.
 * Not the niceset fix, but it'll do for now ;)
 * 
 * UPDATE: 26/10/2022
 * Turns out this does not work.
 * I will take out the loop functionality until a permanant solution is found.
 * This means taking out the &loop and &playlist parameters in the HTML iframe embed
 * and disabling the below code.
 */
// const iframe = document.querySelector('iframe');
// iframe.src = iframe.src;