class URLChain {
    // Accepts an array of gridItem objects and returns an array containing the gridItem URLs
    static createChain(data) {
        let urls = [];
        for(const item of data) {
            urls.push(item.getURL());
        }
        return urls;    // turn this into a one line statement using an array method which return a new array 
    }

    constructor(data) {
        this.chain = URLChain.createChain(data);
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
        return this.chain[this.current]; 
    }
}

// I love JavaScript
const [backBtn, nextBtn] = document.querySelectorAll('#nav a');

console.log(backBtn, nextBtn);


backBtn.addEventListener('click', event => {
    event.preventDefault();

    // Link to previous page
})

nextBtn.addEventListener('click', event => {
    event.preventDefault();

    // Link to next page
    const urlChain = JSON.parse(localStorage.getItem('urlChain'));
    Object.setPrototypeOf(urlChain, URLChain.prototype)
    console.log(urlChain);
    window.open(urlChain.nextURL(), '_self');
})