// 변수세팅
const rooms = document.querySelector("#slideWrap .view");

const btn = document.querySelectorAll("#slideWrap .circle_btns span");
const left_btn = document.querySelector("#slideWrap .view .left");
const right_btn = document.querySelector("#slideWrap .view .right");

let sNumber = 0;

for(let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click",function(){
        btn.forEach(function(el,index){
            el.classList.remove("on");
        });
        btn[i].classList.add("on")
        sNumber = i;
        rooms.style.marginLeft = -100 * sNumber + "%";
    });
}

left_btn.addEventListener("click",function(el,index){
    if(sNumber == 0){
        sNumber = rooms.querySelectorAll(".box").length - 1;
    }
    else {
        sNumber--;
    }
    btn.forEach(function(el,index){
        el.classList.remove("on");
    });
    btn[sNumber].classList.add("on")
    rooms.style.marginLeft = -100 * sNumber + "%";
});

right_btn.addEventListener("click",function(el,index){
    if(sNumber == rooms.querySelectorAll(".box").length - 1){
        sNumber = 0;
    }
    else {
        sNumber++;
    }
    btn.forEach(function(el,index){
        el.classList.remove("on");
    });
    btn[sNumber].classList.add("on")
    rooms.style.marginLeft = -100 * sNumber + "%";
});