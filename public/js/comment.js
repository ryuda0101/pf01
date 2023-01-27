const comment_input = document.querySelector("#brd_detail .center .comment #comment_form textarea");
const comment_btn = document.querySelector("#brd_detail .center .comment button");

comment_btn.addEventListener("click",function(event){
    let comment_value = comment_input.value;
    comment_value = comment_value.trim();
    if (comment_value === "") {
        event.preventDefault();
        alert("댓글을 입력해 주세요.");
    }
});

// 댓글 수정 버튼들 선택
const uptCom = document.querySelectorAll("#brd_detail .center .comment_box .update_comment");
// 댓글 수정 버튼을 클릭시 나올 폼태그
const comuptForm = document.querySelectorAll("#brd_detail .center .comupdate_form");
// 작성취소 버튼들 선택
const comCancel = document.querySelectorAll("#brd_detail .center .comupdate_form .comment_no");
// 댓글 수정 textarea 태그들 선택
const comContext = document.querySelectorAll("#brd_detail .center .comupdate_form .comContext");

// 작성 취소를 누르면 원래 댓글의 내용으로 리셋시키기 위한 변수 세팅
let originText = [];


// 반복문 사용해서 댓글수정 a태그에 클릭기능 이벤트 달아줌
for(let i = 0; i < uptCom.length; i++) {
    uptCom[i].addEventListener("click",function(event){
        event.preventDefault();
        // a태그 안보이게 처리
        uptCom[i].style.display = "none"
        // 폼태그 보이게 처리
        comuptForm[i].style.display = "block"
        // 해당 댓글수정 textarea태그의 텍스트를 변수에 대입
        originText[i] = comContext[i].value;
        
    });

    comCancel[i].addEventListener("click",function(){
        // 폼태그 안보이게 처리
        comuptForm[i].style.display = "none";
        // a태그 보이게 처리
        uptCom[i].style.display = "inline";
        // textarea태그의 텍스트 내용을 변수 안에 있는 텍스트로 교체
        comContext[i].value = originText[i];
    });
}