(function(){
    let plusColl = document.getElementsByClassName("dropdown-list__plus");
    let minusColl = document.getElementsByClassName("dropdown-list__minus");
    let accomodationColl = document.getElementsByClassName("dropdown-list__quantity");
    let select = document.getElementsByClassName("dropdown__ui-container");
    console.log(select);
    let selectM = null;
    let selectB = null;
    let single = null;
    if (select.length > 1){
        selectM = document.getElementsByClassName("dropdown__ui-container").item(0).parentNode;
        selectB = document.getElementsByClassName("dropdown__ui-container").item(1).parentNode;
        single = false;
        console.log("two dropdowns");
    }
    else {
        selectM = document.getElementsByClassName("dropdown__ui-container").item(0).parentNode;
        single = true;
        console.log("one dropdown");
    }
    let textField = document.getElementsByClassName("dropdown__input-text");
    let dropdownButton = document.getElementsByClassName("dropdown__expand");
    let accomodExists = null;
    let defaultExists = null;
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
                this.select = selectM;}
            else { 
                this.textField = text.item(1);
                this.select = selectM;}
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
        console.log(leCounter4);
        if (defaultExists == true && accomodExists == false){
            var number4 = leCounter4.getNumberValue();
            var number5 = leCounter5.getNumberValue();
            var number6 = leCounter6.getNumberValue();
            var totalNumber = number4 + number5 + number6;
        }
        else{
            var number1 = leCounter1.getNumberValue();
            var number2 = leCounter2.getNumberValue();
            var number4 = leCounter4.getNumberValue();
            var number5 = leCounter5.getNumberValue();
            var number6 = leCounter6.getNumberValue();
            var totalNumber = number4 + number5 + number6;
        }
        

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

        if (single == true){
            var [textValue4,numberValue4] = grammar(totalNumber, "Гость", "Гостя", "Гостей");
        }
        else{
            var [textValue1,numberValue1] = grammar(number1, "Спальня","Спальни","Спален");
            var [textValue2,numberValue2] = grammar(number2, "Кровать", "Кровати", "Кроватей");
            var [textValue4,numberValue4] = grammar(totalNumber, "Гость", "Гостя", "Гостей");
        }
        if(single == true){
            if (totalNumber > 0){
                leCounter4.textField.innerText = numberValue4 + " " + textValue4;
            }
            else {leCounter4.textField.innerText = "Сколько гостей"}
        }
        else{
            if (number1 == 0 && number2 == 0){
                leCounter1.textField.innerText ="Выберите удобства"}
            else {
                leCounter1.textField.innerText = numberValue1 + " " + textValue1 + " " + numberValue2 + " " + textValue2;}
            if (totalNumber > 0){
                leCounter4.textField.innerText = numberValue4 + " " + textValue4;
            }
            else {leCounter4.textField.innerText = "Сколько гостей"}
        }          
    }

    class Select{
        constructor(selectDiv, dropdownButton, node){
            this.select = selectDiv;
            this.dropdown = document.getElementsByClassName("dropdown__input").item(node).nextElementSibling;
            console.log(this.select)
            console.log(this.dropdown);
            this.dropdownButton = dropdownButton;
            if (this.select.className == "dropdown_big"){
                this.dropdownButton.addEventListener("click", this.toggleSelectB.bind(this));
            }
            if(this.select.className == "dropdown_medium"){
                this.dropdownButton.addEventListener("click", this.toggleSelectM.bind(this));
            }
            if (this.select.className == "dropdown_accomodation-big"){
                this.dropdownButton.addEventListener("click", this.toggleSelectB.bind(this));
            }
            if (this.select.className == "dropdown_accomodation-medium"){
                this.dropdownButton.addEventListener("click", this.toggleSelectB.bind(this));
            }
        }
        toggleSelectM(){
            this.dropdown.classList.toggle("dropdown__select_expanded");
            this.dropdown.classList.toggle("dropdown__select");
            console.log("M triggered"); 
        }
        toggleSelectB(){
            this.dropdown.classList.toggle("dropdown__select_big-expanded");
            this.dropdown.classList.toggle("dropdown__select_big");    
            console.log("B triggered");   
        }
    }

    if (document.getElementsByClassName("dropdown_accomodation-big").length == 1 || document.getElementsByClassName("dropdown_accomodation-medium").length == 1) accomodExists = true; 
    else accomodExists = false; 
    if (document.getElementsByClassName("dropdown_big").length == 1 || document.getElementsByClassName("dropdown_medium").length == 1) defaultExists = true;
    else defaultExists = false;


    if (defaultExists == false && accomodExists == true){
        var leCounter1 = new Counter(plusColl, minusColl, accomodationColl, textField, 0, "Спальни" );
        var leCounter2 = new Counter(plusColl, minusColl, accomodationColl, textField, 1, "Кровати" );
        var leCounter3 = new Counter(plusColl, minusColl, accomodationColl, textField, 2);
    }
    if (defaultExists == true && accomodExists == false){
        var leCounter4 = new Counter(plusColl, minusColl, accomodationColl, textField, 0, "Гостей");
        var leCounter5 = new Counter(plusColl, minusColl, accomodationColl, textField, 1, "Гостей");
        var leCounter6 = new Counter(plusColl, minusColl, accomodationColl, textField, 2, "Гостей");
    }
    if (defaultExists == true && accomodExists == true){
        var leCounter1 = new Counter(plusColl, minusColl, accomodationColl, textField, 0, "Спальни" );
        var leCounter2 = new Counter(plusColl, minusColl, accomodationColl, textField, 1, "Кровати" );
        var leCounter3 = new Counter(plusColl, minusColl, accomodationColl, textField, 2);
        var leCounter4 = new Counter(plusColl, minusColl, accomodationColl, textField, 3, "Гостей");
        var leCounter5 = new Counter(plusColl, minusColl, accomodationColl, textField, 4, "Гостей");
        var leCounter6 = new Counter(plusColl, minusColl, accomodationColl, textField, 5, "Гостей");
    }
    
    let select1 = new Select(selectM, dropdownButton.item(0), 0);
    if (selectB != undefined){
        let select2 = new Select(selectB, dropdownButton.item(1), 1);
    }

    if (single == true){
        for (let i = 0; i < 3; i++){
            plusColl.item(i).addEventListener("click", updateText);
            minusColl.item(i).addEventListener("click", updateText);
            console.log("single true fired");
        }
    }
    else {
        for (let i = 0; i < 6; i++){
            plusColl.item(i).addEventListener("click", updateText);
            minusColl.item(i).addEventListener("click", updateText);
            console.log("single false fired");
        }
    }      
})();

