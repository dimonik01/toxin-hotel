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
            this.date = new Date(2019, 1, 0);
            this.numberdayweek = [6,0,1,2,3,4,5];
            this.titleMonths = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
            this.months = document.getElementsByClassName("factual-dd__month");
            this.firstChosen = null;
            this.secondChosen = null;
            this.listenerAssigned = false;
            for (let i = 0; i < 12; i++){
                this.months.item(i).setAttribute(`month-number`, i);
                this.months.item(i).addEventListener("click", this.chooseMonth.bind(this));
                this.months.item(i).addEventListener("click", this.showDays.bind(this));
            };
            this.years = document.getElementsByClassName("factual-dd__year");
            this.defaultYear = 2009;
            for (let i = 0; i < 12; i++){
                this.years.item(i).setAttribute(`year-number`, this.defaultYear);
                this.years.item(i).addEventListener("click", this.showChosenYear.bind(this));
                this.years.item(i).addEventListener("click", this.chooseMonth.bind(this));
                this.years.item(i).addEventListener("click", this.showMonths.bind(this));
                this.defaultYear++;
            };
            this.defaultYear = 2009;
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
            this.nextMonth.setAttribute("type", "month-changer");
            this.previousMonth = document.getElementsByClassName("factual-dd__arrow-left").item(0);
            this.previousMonth.setAttribute("type", "month-changer");
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

        countSkippedDays(exists = false, firstDayOfTheMonth, manual = false){//finding the first day of the month corresponding it to the day of the week
            let dayPointer = 0;
            let skippedDays = 0;
            let currDay = this.date.getDay();
            for (let i = 0; i < 12; i++){
                this.months.item(i).className = "factual-dd__month";
                if(this.date.getMonth() == Number(this.months.item(i).getAttribute("month-number"))){
                    this.months.item(i).classList.add("factual-dd__month_selected");
                }
                if (this.date.getFullYear() == Number(this.years.item(i).getAttribute("year-number"))){
                    this.years.item(i).classList.add("factual-dd__year_selected");
                }
            }
            if (exists) {
                currDay = this.numberdayweek[firstDayOfTheMonth];
            }
            let extended = false;
            const factualDD = document.getElementsByClassName("factual-dd__container").item(0);
            while (currDay !== dayPointer){
                dayPointer++;
                skippedDays++;
            }
            let requiredDays = this.date.getDate() + skippedDays;
            if (requiredDays > 35){
                factualDD.parentElement.className = "factual-dd_extended";
                this.initEmptyCells(42, skippedDays, exists, manual);
                extended = true;
            }
            else{
                factualDD.parentElement.className = "factual-dd";
                extended = false;
                this.initEmptyCells(35, skippedDays, exists, manual);
            }
        }

        initEmptyCells(amount, skippedDays, exists = false, manual = false){
            if (exists || manual){
                while(document.getElementsByClassName("factual-dd__cell").length > 0){  
                    document.getElementsByClassName("factual-dd__cell")[0].remove();}               
                }
            
            for (let i = 1; i <= amount; i++){ //initialising empty dates
                let newDiv = document.createElement("div");
                newDiv.className = "factual-dd__cell";
                let newContent = document.createTextNode("");
                newDiv.appendChild(newContent);
                this.daysNode.appendChild(newDiv);
                newDiv.setAttribute("day-number", i);
                newDiv.addEventListener("click", this.markChosenDay.bind(this));
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
            let lastDate = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
            skippedDays--;
            while(skippedDays >= 0){
                wholeMonthArr[skippedDays].innerHTML = lastDate;
                skippedDays--;
                lastDate--;
                
            }
            this.changeDateTitle();
        }

        changeDateTitle(){
            this.dayValueNode.innerHTML = this.titleMonths[this.date.getMonth()] + " " + this.date.getFullYear();
            this.monthValueNode.innerHTML = this.date.getFullYear();
            this.yearValueNode.innerHTML = this.years.item(0).getAttribute("year-number") + " - " + this.years.item(11).getAttribute("year-number");
        }

        chooseMonth(e){
            this.date.setDate(1);
            this.date.setMonth(e.target.getAttribute("month-number"));
            this.date.setDate(1);
            let firstDayOfTheMonth = this.date.getDay();
            this.date.setMonth(this.date.getMonth() + 1);
            this.date.setDate(0);
            this.countSkippedDays(true, firstDayOfTheMonth, true);
        }

        initYearRange(direction){
            let yearMin = Number(this.years.item(0).getAttribute("year-number"));
            yearMin = yearMin - 12;
            let yearMax = Number(this.years.item(11).getAttribute("year-number"));
            let negativeIterator = yearMin - 12;
            while(document.getElementsByClassName("factual-dd__year").length > 0){  
                document.getElementsByClassName("factual-dd__year")[0].remove();
            }               
            for (let i = 0; i < 12; i++){
                let newDiv = document.createElement("div");
                newDiv.className = "factual-dd__year";
                let newContent = document.createTextNode("");
                newDiv.appendChild(newContent);
                this.yearNode.appendChild(newDiv);
                this.years.item(i).addEventListener("click", this.showChosenYear.bind(this));
                this.years.item(i).addEventListener("click", this.chooseMonth.bind(this));
                this.years.item(i).addEventListener("click", this.showMonths.bind(this));
                if (direction == false){
                    let result = yearMin + i;
                    this.years.item(i).innerHTML = result;
                    this.years.item(i).setAttribute(`year-number`, result);
                    this.defaultYear--;
                }
                else{
                    this.years.item(i).innerHTML = yearMax;
                    this.years.item(i).setAttribute(`year-number`, yearMax);
                    this.defaultYear++;
                    yearMax++;
                }
                
            }
            
        }
        

        showNextMonth(){
            if (this.nextMonth.getAttribute("type") == "month-changer"){
                this.date.setDate(1);
                this.date.setMonth(this.date.getMonth() + 1);
                let firstDayOfTheMonth = this.date.getDay();
                this.date.setMonth(this.date.getMonth() + 1);
                this.date.setDate(0);
                let exists = true;
                this.countSkippedDays(exists, firstDayOfTheMonth);
                if (this.years.item(11) == this.date.getFullYear()){
                    this.initYearRange(true);
                }
            }
            if (this.nextMonth.getAttribute("type") == "year-changer"){
                this.date.setFullYear(this.date.getFullYear() + 1);
                this.monthValueNode.innerHTML = this.date.getFullYear();
            }
            if (this.nextMonth.getAttribute("type") == "year-period-changer"){
                this.initYearRange(true);
                this.changeDateTitle();
            }
        }
            
        

        showPreviousMonth(){
            if (this.previousMonth.getAttribute("type") == "month-changer"){
                let oldYear = this.date.getFullYear();
                this.date.setDate(1);
                this.date.setMonth(this.date.getMonth() - 1);
                let firstDayOfTheMonth = this.date.getDay();
                this.date.setMonth(this.date.getMonth() + 1);
                this.date.setDate(0);
                let exists = true;
                this.countSkippedDays(exists, firstDayOfTheMonth);
                if (oldYear != this.date.getFullYear()){
                    this.initYearRange(true);
                }
            }
            if (this.previousMonth.getAttribute("type") == "year-changer"){
                this.date.setFullYear(this.date.getFullYear() - 1);
                this.monthValueNode.innerHTML = this.date.getFullYear();
            }
            if (this.previousMonth.getAttribute("type") == "year-period-changer"){
                this.initYearRange(false);
                this.changeDateTitle();
            }
        }

        markChosenDay(e){
            let cells = document.getElementsByClassName("factual-dd__cell");
            let firstChanged = false;
            if (this.firstChosen != undefined && this.secondChosen != undefined){
                for (let i = 0; i < cells.length; i++){
                    cells.item(i).classList.remove("factual-dd__chosen");
                }
                this.firstChosen = undefined;
                this.secondChosen = undefined;
                this.removeHighlightedCells();
            }
            if (this.firstChosen == undefined || this.secondChosen != undefined){
                this.removeChosen();
                this.firstChosen = e.target;
                e.target.classList.add("factual-dd__chosen");
                firstChanged = true;
            }
            if (this.firstChosen != undefined && firstChanged == false){
                this.secondChosen = e.target;
                e.target.classList.add("factual-dd__chosen");
            }
            let str = "test"
            if (this.listenerAssigned == false){
                for (let i = 0; i < cells.length; i++){
                    cells.item(i).addEventListener("mouseover", highlightCells.bind(this));
                    this.listenerAssigned = true; 
                }
            }
            function highlightCells(f){
                let cells = document.getElementsByClassName("factual-dd__cell");
                if (this.secondChosen != null){
                    f.target.removeEventListener("mouseover", highlightCells);
                    this.listenerAssigned = false;
                }
                else {
                    this.removeHighlightedCells();
                    if(Number(e.target.getAttribute("day-number")) > Number(f.target.getAttribute("day-number"))){
                        this.removeChosen();
                        e.target.classList.add("factual-dd__chosen_first-reverse");
                        e.target.classList.add("factual-dd__chosen");
                        f.target.classList.add("factual-dd__chosen_last-reverse");
                        for (let i = Number(f.target.getAttribute("day-number")); i < Number(e.target.getAttribute("day-number")) - 1; i++){
                            cells.item(i).classList.add("factual-dd__cell_highlighted");
                        }  
                    }
                    else {
                        this.removeChosen();
                        e.target.classList.add("factual-dd__chosen_first");
                        e.target.classList.add("factual-dd__chosen");
                        f.target.classList.add("factual-dd__chosen_last");
                        for (let i = Number(e.target.getAttribute("day-number")); i < Number(f.target.getAttribute("day-number")) - 1; i++){
                            cells.item(i).classList.add("factual-dd__cell_highlighted");
                        }  
                    }
                }    
            }
        }

        removeHighlightedCells(){
            let cells = document.getElementsByClassName("factual-dd__cell");
            for (let i = 0; i < document.getElementsByClassName("factual-dd__cell").length; i++){
                cells.item(i).classList.remove("factual-dd__cell_highlighted");
            }
        }

        removeChosen(){
            let cells = document.getElementsByClassName("factual-dd__cell");
            for (let i = 0; i < cells.length; i++){
                cells.item(i).classList.remove("factual-dd__chosen");
                cells.item(i).classList.remove("factual-dd__chosen_first");
                cells.item(i).classList.remove("factual-dd__chosen_last");
                cells.item(i).classList.remove("factual-dd__chosen_first-reverse");
                cells.item(i).classList.remove("factual-dd__chosen_last-reverse");
            }
        }

        showChosenYear(){
            this.date.setFullYear(Number(e.target.getAttribute("year-number")));

        }

        showMonths(){
            this.daysNode.classList.replace("factual-dd__days_active","factual-dd__days");
            this.weekdaysNode.classList.replace("factual-dd__weekdays_active","factual-dd__weekdays");
            this.dayValueNode.classList.replace("factual-dd__day-value_active","factual-dd__day-value");
            this.monthValueNode.classList.replace("factual-dd__month-value","factual-dd__month-value_active");
            this.monthsNode.classList.replace("factual-dd__months","factual-dd__months_active");
            this.yearNode.classList.replace("factual-dd__years_active","factual-dd__years");
            this.yearValueNode.classList.replace("factual-dd__year-value_active","factual-dd__year-value");
            this.acceptButton.classList.replace("factual-dd__accept","factual-dd__accept_hidden");
            this.clearButton.classList.replace("factual-dd__clear","factual-dd__clear_hidden");
            this.nextMonth.setAttribute("type", "year-changer");
            this.previousMonth.setAttribute("type", "year-changer");
        }

        showYears(){
            this.monthValueNode.classList.replace("factual-dd__month-value_active","factual-dd__month-value" );
            this.yearValueNode.classList.replace("factual-dd__year-value","factual-dd__year-value_active");
            this.yearValueNode.classList.replace("factual-dd__year-value","factual-dd__year-value_active");
            this.monthsNode.classList.replace("factual-dd__months_active","factual-dd__months");
            this.yearNode.classList.replace("factual-dd__years", "factual-dd__years_active");
            this.nextMonth.setAttribute("type", "year-period-changer");
            this.previousMonth.setAttribute("type", "year-period-changer");
        }

        showDays(){
            this.yearValueNode.classList.replace("factual-dd__year-value_active","factual-dd__year-value");
            this.monthValueNode.classList.replace("factual-dd__month-value_active","factual-dd__month-value");
            this.monthsNode.classList.replace("factual-dd__months_active","factual-dd__months");
            this.dayValueNode.classList.replace("factual-dd__day-value","factual-dd__day-value_active");
            this.daysNode.classList.replace("factual-dd__days","factual-dd__days_active");
            this.weekdaysNode.classList.replace("factual-dd__weekdays","factual-dd__weekdays_active");
            this.yearNode.classList.replace("factual-dd__years_active","factual-dd__years");
            this.acceptButton.classList.replace("factual-dd__accept_hidden","factual-dd__accept");
            this.clearButton.classList.replace("factual-dd__clear_hidden","factual-dd__clear");
            this.nextMonth.setAttribute("type", "month-changer");
            this.previousMonth.setAttribute("type", "month-changer");
        }
    }
    let button1 = new DropdownToggler(parameters, 0);
    let button2 = new DropdownToggler(parameters, 1);
    let calendar = new Calendar();
    calendar.countSkippedDays();
    calendar.initDays();
})();