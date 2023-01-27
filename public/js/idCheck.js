let idInput = document.querySelector("#login_page .center .loginForm .line .userid");
let passInput = document.querySelector("#login_page .center .loginForm .line .userpass");

let idCheckShow = document.querySelector("#login_page .center .loginForm .line .idCheck");
let passCheckShow = document.querySelector("#login_page .center .loginForm .line .passCheck");

let joinBtn = document.querySelector("#login_page .center .loginForm .btns button");

let id_last_check = false;
let pass_last_check = false;

idInput.addEventListener("keyup",() => {
    let idValue = idInput.value;

    let idcheckTest = /^\w{6,12}$/;

    let idLastCheck = idcheckTest.test(idValue);

    if (idLastCheck) {
        idCheckShow.innerHTML = "아이디를 형식에 맞게 입력하셨습니다."
        id_last_check = true;
    }
    else {
        idCheckShow.innerHTML = "아이디는 6글자에서 12글자 사이의 영문 대소문자, 숫자, 특수문자 _만 사용할 수 있습니다."
        id_last_check = false;
    }
});

passInput.addEventListener("keyup",() => {
    let passValue = passInput.value;
    
    let passcheckTest = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    
    let passLastCheck = passcheckTest.test(passValue);
    
    if (passLastCheck) {
        passCheckShow.innerHTML = "비밀번호를 형식에 맞게 입력하셨습니다."
        pass_last_check = true;
    }
    else {
        passCheckShow.innerHTML = "비밀번호는 8자리 이상 25자리 이하의 영문 대소문자, 숫자, 특수문자 !@#$%^*+=-_ 를 조합해서 사용해야 합니다."
        pass_last_check = false;
    }
});

joinBtn.addEventListener("click",(event) => {
    if (id_last_check == false || pass_last_check == false){
        event.preventDefault();
        alert("아이디와 비밀번호가 형식에 맞는지 다시한번 확인해 주세요")
    }
})