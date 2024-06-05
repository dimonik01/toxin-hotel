(function(){
    class Checkbox{
        constructor(node){
            this.toggle = document.getElementsByClassName("checkbox-dropdown__ui").item(node);
            this.dropdown = this.toggle.nextElementSibling;
            this.toggleState = this.toggle.getAttribute("state");
            this.dropdownState = this.dropdown.getAttribute("state");
            this.toggle.addEventListener("click", this.toggleExpand.bind(this));
        }
        toggleExpand(){
            if (this.toggleState == "false"){
                this.dropdown.classList.remove("checkbox-dropdown__expand_closed");
                this.toggle.classList.replace("checkbox-dropdown__ui_closed", "checkbox-dropdown__ui_open")
                this.toggleState = "true";
                this.dropdownState = "true";
            } 
            else{
                this.dropdown.classList.add("checkbox-dropdown__expand_closed");
                this.toggle.classList.replace("checkbox-dropdown__ui_open", "checkbox-dropdown__ui_closed")
                this.toggleState = "false";
                this.dropdownState = "false";
            } 
        }
    }
    let checkbox1 = new Checkbox(0);
    let checkbox2 = new Checkbox(1);
})();