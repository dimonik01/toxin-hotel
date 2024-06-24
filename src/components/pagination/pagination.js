(function(){
    class Pagination{
        constructor(){
            this.buttonCollection = document.getElementsByClassName("pagination__item");
            for (let i = 0; i < this.buttonCollection.length - 1; i++){
                this.buttonCollection.item(i).addEventListener("click", this.handler.bind(this))
            }
            this.buttonFirst = this.buttonCollection.item(0);
            this.buttonLast = this.buttonCollection.item(this.buttonCollection.length - 2);
            this.entityLimit = 0;
            console.log(this.buttonFirst);
            console.log(this.buttonLast);
        }
        handler(e){
            for (let i = 0; i < this.buttonCollection.length - 1; i++){
               this.buttonCollection.item(i).classList.remove("pagination__item_selected");
            }
            e.target.classList.add("pagination__item_selected");
            if (e.target.getAttribute("border") == "right"){
                if(this.entityLimit > 3){

                }
            }
            
        }
    }
    let pagination = new Pagination();
})();