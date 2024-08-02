(function(){
    class Toggle{
        constructor(node){
            this.toggle = document.getElementsByClassName("real-toggle__icon").item(node);
            this.state = this.toggle.getAttribute("enabled");
            console.log(this.toggle);
            console.log(this.state);
            this.toggle.addEventListener("click", this.toggleHandler.bind(this));
        }
        toggleHandler(){
            if (this.state == "true"){
                this.state = "false";
                this.toggle.classList.replace("real-toggle__icon_enabled","real-toggle__icon_disabled");
                this.toggle.setAttribute("enabled", "false");
            }
            else{
                this.state = "true";
                this.toggle.classList.replace("real-toggle__icon_disabled","real-toggle__icon_enabled");
                this.toggle.setAttribute("enabled", "true");
            }
        }
    }
    let toggleQuantity = document.getElementsByClassName("toggle");
    let toggleArr = [];
    for (let i = 0; i < toggleQuantity.length; i++){
        toggleArr[i] = new Toggle(i);
    }
})();