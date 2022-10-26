class URLChain {
    /*
     * Accepts an array of gridItem objects and returns an array containing the gridItem URLs,
     * which are used to construct the URLChain object.
     */
    static createChain(data, final) {
        let urls = [];
        for(const item of data) {
            urls.push(item.getURL());
        }
        urls.push(final);
        return urls;    
    }

    /*
     * Gets the locally stored URLChain object and returns it with the prototype set.
     *
     * When we get to a new symbol location page, we retrieve the URLChain data from localStorage, and since
     * the locally stored object does not retain its prototype, we have to set it again. Making the method
     * static seemed natural at the time, as still does. 
     */
    static GetLocalChain() {
        return Object.setPrototypeOf(
            JSON.parse(localStorage.getItem('urlChain')), URLChain.prototype
        );
    }

    /*
     * current is initially set to -1 as we call nextURL() on the <raidName>_select, so when we get to the
     * first symbol location page, its value will be 0.
     */
    constructor(data, final) {
        this.chain = URLChain.createChain(data, final);
        this.current = -1;
    }

    /*
     * Returns the URL to the next page in the URLChain.
     */
    nextURL() {
        this.current++;
        localStorage.setItem('urlChain', JSON.stringify(this));  // this is a reference to the current object.
        return this.chain[this.current]; 
    }

    /*
     * Returns the URL to the previous page in the URLChain.
     * 
     * Since the current property is vital to traversing the webpages in the correct order,
     * care must be taken to how it is handled with respect to localStorage, hence why we
     * decrement first, then call .setItem on localStorage.
     * 
     * Error checking here is probably a good idea, but this can come in the future. As
     * for what sort of error checking, I will implement a range restriction on the current 
     * property. For example, in practice current should not be allowed to go below 0 or above 2.
     */
    prevURL() { 
        this.current--;
        localStorage.setItem('urlChain', JSON.stringify(this)); // objects have to be stringified for localStorage.
        return this.chain[this.current]; 
    }

    // Not currently being used, so ignore for now.
    atEnd() {
        return this.current === this.chain.length;
    }

    /*
     * Returns a boolean indicating if the current page is the starting page.
     * Used to remove the back button on the first symbol location page.
     */
    atStart() {
        return this.current === 0;
    }
}

export { URLChain };