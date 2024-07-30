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
            this.options = entitySelect.item(index).nextElementSibling;
            this.text = entitySelect.item(index).firstElementChild;
            this.textSubArr1 = null;
            this.textSubArr2 = null;
            this.textSubArr3 = null;
            this.accomodation = null;
            this.ddtest = entitySelect.item(index).nextElementSibling.firstElementChild.firstElementChild;
            if (this.ddtest.innerHTML == "Взрослые"){
                this.accomodation = false;
            }
            else{
                this.accomodation = true;
                this.textSubArr1 = ["Спальня","Спальни","Спален"];
                this.textSubArr2 = ["Кровать","Кровати","Кроватей"];
                this.textSubArr3 = "";
                this.textArr = [this.textSubArr1, this.textSubArr2, this.textSubArr3];
            }

            this.template = function(arr, textArray, acc){
                return {
                    plus: entitySelect.item(index).nextElementSibling.childNodes[arr].lastElementChild.lastElementChild,
                    minus: entitySelect.item(index).nextElementSibling.childNodes[arr].lastElementChild.firstElementChild,
                    counter: entitySelect.item(index).nextElementSibling.childNodes[arr].lastElementChild.childNodes[1],
                    textArr: textArray,
                    accomodation: acc,
                    accomodationValue: "",
                    get counterValue(){
                        return this.counter.innerHTML
                    },
                    set counterValue(value){
                        this.counter.innerHTML = value;
                    },
                    get subArray(){
                        return this.textArr;
                    },
                    get accValue(){
                        return this.accomodationValue;
                    },

                    assignListeners(){
                        this.plus.addEventListener("click", this.plusHandler.bind(this));
                        this.minus.addEventListener("click", this.minusHandler.bind(this));
                    },

                    plusHandler(e){
                        this.counterValue = parseInt(this.counterValue) + 1;
                        if (this.accomodation == true){
                            switch(parseInt(this.counterValue)){
                                case 0:
                                    this.accomodationValue = ""
                                break;
                                case 1:
                                    this.accomodationValue = this.subArray[arr][0]
                                break;
                                case 2: case 3: case 4:
                                    this.accomodationValue = this.subArray[arr][1]
                                break;
                                default:
                                    this.accomodationValue = this.subArray[arr][2]
                            }
                        }
                    },

                    minusHandler(e){
                        if (this.counterValue > 0){
                            this.counterValue = parseInt(this.counterValue) - 1;
                            if (this.accomodation == true){
                                switch(parseInt(this.counterValue)){
                                    case 0:
                                        this.accomodationValue = ""
                                    break;
                                    case 1:
                                        this.accomodationValue = this.subArray[arr][0]
                                    break;
                                    case 2: case 3: case 4:
                                        this.accomodationValue = this.subArray[arr][1]
                                    break;
                                    default:
                                        this.accomodationValue = this.subArray[arr][2]
                                }
                            }
                        }
                    },
                }
            }
            this.first = this.template(0, this.textArr, this.accomodation);
            this.first.assignListeners();
            this.second = this.template(1, this.textArr, this.accomodation);
            this.second.assignListeners();
            this.third = this.template(2, this.textArr, this.accomodation);
            this.third.assignListeners();
            this.minusArr = entityAmount.item(index).lastChild.lastChild;
            this.counterArr = entityAmount.item(index).lastChild.lastChild;
            this.expand.addEventListener("click", this.expandHandler.bind(this))
        }

        expandHandler(e){
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

        assignListeners(e){
            this.options.addEventListener("click",this.updateText.bind(this))
        }

        updateText(){
            if (this.accomodation == false){
                let value = parseInt(this.first.counterValue) + parseInt(this.second.counterValue) + parseInt(this.third.counterValue);
                switch(value){
                    case 0:
                        this.text.innerHTML = "Сколько гостей"
                    break;
                    case 1:
                        this.text.innerHTML = value + " гость"
                    break;
                    case 2: case 3 :case 4:
                        this.text.innerHTML = value + " гостя"
                    break;
                    default:
                        this.text.innerHTML = value + " гостей"
                    break;
                }
            }
            else{
                let firstValue = this.first.counterValue + " " + this.first.accomodationValue;
                let secondValue = this.second.counterValue + " " + this.second.accomodationValue;
                if(this.first.counterValue == 0){
                    firstValue = "";
                }
                if(this.second.counterValue == 0){
                    secondValue = "";
                }
                let value = firstValue + " " + secondValue;
                this.text.innerHTML = value;
            }
        }
    }

    function initEntities(){
        for(let i = 0; i < entityAmount.length; i++){
            entityArr[i] = new Dropdown(i);
            entityArr[i].assignListeners();
        }
    }
    initEntities();
})();

