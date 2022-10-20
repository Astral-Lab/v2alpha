import { URLChain } from './modules/urlChain.mjs';

/*
Can add an id to each button, id="next/back/home"
if id is not present then by pure logic we will know the page we're on
1: n
2: nb
3: nb
4: bh
*/

const backBtn = document.querySelector('#back');
const nextBtn = document.querySelector('#next');
const homeBtn = document.querySelector('#home');

const PREV = -1;
const NEXT = 1;
const HOME = 0;

function getSetOpen(direction) {
    const urlChain = JSON.parse(localStorage.getItem('urlChain'));
    Object.setPrototypeOf(urlChain, URLChain.prototype);
    window.open(
        direction === -1 ? urlChain.prevURL() : 
        direction === 1 ? urlChain.nextURL() : 
        '../../index.html', '_self'
    );
}

// If the btns exist, then add event listeners and customisation if needed
if(backBtn) {
    backBtn.addEventListener('click', () => {
        event.preventDefault(); // can I get rid of this?
        getSetOpen(PREV);
    });
}

if(nextBtn) {
    nextBtn.addEventListener('click', event => {
        event.preventDefault();
        getSetOpen(NEXT);
    });
}

if(homeBtn) {   // clear localStorage?
    homeBtn.addEventListener('click', event => {
        event.preventDefault();
        getSetOpen(HOME);
    });
}

// make this look nicer
const urlChain = JSON.parse(localStorage.getItem('urlChain'));
const parent = document.querySelector('#nav')
Object.setPrototypeOf(urlChain, URLChain.prototype);
if(urlChain.atStart()) {
    parent.removeChild(backBtn);   
}