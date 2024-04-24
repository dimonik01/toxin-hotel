(function(){
    let plusColl = document.getElementsByClassName("dropdown-list__plus");
    let minusColl = document.getElementsByClassName("dropdown-list__minus");
    let accomodationColl = document.getElementsByClassName("dropdown-list__quantity");
    let selectM = document.getElementsByClassName("dropdown__select_expanded");
    let selectB = document.getElementsByClassName("dropdown__select_big-expanded");
    let textField = document.getElementsByClassName("dropdown__input-text");
    let dropdownButton = document.getElementsByClassName("dropdown__expand");
    ;
    class Counter{
        constructor(plus, minus, counter, text, number, inputText){
            this.number = number;
            this.count = 0;
            this.text = inputText;
            this.plusButton = plus.item(number);
            this.minusButton = minus.item(number);
            this.counterButton = counter.item(number);
            
            if (number <= 2){
                this.textField = text.item(0);
                this.select = selectM.item(0);}
            else { 
                this.textField = text.item(1);
                this.select = selectM.item(0);}
            this.plusButton.addEventListener("click", this.add.bind(this));
            this.minusButton.addEventListener("click", this.subtract.bind(this));
        }
        add(){
            this.count++;
            this.counterButton.innerText = this.count;;
        }
        subtract(){
            if (this.count > 0){
                this.count--;
                this.counterButton.innerText = this.count;
            }; 
        }
        getNumberValue(){
            let numberValue = this.count;
            return parseInt(numberValue)
        }
    }

    function updateText(){
        let number1 = leCounter1.getNumberValue();
        let number2 = leCounter2.getNumberValue();
        let number4 = leCounter4.getNumberValue();
        let number5 = leCounter5.getNumberValue();
        let number6 = leCounter6.getNumberValue();
        let totalNumber = number4 + number5 + number6;

        function grammar(number, firstCase, secondCase, thirdCase){
            if (number == 0){
                let text = "";
                number = "";
                return [text, number]
            }
            if (number == 1){
                let text = firstCase;
                return [text, number]
            }
            if (number == 2 || number == 3 || number == 4){
                let text = secondCase;
                return [text, number]
            }
            if (number > 4){
                let text = thirdCase;
                return [text, number]
            }
        }


        let [textValue1,numberValue1] = grammar(number1, "Спальня","Спальни","Спален");
        let [textValue2,numberValue2] = grammar(number2, "Кровать", "Кровати", "Кроватей");
        let [textValue4,numberValue4] = grammar(totalNumber, "Гость", "Гостя", "Гостей");
        if (number1 == 0 && number2 == 0){
            leCounter1.textField.innerText ="Выберите удобства"}
        else {
            leCounter1.textField.innerText = numberValue1 + " " + textValue1 + " " + numberValue2 + " " + textValue2;}
        if (totalNumber > 0){
            leCounter4.textField.innerText = numberValue4 + " " + textValue4;
        }
        else {leCounter4.textField.innerText = "Сколько гостей"}      
    }

    class Select{
        constructor(selectDiv, dropdownButton){
            this.select = selectDiv;
            this.dropdown = dropdownButton;
            if (this.select.className == "dropdown__select_big-expanded"){
                this.dropdown.addEventListener("click", this.toggleSelectB.bind(this));
            }
            else{
                this.dropdown.addEventListener("click", this.toggleSelectM.bind(this));
            }
        }
        toggleSelectM(){
            this.select.classList.toggle("dropdown__select_expanded");
            this.select.classList.toggle("dropdown__select");
        }
        toggleSelectB(){
            this.select.classList.toggle("dropdown__select");
            this.select.classList.toggle("dropdown__select_big-expanded");          
        }
    }

    let leCounter1 = new Counter(plusColl, minusColl, accomodationColl, textField, 0, "Спальни" );
    let leCounter2 = new Counter(plusColl, minusColl, accomodationColl, textField, 1, "Кровати" );
    let leCounter3 = new Counter(plusColl, minusColl, accomodationColl, textField, 2);
    let leCounter4 = new Counter(plusColl, minusColl, accomodationColl, textField, 3, "Гостей");
    let leCounter5 = new Counter(plusColl, minusColl, accomodationColl, textField, 4, "Гостей");
    let leCounter6 = new Counter(plusColl, minusColl, accomodationColl, textField, 5, "Гостей");
    let select1 = new Select(selectM.item(0), dropdownButton.item(0));
    let select2 = new Select(selectB.item(0), dropdownButton.item(1));

    for (let i = 0; i < 6; i++){
        plusColl.item(i).addEventListener("click", updateText);
        minusColl.item(i).addEventListener("click", updateText);
    }                   
})();

