(function(){
    class Range{
        constructor(node){
            this.first = document.getElementsByClassName("range__slider-dot_first").item(node);
            this.second = document.getElementsByClassName("range__slider-dot_second").item(node);
            this.first.addEventListener("mousedown", this.rangeHandler.bind(this));
            this.first.addEventListener("mouseup", this.removeHandler.bind(this));
            console.log(this);
        }
        rangeHandler(e){
            console.log("mousedown");
            this.first.addEventListener("mousemove", this.move.bind(this));
            console.log(this);
            
            console.log("event removed");
        }

        removeHandler(){
            this.first.removeEventListener("mousemove", this.move.bind(this));
            console.log(this);
            console.log("removed");
        }

        move(){
            this.first.removeEventListener("mousemove", this.move.bind(this));
            console.log(this);
            console.log("moved");
            
        }
    }
    let range = new Range(0);
})();