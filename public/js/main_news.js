// 변수세팅
const customer = document.querySelector("#main_page .news .boxs .view");

const left_btn = document.querySelector("#main_page .news .btns .left");
const right_btn = document.querySelector("#main_page .news .btns .right");

let sNumber = 0;

left_btn.addEventListener("click",function(){
    console.log(customer.querySelectorAll(".box").length);
    if(sNumber == 0){
        sNumber = customer.querySelectorAll(".box").length - 4;
    }
    else {
        sNumber--;
    }
    customer.style.marginLeft = -25 * sNumber + "%";
});

right_btn.addEventListener("click",function(){
    // if(sNumber == 2){
    if(sNumber == customer.querySelectorAll(".box").length - 4){
        sNumber = 0;
    }
    else {
        sNumber++;
    }
    customer.style.marginLeft = -25 * sNumber + "%";
    console.log(sNumber);
});