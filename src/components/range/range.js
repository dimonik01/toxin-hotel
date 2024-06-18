(function(){
    class Range{
        constructor(node){
            this.first = document.getElementsByClassName("range__slider-dot_first").item(node);
            this.second = document.getElementsByClassName("range__slider-dot_second").item(node);
            this.firstCoords = this.first.getBoundingClientRect().x;
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
                let isOn = false;
                function removeHandler(f){
                    if (this.listenerAssigned == true){
                        window.removeEventListener("mouseup", unbound, false);
                    }
                    window.removeEventListener("mousemove", bound, false);
                    this.listenerAssigned = false;
                    this.firstCoords = this.first.getBoundingClientRect().x;
                    this.secondCoords = this.second.getBoundingClientRect().x;
                    console.log("removed");
                    console.log(this.firstCoords + " <= " + this.secondCoords);
                    
                }
                function move(f){
                    if (this.secondCoords > 600 && isOn == false){
                        document.getElementsByClassName("pro").item(0).className = "pro_on";
                        isOn = true
                    }
                    if (this.firstCoords <= this.secondCoords - 16){
                        if (this.moveCount >= 1){
                            e.finalTarget.style.left = f.pageX + 'px';
                            this.moveCount = 0;
                            this.firstCoords = this.first.getBoundingClientRect().x;
                            this.secondCoords = this.second.getBoundingClientRect().x;
                            console.log("default");
                            console.log(this.firstCoords + " <= " + this.secondCoords);
                        }
                    }
                    else{
                        if (e.finalTarget == this.first){
                            if(f.clientX < this.firstCoords){
                                if (this.moveCount >= 1){
                                    e.finalTarget.style.left = f.pageX + 'px';
                                    this.moveCount = 0;
                                    this.firstCoords = this.first.getBoundingClientRect().x;
                                    console.log("first non-default");
                                    console.log("bigger");
                                }
                            }
                            else {
                                e.finalTarget.style.left = this.secondCoords - 16 + 'px';
                                console.log("else first");
                            }
                        }
                        else{
                            if(f.clientX - 16 > this.firstCoords){
                                if (this.moveCount >= 1){
                                    e.finalTarget.style.left = f.pageX + 'px';
                                    this.moveCount = 0;
                                    this.secondCoords = this.second.getBoundingClientRect().x;
                                    console.log("second non-default");
                                    console.log(f.clientX - 16 + ">" + this.firstCoords);
                                }
                            }
                            else {
                                e.finalTarget.style.left = this.firstCoords + 16  + 'px';
                                console.log("else second");
                            }
                        }
                            
                    }
                    this.moveCount++;
                }
            }
    }
    let range = new Range(0);
})();