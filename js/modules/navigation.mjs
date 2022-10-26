import { URLChain } from "./urlChain.mjs";

class Navigation {
    /*
     * In the contenxt of symboltracker.net, this static method returns 
     * all the navigation buttons on the webpage, <next|back|home>.
     */
    static getNavButtons() {
        return document.querySelectorAll('#nav a');
    }
    
    /*
     * Used for semantic meaning only.
     * Indicates the direction we are traversing the URLChain (webpages). 
     */
    static #NEXT = 1;
    static #BACK = -1;
    static #HOME = 0;

    constructor(pageButtons, urlChain) {
        this.pageButtons = Array.from(pageButtons); // convert NodeList to Array so we can use the .find() method
        this.urlChain = urlChain;                   

        /*
         * I do not want the user to be able to go back on the first locaion page, so this code checks if we are
         * on the first page, if so, remove the back button. 
         */
        if(urlChain && urlChain.atStart()) {        
            document.querySelector('#nav').removeChild(
                this.pageButtons.find(btn => btn.id === 'back'
            ));
        }
    }

    /*
     * openPage is a wrapper function for window.open().
     * Its purpose is not necessary as chaining if statements
     * may also work, this just look nicer to me and what I
     * thought of at the time.
     */
    openPage(directionFlag) {
        window.open(
            directionFlag === -1 ? this.urlChain.prevURL() : 
            directionFlag === 1 ? this.urlChain.nextURL() : 
            '../../index.html', '_self'
        );
    }

    /*
     * This method adds the behaviour to the navigation buttons.
     * It ensures each button links to the correct webpage in the 
     * URLChain.
     * event.preventDefault() is being used, as without it when a 
     * navigation button is clicked the page reloads. This is
     * because I am using anchor elements <a> with the href set to
     * an empty string, which by default, would reload the page, hence
     * preventDefault(). Using button elements or divs would render this
     * line unnecessary, but it is good practive as I am now aware of
     * default element behaviour.
     * 
     * We pass a grid object in as depending on the webpage we are 
     * currently on, the buttons should (link) behave differently.
     * For example, when we are on the symbol select page, the next
     * button should not open the next page unless three symbols have
     * been selected. 
     * 
     * The root reason for using the grid object as a parameter, is
     * due to function overloading, which at the current time of writing
     * this, I am not aware if there is an explict way of doing this
     * in JavaScript, so by using if else statements I can detect if the grid
     * object argument has been passed in or not.
     */
    addClickListeners(grid) {
        if(!grid) {
            for(const btn of this.pageButtons) {
                btn.addEventListener('click', event => {
                    event.preventDefault();
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