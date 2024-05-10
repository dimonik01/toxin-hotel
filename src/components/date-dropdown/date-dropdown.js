(function(){
    let parameters = {
        buttons: document.getElementsByClassName("date-dropdown__expand"),
        dropdown: document.getElementsByClassName("factual-dd"),
        

    }

    class DropdownToggler{
        constructor(object, number){
            this.button = object.buttons[number];
            this.dropdown = object.dropdown.item(0);
            this.button.addEventListener("click", this.clickHandler.bind(this));
        }

        clickHandler(){
            this.dropdown.classList.toggle("factual-dd");
            this.dropdown.classList.toggle("factual-dd_closed");
        }
    }
    class Calendar{   
        constructor(node){
            this.node = node;
            this.weekdays = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
            this.date = new Date(2019, 0, 0);
            this.weekdaysNode = document.getElementsByClassName("factual-dd__weekdays_active").item(0);
            this.daysNode = document.getElementsByClassName("factual-dd__days_active").item(0);
            this.dayValueNode = document.getElementsByClassName("factual-dd__day-value_active").item(0);
            this.monthsNode = document.getElementsByClassName("factual-dd__months").item(0);
            this.monthValueNode = document.getElementsByClassName("factual-dd__month-value").item(0);
            this.yearValueNode = document.getElementsByClassName("factual-dd__year-value").item(0);
            this.yearNode = document.getElementsByClassName("factual-dd__years").item(0);
            this.acceptButton = document.getElementsByClassName("factual-dd__accept").item(0);
            this.clearButton = document.getElementsByClassName("factual-dd__clear").item(0);
            this.nextMonth = document.getElementsByClassName("factual-dd__arrow-right").item(0);
            this.previousMonth = document.getElementsByClassName("factual-dd__arrow-left").item(0);
            this.nextMonth.addEventListener("click", this.showNextMonth.bind(this));
            this.previousMonth.addEventListener("click", this.showPreviousMonth.bind(this));
            this.dayValueNode.addEventListener("click", this.showMonths.bind(this));
            this.monthValueNode.addEventListener("click", this.showYears.bind(this));
            this.yearValueNode.addEventListener("click", this.showDays.bind(this));
        }

        initDays(){
            for (let i = 0; i < 7; i++){  //initialising weekdays
                let newDiv = document.createElement("div");
                newDiv.className = "factual-dd__days_active";
                let newContent = document.createTextNode(this.weekdays[i]);
                newDiv.appendChild(newContent);
                this.weekdaysNode.appendChild(newDiv);
            }
        }

        initEmptyCells(amount, skippedDays, exists = false){
            if (exists){
                while(document.getElementsByClassName("factual-dd__cell").length > 0){  
                    document.getElementsByClassName("factual-dd__cell")[0].remove();}               
                }
            
            for (let i = 1; i <= amount; i++){ //initialising empty dates
                console.log("govno");
                let newDiv = document.createElement("div");
                newDiv.className = "factual-dd__cell";
                let newContent = document.createTextNode("");
                newDiv.appendChild(newContent);
                this.daysNode.appendChild(newDiv);
            }
            this.fillCurrentMonth(skippedDays);
        }

        fillCurrentMonth(skippedDays){
            let dayPointer = skippedDays;
            let nextDate = 0;
            let wholeMonthArr = Array.prototype.slice.call(document.getElementsByClassName("factual-dd__cell"));
            for (let i = 1; i <= this.date.getDate(); i++){
                wholeMonthArr[dayPointer].innerHTML = i;
                dayPointer++;
                nextDate = i + skippedDays;
            }
            this.fillLeftMonth(nextDate, wholeMonthArr, skippedDays);
        }

        fillLeftMonth(nextDate, wholeMonthArr, skippedDays){
            let dayIterator = 1;
            while(nextDate < wholeMonthArr.length){//filling the left out space with the next month
                wholeMonthArr[nextDate].innerHTML = dayIterator;
                dayIterator++;
                nextDate++;
            }
            this.fillLastMonth(wholeMonthArr, skippedDays)
        }
        
        fillLastMonth(wholeMonthArr, skippedDays){
            let lastDate = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 0).getDate();
            skippedDays--;
            while(skippedDays >= 0){
                wholeMonthArr[skippedDays].innerHTML = lastDate;
                skippedDays--;
                lastDate--;
                
            }
        }

        countSkippedDays(exists, firstDayOfTheMonth){//finding the first day of the month corresponding it to the day of the week
            let dayPointer = 0;
            let skippedDays = 0;
            let numberdayweek = [6,0,1,2,3,4,5];
            //console.log(numberdayweek[first]);
            let currDay = this.date.getDay();
            console.log(this.date);
            console.log("First day of the month" + currDay);
            let extended = false;
            const factualDD = document.getElementsByClassName("factual-dd__container").item(0);
            while (currDay !== dayPointer){
                dayPointer++;
                skippedDays++;
            }
            let requiredDays = this.date.getDate() + skippedDays;
            console.log("required days = " + requiredDays);
            if (requiredDays > 35){
                factualDD.parentElement.className = "factual-dd_extended";
                this.initEmptyCells(42, skippedDays, exists);
                extended = true;
                console.log("require days > 35");
            }
            else{
                factualDD.parentElement.className = "factual-dd";
                extended = false;
                this.initEmptyCells(35, skippedDays, exists);
                console.log("require days < 35");
            }
        }


        showNextMonth(){
            this.date.setMonth(this.date.getMonth() + 2);
            this.date.setDate(1);
            let firstDayOfTheMonth = this.date.getDay();
            this.date.setDate(0);
            console.log(this.date);
            let exists = true;
            this.countSkippedDays(exists, firstDayOfTheMonth);
            
        }

        showPreviousMonth(){

        }

        showMonths(){
            this.daysNode.classList.replace("factual-dd__days_active","factual-dd__days");
            this.weekdaysNode.classList.replace("factual-dd__weekdays_active","factual-dd__weekdays");
            this.dayValueNode.classList.replace("factual-dd__day-value_active","factual-dd__day-value");
            this.monthValueNode.classList.replace("factual-dd__month-value","factual-dd__month-value_active");
            this.monthsNode.classList.replace("factual-dd__months","factual-dd__months_active");
            this.acceptButton.classList.replace("factual-dd__accept","factual-dd__accept_hidden");
            this.clearButton.classList.replace("factual-dd__clear","factual-dd__clear_hidden");
        }

        showYears(){
            this.monthValueNode.classList.replace("factual-dd__month-value_active","factual-dd__month-value" );
            this.yearValueNode.classList.replace("factual-dd__year-value","factual-dd__year-value_active");
            this.yearValueNode.classList.replace("factual-dd__year-value","factual-dd__year-value_active");
            this.monthsNode.classList.replace("factual-dd__months_active","factual-dd__months");
            this.yearNode.classList,replace("factual-dd__years", "factual-dd__years_active");

        }

        showDays(){
            this.yearValueNode.classList.replace("factual-dd__year-value_active","factual-dd__year-value");
            this.dayValueNode.classList.replace("factual-dd__day-value","factual-dd__day-value_active");
            this.daysNode.classList.replace("factual-dd__days","factual-dd__days_active");
            this.weekdaysNode.classList.replace("factual-dd__weekdays","factual-dd__weekdays_active");
            this.yearNode.classList,replace("factual-dd__years_active","factual-dd__years");
        }

    }
    let button1 = new DropdownToggler(parameters, 0);
    let button2 = new DropdownToggler(parameters, 1);
    let calendar = new Calendar();
    calendar.initDays();
    calendar.countSkippedDays();

    

})();