class URLChain {
    // Accepts an array of gridItem objects and returns an array containing the gridItem URLs
    static createChain(data, final) {
        let urls = [];
        for(const item of data) {
            urls.push(item.getURL());
        }
        urls.push(final);
        return urls;    // turn this into a one line statement using an array method which return a new array 
    }

    constructor(data, final) {
        this.chain = URLChain.createChain(data, final);
        this.current = -1;
    }

    // Add some error checking as well.
    nextURL() {
        this.current++;
        localStorage.setItem('urlChain', JSON.stringify(this));  // why do I stringify again?
        return this.chain[this.current]; 
    }

    prevURL() { 
        this.current--;
        localStorage.setItem('urlChain', JSON.stringify(this));  // why do I stringify again?
        return this.chain[this.current]; 
    }

    atEnd() {
        return this.current === this.chain.length;
    }

    atStart() {
        return this.current === 0;
    }
}

export { URLChain };