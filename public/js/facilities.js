// 정렬시킬 대상들을 감싸는 부모명 선택
let Wrap = document.querySelector(".facilities .boxs");
let iso = new Isotope(Wrap, {
    itemSelector:".box",
    percentPosition: true,
    layoutMode: 'masonry',
    masonry: {
        columnWidth: 10,
        gutter: 10
    }
});

imagesLoaded( Wrap ).on( 'progress', function() {
    // layout Isotope after each image loads
    iso.layout();
    const isotopeBtns = document.querySelectorAll(".facilitiesBtns li");
    const isotopeBtnsSpan = document.querySelectorAll(".facilitiesBtns li span");
    
    // 버튼 활성 / 비활성화 작업
    isotopeBtns.forEach(function(element,index){
        element.addEventListener("click",function(){
            // 메뉴클릭시 속성값 가져오기
            // getAttribute → 속성값 가져오는 명령어
             let data = element.getAttribute("data-facilities")
            // 클릭시 가지고온 속성값에 해당하는 태그들만 재배치
            iso.arrange({
                filter:data,
                // 속도 조절하는 옵션
                transitionDuration: '1s'
            });

            isotopeBtns.forEach((item,index)=>{
                item.classList.remove("on");
            })
            element.classList.add("on");
        });
    });
});

// 클릭시 해당 태그의 속성값 가져오기