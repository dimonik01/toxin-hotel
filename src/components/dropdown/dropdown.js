(function(){
    let plusCollection = document.getElementsByClassName("dropdown-list__plus");
    let minusCollection = document.getElementsByClassName("dropdown-list__minus");
    let accomodationCollection = document.getElementsByClassName("dropdown-list__quantity");


    for (let i = 0; i < plusCollection.length; i++){
        plusCollection.item(i).addEventListener("click", plusHandler);
        minusCollection.item(i).addEventListener("click", minusHandler);
        accomodationCollection.item(i).count = 0;
    }
        
    function plusHandler(event){
        if (event.target == "dropdown-list__plus"){
            console.log("test complete");
        }


        accomodationCollection.item(this).count++;
        this.previousSibling.innerHTML = accomodationCollection.item(this).count;
    }

    function minusHandler(){
        console.log(this.count);
        this.count--;
        this.nextElementSibling.innerHTML = this.count;
    }

})() 


