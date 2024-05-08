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
            this.weekdays = ["ПН","ВТ","СР","ЧТ","ПН","СБ","ВС"];
            this.date = new Date(2019, 2, 0);
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
            this.nextMonth.addEventListener("click", this.showPreviousMonth.bind(this));
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

        initEmptyCells(){
            for (let i = 1; i <= 35; i++){ //initialising empty dates
                let newDiv = document.createElement("div");
                newDiv.className = "factual-dd__cell";
                let newContent = document.createTextNode("");
                newDiv.appendChild(newContent);
                this.daysNode.appendChild(newDiv);
            } 
            this.initMonth();
        }

        initMonth(){
            let currentMonthDate = this.date;
            let nextDate;
            let lastDate = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 0).getDate();
            let wholeMonthArr = Array.prototype.slice.call(document.getElementsByClassName("factual-dd__cell"));
            console.log(lastDate);
            console.log(this.date);
            let currDay = currentMonthDate.getDay();
            console.log("first day of the month = "+currDay);
            let dayPointer = 0;
            let skippedDays = 0;
            let dayIterator = 1;
            while (currDay !== dayPointer){//finding the first day of the month corresponding it to the day of the week
                dayPointer++;
                skippedDays++;
            }
            skippedDays--;
            console.log("amount of days in the month"+currentMonthDate.getDate());
            for(let i = 1; i <= currentMonthDate.getDate(); i++){//filling the current month
                wholeMonthArr[dayPointer].innerHTML = i;
                dayPointer++;
                nextDate = i + skippedDays;
            }
            while(nextDate < wholeMonthArr.length){//filling the left out space with the next month
                wholeMonthArr[nextDate].innerHTML = dayIterator;
                dayIterator++;
                nextDate++;
            }
            console.log("the amount of skipped days " + skippedDays);
            while(skippedDays >= 0){//filling the last month 
                wholeMonthArr[skippedDays].innerHTML = lastDate;
                skippedDays--;
                lastDate--;
                
            }

        }

        showNextMonth(){
            let oldMonth = document.getElementsByClassName("factual-dd__cell");
            while(oldMonth.length) {oldMonth[0].remove();}
            this.date.setMonth(this.date.getMonth() + 2);
            this.date.setDate(0);
            this.initEmptyCells();
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
    calendar.initEmptyCells();
    

})();