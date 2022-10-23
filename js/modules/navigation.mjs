import { URLChain } from "./urlChain.mjs";
/*
 * Document Class Details?
 *
 * Summary:
 * 
 * Properties:
 * 
 * Methods:
 * 
 * 
 */

// Comment Class!
class Navigation {
    static getNavButtons() {
        return document.querySelectorAll('#nav a');
    }
 
    static #NEXT = 1;
    static #BACK = -1;
    static #HOME = 0;

    constructor(pageButtons, urlChain) {
        this.pageButtons = Array.from(pageButtons); // convert NodeList to Array so we can use the .find() method
        this.urlChain = urlChain;   // null indicates we are on the first page

        if(urlChain && urlChain.atStart()) {
            document.querySelector('#nav').removeChild(
                this.pageButtons.find(btn => btn.id === 'back'
            ));
        }
    }

    openPage(directionFlag) {
        window.open(
            directionFlag === -1 ? this.urlChain.prevURL() : 
            directionFlag === 1 ? this.urlChain.nextURL() : 
            '../../index.html', '_self' // put in urlChain class
        );
    }

    addClickListeners(grid) {
        if(!grid) {
            for(const btn of this.pageButtons) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openPage(
                        btn.id === 'back' ? Navigation.#BACK :
                        btn.id === 'next' ? Navigation.#NEXT :
                                            Navigation.#HOME
                    );
                });
            }
        } else {
            this.pageButtons[0].addEventListener('click', event => {
                event.preventDefault();
                if(grid.activeCount() === 3) {
                    const urlChain = new URLChain(grid.activeItems(), 'accepted.html');
                    console.log(urlChain);
                    window.open(`kf_locations/${urlChain.nextURL()}`, '_self');
                }
            })
        }
    }
}

export { Navigation };