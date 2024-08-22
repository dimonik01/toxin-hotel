(function(){
    class Sidebar{
        constructor(){
            this.button = document.getElementsByClassName("search-room__pop-up").item(0);
            this.sidebar = document.getElementsByClassName("search-room__side-menu").item(0);
            this.state = false;
            this.cards = document.getElementsByClassName("search-room__cards").item(0);
            this.button.addEventListener("click", this.buttonHandler.bind(this));
        }

        buttonHandler(){
            if (!this.state){
                this.button.classList.replace("search-room__mobile_pop-up_closed","search-room__mobile_pop-up_opened");
                this.sidebar.classList.replace("search-room__side-menu_closed","search-room__side-menu_opened");
                this.cards.classList.replace("search-room__cards","search-room__cards_closed");
                this.state = true;
            }
            else{
                this.button.classList.replace("search-room__mobile_pop-up_opened","search-room__mobile_pop-up_closed");
                this.sidebar.classList.replace("search-room__side-menu_opened","search-room__side-menu_closed");
                this.cards.classList.replace("search-room__cards_closed","search-room__cards");
                this.state = false;
            }
        }
    }
    let object = new Sidebar();
})()