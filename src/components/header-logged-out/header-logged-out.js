(function(){
class Mobile{
    constructor(){
        this.button = document.getElementsByClassName("header-logged-out__menu_inactive").item(0);
        this.active = false;
        this.menu = document.getElementsByClassName("header-logged-out__mobile-menu").item(0);
        this.submenu = document.getElementsByClassName("mobile_hidden").item(0);
        this.list = document.getElementsByClassName("mobile__list_hidden").item(0);
        this.button.addEventListener("click", this.menuHandler.bind(this));
    }
    menuHandler(){
        console.log("done");
        if (this.active == false){
            this.menu.classList.replace("header-logged-out__mobile-menu_inactive", "header-logged-out__mobile-menu_active");
            this.submenu.classList.replace("mobile_hidden","mobile");
            this.list.classList.replace("mobile__list_hidden","mobile__list");
            this.active = true;
            console.log("false");
        }
        else{
            this.menu.classList.replace("header-logged-out__mobile-menu_active","header-logged-out__mobile-menu_inactive");
            this.submenu.classList.replace("mobile","mobile_hidden");
            this.list.classList.replace("mobile__list","mobile__list_hidden");
            this.active = false;
            console.log("true");
        }
        
        
    }
}
let menu = new Mobile();
})();

//13 05 паспорт