export default class Search {
    //1. Select DOM elements
    constructor() {
        this.headerSearchIcon = document.querySelector('.header-search-icon')
        this.events()
    }

    //2. EVENTS
    events() {
        this.headerSearchIcon.addEventListener('click', (event) => {
            event.preventDefault()
            this.openSearchOverlay()
        })
    }

    //3. METHODS
    openSearchOverlay() {
        alert('Open overlay just ran!')
    }
}