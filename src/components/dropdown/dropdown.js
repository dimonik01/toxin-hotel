(function(){
    let plusCollection = document.getElementsByClassName("dropdown-list__plus");
    let minusCollection = document.getElementsByClassName("dropdown-list__minus");
    let accomodationCollection = document.getElementsByClassName("dropdown-list__quantity");


    for (let i = 0; i < plusCollection.length; i++){
        plusCollection.item(i).count = 0;
        plusCollection.item(i).addEventListener("click", counter(this.item(i).count));
        minusCollection.item(i).addEventListener("click", counter);
        //accomodationCollection.item(i).count = 0;
    }
        
    function countHandler(event){
        if (event.target.attributes.class.nodeValue == "dropdown-list__plus"){
            console.log("win");
            return event
        }
        console.log(event);
        accomodationCollection.item(this).count++;
        this.previousSibling.innerHTML = accomodationCollection.item(this).count;
    }

    function counter(count) {
        return function(event){
            console.log(event);
            let count = 0;
        console.log(count);
        if (event.target.attributes.class.nodeValue == "dropdown-list__plus")
            {return count++}
        else {return count--}
        
        }
        
      }


})() 


