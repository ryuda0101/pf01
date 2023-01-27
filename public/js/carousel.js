// carousel 움직여질 태그
const ca_move = document.querySelector("#main_page .news .center .boxs .view");
const prevBtn = document.querySelector("#main_page .news .center .boxs .btns .left");
const nextBtn = document.querySelector("#main_page .news .center .boxs .btns .right");

// 화면 사이즈에 따라 marginLeft, 원위치되는 수차값 변경되는 함수 세팅
let prevChangeMargin;
let setMargin;

let browserSizeCheck = () => {
    if (window.matchMedia("screen and (min-width:1201px)").matches) {
        // 이전버튼 클릭 시 이동되는 거리 값
        prevChangeMargin = "-50%";
        // 이동 후 원위치되는 수치값
        setMargin = "-25%";
    }
    else if (window.matchMedia("screen and (max-width:1200px) and (min-width:1001px)").matches) {
        prevChangeMargin = "-66.666666%";
        setMargin = "-33.333333%";
    }
    else if (window.matchMedia("screen and (max-width:1000px) and (min-width:769px)").matches) {
        prevChangeMargin = "-100%";
        setMargin = "-50%";
    }
    else if (window.matchMedia("screen and (max-width:768px)").matches) {
        prevChangeMargin = "-200%";
        setMargin = "-100%";
    }
    ca_move.style.marginLeft = setMargin;
}


// 리사이즈 / 로드 했을 때 원위치 되는 값 ca_move에 적용
window.addEventListener("resize",() => {
    // 웹브라우저 창 크기 조절시 조건문 체크
    // prevChangeMargin 과 setMargin 값이 변경 처리
    browserSizeCheck();
});

// 리사이즈 / 로드 했을 때 원위치 되는 값 ca_move에 적용
window.addEventListener("load",() => {
    // 웹브라우저 화면 로딩 후 조건문 체크
    // prevChangeMargin 과 setMargin 값이 변경 처리
    browserSizeCheck();
});


// prev 클릭시 carousel 이동 후 순서 교체후 원위치 시키는 작업까지
prevBtn.addEventListener("click",() => {
    // 클릭 후 이동할때에는 transition으로 부드럽게 이동되도록 해준다.
    ca_move.style.transition = "all 0.5s";
    ca_move.style.marginLeft = prevChangeMargin;
    // 버튼 클릭시 이전, 이후버튼 잠시 안보여졌다가 다시 나타나도록 
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    // 이전버튼 클릭시 첫번째 자식요소 선택
    let fchild = ca_move.firstElementChild;
    // 700초 뒤에 아래 기능들 실행
    setTimeout(() => {
        // 첫번째 자식 요소를 마지막번째로 보내줌
        ca_move.append(fchild);
        // 이동 후 순서 교체후 원위치 될때는 transition을 none으로 처리해서 거꾸로 움직이는 동작이 생략된것처럼 보여지게된다.
        ca_move.style.transition = "none";
        // 버튼 클릭시 이전, 이후버튼 잠시 안보여졌다가 다시 나타나도록 
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
        ca_move.style.marginLeft = setMargin;
    },700)
});

// next 클릭시 carousel 이동 후 순서 교체후 원위치 시키는 작업까지
nextBtn.addEventListener("click",() => {
    // 클릭 후 이동할때에는 transition으로 부드럽게 이동되도록 해준다.
    ca_move.style.transition = "all 0.5s";
    ca_move.style.marginLeft = "0";
    // 버튼 클릭시 이전, 이후버튼 잠시 안보여졌다가 다시 나타나도록 
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    // 이후버튼 클릭시 마지막 자식요소 선택
    let lchild = ca_move.lastElementChild;
    // 700초 뒤에 아래 기능들 실행
    setTimeout(() => {
        // 첫번째 자식 요소를 마지막번째로 보내줌
        ca_move.prepend(lchild);
        // 이동 후 순서 교체후 원위치 될때는 transition을 none으로 처리해서 거꾸로 움직이는 동작이 생략된것처럼 보여지게된다.
        ca_move.style.transition = "none";
        // 버튼 클릭시 이전, 이후버튼 잠시 안보여졌다가 다시 나타나도록 
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
        ca_move.style.marginLeft = setMargin;
    },700)
});