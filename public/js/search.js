const search_input = document.querySelector("#brd_list .center .search_menu #searchInput");
const search_btn = document.querySelector("#brd_list .center .search_menu button");

search_btn.addEventListener("click",function(event){
    search_value = search_input.value;
    search_value = search_value.trim();
    if (search_value === "") {
        event.preventDefault();
        alert("검색창에는 한글자 이상의 글자가 들어가야 합니다.");
    }
});
