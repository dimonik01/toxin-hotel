(function(){
    class Toggle{
        constructor(node){
            this.toggle = document.getElementsByClassName("real-toggle__icon").item(node);
            this.state = this.toggle.getAttribute("enabled");
            this.toggle.addEventListener("click", this.toggleHandler.bind(this));
            console.log(this.toggle);
            console.log(this.state);
        }
        toggleHandler(){
            if (this.state == "true"){
                this.state = "false";
                this.toggle.classList.replace("real-toggle__icon_enabled","real-toggle__icon_disabled");
                this.toggle.setAttribute("enabled", "false");
                console.log("true");
            }
            else{
                this.state = "true";
                this.toggle.classList.replace("real-toggle__icon_disabled","real-toggle__icon_enabled");
                this.toggle.setAttribute("enabled", "true");
                console.log("false");
            }
        }
    }
    let toggle1 = new Toggle(0);
    let toggle2 = new Toggle(1);
})()