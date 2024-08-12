class Card{
    constructor(node){
        this.node = node;
        this.position = 0;
        this.imgArr = document.getElementsByClassName("card__slider-container").item(node).nextElementSibling;
        this.bgContainerDiv = document.getElementsByClassName("card__bg-container").item(node);
        this.leftButton = document.getElementsByClassName("card__slider_left").item(node);
        this.rightButton = document.getElementsByClassName("card__slider_right").item(node);
        this.leftButton.addEventListener("click", this.leftHandler.bind(this));
        this.rightButton.addEventListener("click", this.rightHandler.bind(this));
    }
    initMenu(){
        let newMenu = document.createElement("div");
        newMenu.className = "card__menu-container"
        let newList = document.createElement("ul");
        newList.className = "card__menu"
        let newListItemArr = []
        for(let i = 0; i < 4; i++){
            newListItemArr[i] = document.createElement("div");
            if (i == 0){
                newListItemArr[i].className = "card__list-item card__list-item_active"
            }
            else{
                newListItemArr[i].className = "card__list-item" 
            }
            newList.appendChild(newListItemArr[i]);
        }
        newMenu.appendChild(newList);
        this.bgContainerDiv.appendChild(newMenu);
    }

    leftHandler(){
        let menuArr = document.getElementsByClassName("card__menu").item(this.node).childNodes;
        if (this.position != 0){
            menuArr[this.position].className = "card__list-item";
            menuArr[this.position - 1].className = "card__list-item card__list-item_active";
            this.position--;
        }

    }

    rightHandler(){
        let menuArr = document.getElementsByClassName("card__menu").item(this.node).childNodes;
        if (this.position != 3){
            menuArr[this.position].className = "card__list-item";
            menuArr[this.position + 1].className = "card__list-item card__list-item_active";
            this.position++;
        }
    }
}

let cardsArr = document.getElementsByClassName("card");
let objArr = [];
for(let i = 0; i < cardsArr.length; i++){
    objArr[i] = new Card(i);
    objArr[i].initMenu();
}