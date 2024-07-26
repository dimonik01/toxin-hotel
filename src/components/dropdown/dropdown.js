(function(){
    const entityAmount = document.getElementsByClassName("dropdown");
    const entityArr = [];
    entityArr.length = entityAmount.length;
    class Dropdown{
        constructor(index){
            this.expand = entityAmount.item(index).lastChild.firstChild.lastChild;
            this.select = entityAmount.item(index).lastElementChild.lastElementChild;
            this.expand.addEventListener("click", this.expandHandler.bind(this))
            //console.log(this.plus);
            console.log(this.select);
        }

        expandHandler(e){
            console.log("hi!");
            switch(this.select.className){
                case 'dropdown__select':
                    this.select.className = "dropdown__select_expanded"
                break;
                case 'dropdown__select_expanded':
                    this.select.className = "dropdown__select";
                break;
                case 'dropdown__select_big':
                    this.select.className = "dropdown__select_big-expanded"
                break;
                case 'dropdown__select_big-expanded':
                    this.select.className = "dropdown__select_big"
                break;
            }
        }
    }

    function initEntities(){
        for(let i = 0; i < entityAmount.length; i++){
            
            console.log("dropdown check");
            entityArr[i] = new Dropdown(i);
        }
    }
    initEntities();
    console.log(entityArr);
})();

