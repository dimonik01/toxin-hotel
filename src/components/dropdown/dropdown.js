(function(){
    let plusColl = document.getElementsByClassName("dropdown-list__plus");
    let minusColl = document.getElementsByClassName("dropdown-list__minus");
    let accomodationColl = document.getElementsByClassName("dropdown-list__quantity");
    let textField = document.getElementsByClassName("dropdown__input-text");
    class Counter{
        constructor(plus, minus, counter, text, number, inputText){
            this.number = number;
            this.count = 0;
            this.text = inputText;
            this.plusButton = plus.item(number);
            this.minusButton = minus.item(number);
            this.counterButton = counter.item(number);
            if (number <= 2){
                this.textField = text.item(0);}
            else { 
                this.textField = text.item(1);}
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
        update(){
            //this.textField.innerText = this.count + " " + this.text;
            let numberValue = this.count;
            return numberValue
        }
    }

    let leCounter1 = new Counter(plusColl, minusColl, accomodationColl, textField, 0, "Спальни" );
    let leCounter2 = new Counter(plusColl, minusColl, accomodationColl, textField, 1, "Кровати" );
    let leCounter3 = new Counter(plusColl, minusColl, accomodationColl, textField, 2);
    let leCounter4 = new Counter(plusColl, minusColl, accomodationColl, textField, 3, "Гостей");
    let leCounter5 = new Counter(plusColl, minusColl, accomodationColl, textField, 4, "Гостей");
    let leCounter6 = new Counter(plusColl, minusColl, accomodationColl, textField, 5, "Гостей");
    for (let i = 0; i < 2; i++){
        plusColl.item(i).addEventListener("click", updateText);
        minusColl.item(i).addEventListener("click", updateText);
    }
    function updateText(){
        let number1 = parseInt(leCounter1.update());
        let number2 = parseInt(leCounter2.update());
        console.log(number1);
        let arr = [number1, number2];
        for (let i = 0; i < 2; i++){
            if (arr[i] == 1){
                textField.item(0).innerHTML = number1 +" "+ "Кровать";}
            if (arr[i] == 2 || arr[i] == 3 || arr[i] == 4){
                textField.item(0).innerHTML = number1 +" "+ "Кровати";}
            if (arr[i] > 4){
                textField.item(0).innerHTML = number1 +" "+ "Кроватей";}
        }
    }

})() 


