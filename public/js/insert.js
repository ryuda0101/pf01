let titleValue = document.querySelector("#brd_insert .center form .line .title");
let contextValue = document.querySelector("#brd_insert .center form textarea");

let sendBtn = document.querySelector("#brd_insert .center form button");



sendBtn.addEventListener("click",(event) => {
    if (titleValue.value.length == 0 || contextValue.value.length == 0){
        event.preventDefault();
        alert("제목과 내용은 반드시 기입하여야 합니다.")
        console.log(titleValue.value.length);
    }
})