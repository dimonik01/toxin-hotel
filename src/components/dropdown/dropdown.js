(function(){
    const entityAmount = document.getElementsByClassName("dropdown");
    const entitySelect = document.getElementsByClassName("dropdown__input");
    const entityArr = [];
    entityArr.length = entityAmount.length;
    class Dropdown{
        constructor(index){
            this.expand = entityAmount.item(index).lastElementChild.firstElementChild.lastElementChild;
            this.select = entityAmount.item(index).lastElementChild.lastElementChild;
            this.selectNodes = entityAmount.item(index).lastChild.lastChild.childNodes;
            this.template = function(arr){
                return {
                    plus: entitySelect.item(index).nextElementSibling.childNodes[arr].lastElementChild.lastElementChild,
                    minus: entitySelect.item(index).nextElementSibling.childNodes[arr].lastElementChild.firstElementChild,
                    counter: entitySelect.item(index).nextElementSibling.childNodes[arr].lastElementChild.childNodes[1],
                    value: this.counter.innerHTML,
                    assignListeners(){
                        this.value = this.counter.innerHTML;
                        console.log(this.value);
                        this.plus.addEventListener("click", this.plusHandler.bind(this, this.value));
                        this.minus.addEventListener("click", this.minusHandler.bind(this, this.value));
                        console.log("listener assigned");
                    },

                    plusHandler(value, e){
                        console.log("plus pressed");
                        console.log(value);
                        console.log(this.value);
                        this.value = parseInt(value) + 1;
                        this.counter.innerHTML = this.value;
                        console.log(this.value);
                    },

                    minusHandler(value, e){
                        console.log("minus pressed");
                        console.log(value);
                    },
                }
            }
            this.first = this.template(0).assignListeners();
            this.second = this.template(1).assignListeners();
            this.third = this.template(2).assignListeners();

            /*this.first = {
                plus: entitySelect.item(index).nextElementSibling.childNodes[0].lastElementChild.lastElementChild,
                minus: entitySelect.item(index).nextElementSibling.childNodes[0].lastElementChild.firstElementChild,
                counter: entitySelect.item(index).nextElementSibling.childNodes[0].lastElementChild.childNodes[1],
                assignEvent(){
                    //this.first.plus.addEventListener("click", this.plusHandler.bind(this));
                    console.log(this.first.plus);
                }
            }*/
            /*this.second = this.first;
            this.third = {
                plus: entitySelect.item(index).nextElementSibling.childNodes[2].lastElementChild.lastElementChild,
                minus: entitySelect.item(index).nextElementSibling.childNodes[2].lastElementChild.firstElementChild,
                counter: entitySelect.item(index).nextElementSibling.childNodes[2].lastElementChild.childNodes[1],
            }*/

            this.minusArr = entityAmount.item(index).lastChild.lastChild;
            this.counterArr = entityAmount.item(index).lastChild.lastChild;
            this.expand.addEventListener("click", this.expandHandler.bind(this))
            //console.log(this.plusArr);
            //console.log(this.select);
            /*console.log(this.first);
            console.log(this.second);
            console.log(this.third);*/
        }

        expandHandler(e){
            //console.log("hi!");
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

        plusHandler(e){
            console.log("plus pressed");
        }


    }

    function initEntities(){
        for(let i = 0; i < entityAmount.length; i++){
            entityArr[i] = new Dropdown(i);
        }
    }
    initEntities();
    //console.log(entityArr);
})();

