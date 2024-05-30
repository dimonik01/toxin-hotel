/*(function(){
    class Checkbox{
        constructor(node){
            this.form = document.getElementsByClassName("checkbox__container").item(node).nextElementSibling;
            this.checkbox = document.getElementsByClassName("checkbox__expand").item(node);
            this.state = this.checkbox.getAttribute("state");
            console.log(node + " " +  this.state)
            this.checkbox.addEventListener("click", this.toggleExpand.bind(this));
        }
        toggleExpand(){
            if (this.state == "false"){
                this.form.className = "checkbox__dropdown_closed";
                this.state = "true";
            } 
            else{
                this.form.className = "checkbox__dropdown";
                this.state = "false";
            } 
        }
    }
    let checkbox1 = new Checkbox(0);
    let checkbox2 = new Checkbox(1);
})();*/