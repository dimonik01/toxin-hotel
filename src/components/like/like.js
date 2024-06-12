(function(){
    const likeCollection = document.getElementsByClassName("like__button");
    class Like{
        constructor(node){
            this.likeButton = document.getElementsByClassName("like__button").item(node);
            this.likeButtonContent = document.getElementsByClassName("like__button-count").item(node);
            this.likeCount = Number.parseInt(this.likeButtonContent.innerHTML);
            console.log(this.likeCount);
            this.state = this.likeButton.getAttribute("isOn");
            this.likeButton.addEventListener("click", this.likeHandler.bind(this));
        }
        likeHandler(){
            if (this.state == "true"){
                this.state = "false";
                this.likeCount = this.likeCount - 1;
                this.likeButtonContent.innerHTML = this.likeCount;
                this.likeButton.classList.replace("like__button_on","like__button_off");
                this.likeButtonContent.classList.replace("like__button-count_on","like__button-count_off");
                this.likeButton.setAttribute("isOn", "false");
            }
            else{
                this.state = "true";
                this.likeCount = this.likeCount + 1;
                this.likeButtonContent.innerHTML = this.likeCount;
                this.likeButton.classList.replace("like__button_off","like__button_on");
                this.likeButtonContent.classList.replace("like__button-count_off","like__button-count_on");
                this.likeButton.setAttribute("isOn", "true");
            }
        }
    }
    let objArr = new Array(10);
    for (let i = 0; i < likeCollection.length; i++){
        objArr[i] = new Like(i);
    }

    
    
})();