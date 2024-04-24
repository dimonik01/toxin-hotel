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
            console.log("Masya is the BEST!!!!!!");
        }
    }
    let button1 = new DropdownToggler(parameters, 0);
    let button2 = new DropdownToggler(parameters, 1);

})()