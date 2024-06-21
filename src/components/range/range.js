(function(){
    class Range{
        constructor(node){
            this.range = document.getElementsByClassName("range__slider").item(node);
            this.rangeCoords = this.range.getBoundingClientRect();
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
                const bound = moveHandler.bind(this);
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
                function moveHandler(f){
                    if (this.firstCoords <= this.secondCoords - 16){
                        if (this.moveCount >= 1){
                            console.log(this.firstCoords + "  " + this.rangeCoords.left);
                            console.log(this.secondCoords + "  " + this.rangeCoords.right);
                            move.call(this, e.finalTarget, f);
                            boundsCheck.call(this, e.finalTarget, f);
                        }
                    }
                    else{
                        if (e.finalTarget == this.first){
                            if(f.clientX < this.firstCoords){
                                if (this.moveCount >= 1){
                                    move.call(this, e.finalTarget, f);
                                    boundsCheck.call(this, e.finalTarget, f);
                                }
                            }
                            else {
                                e.finalTarget.style.left = this.secondCoords - 16 - this.rangeCoords.x + 'px';
                                console.log("else first");
                            }
                        }
                        else{
                            if(f.clientX - 16 > this.firstCoords){
                                if (this.moveCount >= 1){
                                    move.call(this, e.finalTarget, f);
                                    boundsCheck.call(this, e.finalTarget, f);
                                }
                            }
                            else {
                                e.finalTarget.style.left = this.firstCoords + 16 - this.rangeCoords.x + 'px';
                                console.log("else second");
                            }
                        }
                                         
                    }
                    this.moveCount++;
                    function move(finalTarget, f){
                        console.log(this);
                        console.log("triggered");
                        console.log(finalTarget);
                        console.log(f);
                        finalTarget.style.left = f.pageX - this.rangeCoords.x + 'px';
                        this.moveCount = 0;
                        this.firstCoords = this.first.getBoundingClientRect().x;
                        this.secondCoords = this.second.getBoundingClientRect().x;
                    }
                    
                    function boundsCheck(finalTarget, f){
                        if (finalTarget == this.first){
                            if (this.firstCoords <= this.rangeCoords.left - 6){
                                console.log("left bounds" + finalTarget.style.left + "  " + this.rangeCoords.left);
                                console.log(finalTarget);
                                finalTarget.style.left = -6 + "px"
                                console.log("left bounds" + finalTarget + "  " + this.rangeCoords.left);
                            }
                        }
                        else{
                            console.log("range right =  " + this.rangeCoords.right);
                            if (this.secondCoords >= this.rangeCoords.right - 16){
                                console.log("right bounds" + finalTarget.style.left + "  " + this.rangeCoords.right);
                                console.log(finalTarget);
                                finalTarget.style.left = this.rangeCoords.right - this.rangeCoords.left - 16 + "px";
                                console.log("right bounds" + finalTarget + "  " + this.rangeCoords.right);
                            }
                        }
                    }
                }

            }
    }
    let range = new Range(0);
})();