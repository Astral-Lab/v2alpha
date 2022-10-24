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
                // Anchor elements do not specify the href, so we must prevent the page from being reloaded.
                event.preventDefault();
                if(grid.activeCount() === 3) {
                    // Construct a URLChain object to link all selected pages together.
                    const urlChain = new URLChain(grid.activeItems(), 'accepted.html');
                    // Extract the raid name from the URL.
                    // For example, URL = .*/html/kf_select.html, then raid name = kf.
                    // Allows for dynamic linking, wow, that sounds pretty cool.
                    // Regex most likely would work better here, but this works for now.
                    const path = window.location.href;  
                    // We do not want to include the '/', hence the +1
                    const fileIndex = path.lastIndexOf('/') + 1;
                    const seprator = path.lastIndexOf('_');
                    const raidName = path.substring(fileIndex, seprator);
                    // Open next webpage as we have all the link data.
                    window.open(`${raidName}_locations/${urlChain.nextURL()}`, '_self');
                }
            }); 
        }
    }
}

export { Navigation };