(function(){
    class Range{
        constructor(node){
            this.first = document.getElementsByClassName("range__slider-dot_first").item(node);
            this.second = document.getElementsByClassName("range__slider-dot_second").item(node);
            this.firstCoords = this.first.getBoundingClientRect().x;
            console.log("coords" + this.first.getBoundingClientRect().x);
            this.secondCoords = this.second.getBoundingClientRect().x;
            this.listenerAssigned = false;
            this.moveCount = 0;
            this.first.addEventListener("mousedown", this.rangeHandler.bind(this), false);  
            this.second.addEventListener("mousedown", this.rangeHandler.bind(this), false);
        }
            rangeHandler(e){
                e.preventDefault();
                const bound = move.bind(this);
                const unbound = removeHandler.bind(this);
                if (e.target.className == "range__slider-dot range__slider-dot_first"){
                    e.finalTarget = this.first;
                }
                if(e.target.className == "range__slider-dot range__slider-dot_second"){
                    e.finalTarget = this.second;
                }
                window.addEventListener("mouseup", unbound, false);
                window.addEventListener("mousemove", bound, false);
                this.listenerAssigned = true;
                console.log("assigned");
                function removeHandler(f){
                    console.log(e.target);
                    if (this.listenerAssigned == true){
                        window.removeEventListener("mouseup", unbound, false);
                    }
                    window.removeEventListener("mousemove", bound, false);
                    this.listenerAssigned = false;
                    this.firstCoords = this.first.getBoundingClientRect().x;
                    this.secondCoords = this.first.getBoundingClientRect().x;
                    console.log(e.finalTarget);
                    console.log("removed");
                }
                function move(f){
                    console.log(e.target.className);
                    console.log(this);
                    console.log(this.firstCoords);
                    if (this.firstCoords <= this.secondCoords - 16){
                        if (this.moveCount >= 1){
                            e.finalTarget.style.left = f.pageX + 'px';
                            this.moveCount = 0;
                        }
                    }
                    else{
                        console.log(e.clientX);
                        console.log("first coords = " + this.firstCoords);
                        if (e.finalTarget == this.first){
                            if(f.clientX < this.firstCoords){
                                if (this.moveCount >= 1){
                                    e.finalTarget.style.left = f.pageX + 'px';
                                    this.moveCount = 0;
                                    console.log("bigger");
                                }
                            }
                        }
                        else{
                            if(f.clientX - 16 > this.firstCoords){
                                if (this.moveCount >= 1){
                                    e.finalTarget.style.left = f.pageX + 'px';
                                    this.moveCount = 0;
                                    console.log("bigger");
                                }
                            }
                        }
                            
                    }
                    console.log("moved");
                    this.moveCount++;
                    console.log(this.moveCount);
                    this.firstCoords = this.first.getBoundingClientRect().x;
                    this.secondCoords = this.second.getBoundingClientRect().x;
                    console.log("e.pageX = " + f.pageX); 
                    
                        
                }
            }
    }
    let range = new Range(0);
})();