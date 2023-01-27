// 변수세팅
const customer = document.querySelector("#about_us .customers");

const btn = document.querySelectorAll("#about_us .btns span");

let sNumber = 0;

for(let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click",function(){
        btn.forEach(function(el,index){
            el.classList.remove("on");
        });
        btn[i].classList.add("on")
        sNumber = i;
        customer.style.left = -100 * sNumber + "%";
    });
}
