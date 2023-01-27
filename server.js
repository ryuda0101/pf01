// npm init
// npm install ejs express mongodb moment
// npm install express-session passport passport-local
// npm install multer

// 설치한것을 불러들여 그 안의 함수 명령어들을 쓰기위해 변수로 세팅
const express = require("express");
// 데이터베이스의 데이터 입력, 출력을 위한 함수명령어 불러들이는 작업
const MongoClient = require("mongodb").MongoClient;
// 시간 관련된 데이터 받아오기위한 moment라이브러리 사용(함수)
const moment = require("moment");
// 로그인 관련 데이터 받아오기위한 작업
// 로그인 검증을 위해 passport 라이브러리 불러들임
const passport = require('passport');
// Strategy(전략) → 로그인 검증을 하기 위한 방법을 쓰기 위해 함수를 불러들이는 작업
const LocalStrategy = require('passport-local').Strategy;
// 사용자의 로그인 데이터 관리를 위한 세션 생성에 관련된 함수 명령어 사용
const session = require('express-session');
// 게시글, 댓글 작성시 시간 한국시간으로 설정해서 넣는 함수 명령어 
const momentTimezone = require("moment-timezone");
// 파일업로드 라이브러리 multer
const multer  = require('multer')

const app = express();

// 포트번호 변수로 세팅
const port = process.env.PORT || 8080;
// const port = 8080;


// ejs 태그를 사용하기 위한 세팅
app.set("view engine","ejs");
// 사용자가 입력한 데이터값을 주소로 통해서 전달되는 것을 변환(parsing)
app.use(express.urlencoded({extended: true}));
// css나 img, js와 같은 정적인 파일 사용하려면 ↓ 하단의 코드를 작성해야한다.
app.use(express.static('public'));


// 로그인 관련 작언을 하기 위한 세팅
// 로그인 관련 작업시 세션을 생성하고 데이터를 기록할 때 세션 이름의 접두사 / 세션 변경시 자동저장 유무 설정
app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
// passport라이브러리 실행
app.use(passport.initialize());
// 로그인 검증시 세션데이터를 이용해서 검증하겠다.
app.use(passport.session());


// Mongodb 데이터 베이스 연결작업
// 데이터베이스 연결을 위한 변수 세팅 (변수의 이름은 자유롭게 지어도 ok)
let db;
// Mongodb에서 데이터베이스를 만들고 데이터베이스 클릭 → connect → Connect your application → 주소 복사, password에는 데이터베이스 만들때 썼었던 비밀번호를 입력해 준다.
MongoClient.connect("mongodb+srv://admin:qwer1234@testdb.g2xxxrk.mongodb.net/?retryWrites=true&w=majority",function(err,result){
    // 에러가 발생했을 경우 메세지 출력 (선택사항임. 안쓴다고 해서 문제가 되지는 않는다.)
    if(err){ return console.log(err);}

    // 위에서 만든 db변수에 최종적으로 연결 / ()안에는 mongodb atlas에서 생성한 데이터 베이스 이름 집어넣기
    db = result.db("testdb");

    // db연결이 제대로 되었다면 서버 실행
    app.listen(port,function(){
        console.log("서버연결 성공");
    });
});

// 메인 페이지
app.get("/",function(req,res){
    res.render("index",{userData:req.user});
})




// 게시글 목록 페이지
app.get("/brdlist",function(req,res){
    db.collection("board").find().toArray(function(err,result){
        res.render("brd_list",{userData:req.user, brdinfo:result});
    });
});

// 게시글 작성 페이지
app.get("/insert",function(req,res){
    db.collection("board").find().toArray(function(err,result){
        res.render("brd_insert",{userData:req.user, brdinfo:result});
    });
})

// 첨부파일 기능
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/files')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8'))
      }
})
const upload = multer({ storage: storage })

// 게시글 작성시 post로 db에 데이터 올리기
app.post("/add",upload.single('file'),function(req,res){

    if(req.file){
        fileUpload = req.file.originalname;
    }
    else{
        fileUpload = null;
    }


    db.collection("count").findOne({name:"게시글"},function(err,result){
        db.collection("board").insertOne({
            brd_id:result.totalBoard + 1,
            brd_name:req.user.joinnick,
            brd_email:req.body.email,
            brd_title:req.body.title,
            brd_number:req.body.number,
            brd_context:req.body.message,
            brd_date:moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss"),
            fileName:fileUpload
        },function(err,result){
            db.collection("count").updateOne({name:"게시글"},{$inc:{totalBoard:1}},function(err,result){
                res.redirect("/brdlist")
            });
        });
    });
});

// 게시글 수정 페이지
app.get("/edit/:no",function(req,res){
    db.collection("board").findOne({brd_id:Number(req.params.no)},function(err,result){
        res.render("brd_edit",{userData:req.user, brdinfo:result});
    });
})
// 게시글 수정 후 db에 데이터 새로 업데이트
app.post("/update",upload.single('file'),function(req,res){
    if(req.file){
        fileUpload = req.file.originalname;
    }
    else{
        fileUpload = req.body.originFile;
    }

    db.collection("board").updateOne({brd_id:Number(req.body.hidden)},{$set:{
        brd_name:req.user.joinnick,
        brd_email:req.body.email,
        brd_title:req.body.title,
        brd_number:req.body.number,
        brd_context:req.body.message,
        fileName:fileUpload
    }},function(err,result){
        res.redirect("/detail/" + Number(req.body.hidden));
    });
});

// 게시글 상세 페이지
app.get("/detail/:no",function(req,res){
    db.collection("board").findOne({brd_id:Number(req.params.no)},function(err,result1){
        db.collection("comment").find({comPrd:result1.brd_id}).toArray(function(err,result2){
            res.render("brd_detail",{userData:req.user, brdinfo:result1, commentData:result2});
        });
    });
});

// 게시글 삭제 페이지
app.get ("/delete/:no",function(req,res){
    db.collection("board").deleteOne({brd_id:Number(req.params.no)},function(err,result){
        res.redirect("/brdlist");
    });
});

// 검색기능
app.get("/search",function(req,res){
    let search = [
                    {
                        '$search': {
                            'index': 'board_search',
                            'text': {
                                query: req.query.searchInput,
                                path: req.query.search_menu
                            }
                        }
                    },{
                        $sort:{brdid:-1}
                    }
                ]
    db.collection("board").aggregate(search).toArray(function(err,result){
        res.render("brd_list",{userData:req.user, brdinfo:result});
    });
});

// 댓글 작성 후 db에 추가하는 post 요청
app.post("/addcomment",function(req,res){
    // 몇번 댓글인지 번호 부여하기 위한 작업
    db.collection("count").findOne({name:"댓글"},function(err,result1){
        // 해당 게시글의 번호값도 함께 부여해줘야 한다.
        db.collection("board").findOne({brd_id:Number(req.body.prdid)},function(err,result2){
            // comment 에 댓글을 집어넣기
            db.collection("comment").insertOne({
                comNo:result1.commentCount + 1,
                comPrd:result2.brd_id,
                comContext:req.body.comment_text,
                comAuther:req.user.joinnick,
                comDate:moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss")
            },function(err,result){
                db.collection("count").updateOne({name:"댓글"},{$inc:{commentCount:1}},function(err,result){
                    // 상세페이지에서 댓글 입력시 보내준 게시글 번호로 → 상세페이지 이동하도록 요청
                    res.redirect("/detail/" + req.body.prdid);
                })
            });
        });
    });
});

// 댓글 삭제 요청
app.get ("/deletecomment/:no",function(req,res){
    db.collection("comment").findOne({comNo:Number(req.params.no)},function(err,result1){
        db.collection("comment").deleteOne({comNo:Number(req.params.no)},function(err,result2){
            res.redirect("/detail/"+ result1.comPrd);
        })
    });
});

// 댓글 수정 요청
app.post("/updatecomment",function(req,res){
    db.collection("comment").findOne({comNo:Number(req.body.comNo)},function(err,result1){
        db.collection("comment").updateOne({comNo:Number(req.body.comNo)},{$set:{
            comContext:req.body.comContext
        }},function(err,result2){
            res.redirect("/detail/"+ result1.comPrd);
        })
    });
});

// 서브페이지01
app.get("/about_us",function(req,res){
    res.render("subPage_about_us",{userData:req.user});
});

// 서브페이지02 / junior_suite
app.get("/junior_suite",function(req,res){
    res.render("roomPage_junior_suite",{userData:req.user});
});
// 서브페이지03 / family_room
app.get("/family_room",function(req,res){
    res.render("roomPage_family_room",{userData:req.user});
});
// 서브페이지04 / double_room
app.get("/double_room",function(req,res){
    res.render("roomPage_double_room",{userData:req.user});
});
// 서브페이지05 / deluxe_room
app.get("/deluxe_room",function(req,res){
    res.render("roomPage_deluxe_room",{userData:req.user});
});
// 서브페이지06 / superior_room
app.get("/superior_room",function(req,res){
    res.render("roomPage_superior_room",{userData:req.user});
});




// 회원가입 페이지
app.get("/register",function(req,res){
    res.render("join");
})

// 회원가입 페이지 post로 db에 데이터 올리기
app.post("/userJoin",function(req,res){
    db.collection("userInfo").findOne({joinid:req.body.userid},function(err,result){
        if(result) {
            res.send("<script> alert('이미 가입된 아이디 입니다.'); location.href = '/login' </script>")
        }
        else {
            db.collection("count").findOne({name:"회원정보"},function(err,result){
                db.collection("userInfo").insertOne({
                    joinno:result.userCount + 1,
                    joinnick:req.body.username,
                    joinid:req.body.userid,
                    joinpass:req.body.userpass
                },function(err,result){
                    db.collection("count").updateOne({name:"회원정보"},{$inc:{userCount:1}},function(err,result){
                        res.send ("<script> alert('회원가입을 축하드립니다.'); location.href = '/login' </script>")
                    })
                });
            });
        }
    });
});

// 로그인 페이지
app.get("/login",function(req,res){
    res.render("login");
})

// 로그인시 입력한 아이디, 비밀번호 검증 처리
app.post("/userLogin",passport.authenticate('local', {failureRedirect : '/fail'}),function(req,res){
    db.collection("userInfo").findOne({joinid:req.user.joinid},function(err,result){
        res.redirect("/");
    });
});

//로그인 실패시
app.get("/fail",function(req,res){
    res.send("<script>alert('아이디와 비밀번호를 다시한번 확인해 주세요.'); location.href = '/login' </script>");
});

// /userLogin 경로 요청시 passport.autenticate() 함수 구간이 아이디, 비밀번호 로그인 검증 구간
passport.use(new LocalStrategy({
    usernameField: 'userid',    // login.ejs에서 입력한 아이디의 name값
    passwordField: 'userpass',    // login.ejs에서 입력한 비밀번호의 name값
    session: true,      // 세션을 이용할것인지에 대한 여부
    passReqToCallback: false,   // 아이디와 비밀번호 말고도 다른 항목들을 더 검사할것인가에 대한 여부
  }, function (userid, userpass, done) {
    //console.log(입력한아이디, 입력한비번);
    db.collection('userInfo').findOne({joinid:userid }, function(err,result) {
      if (err) return done(err)
// 아래의 message는 필요에 따라 뻴수도 있다. 
      if (!result) return done(null, false, { message: '존재하지않는 아이디 입니다.' })
      if (userpass == result.joinpass) {
        return done(null, result)
      } else {
        return done(null, false, { message: '비밀번호를 다시한번 확인해 주세요.' })
      }
    })
}));

// 최초의 로그인시 한번 실행
// ↓ 여기서 생성된 매게변수 user로 req.user~~를 쓸 수 있다.
passport.serializeUser(function (user, done) {
    // ↓ 서버에는 세션을 만들고 / 사용자 웹 브라우저에는 쿠키를 만들어준다. 
   done(null, user.joinid)
});

// 로그인 할 때마다 실행
passport.deserializeUser(function (userid, done) {
   db.collection("userInfo").findOne({joinid:userid }, function(err,result){
       done(null,result)
   });
});

// 로그아웃 기능 작업
app.get("/logout",function(req,res){
    // 서버의 세션을 삭제하고, 본인 웹브라우저의 쿠키를 삭제한다.
    req.session.destroy(function(err,result){
        // 지워줄 쿠키를 선택한다. / 콘솔 로그의 application → cookies에 가면 name에서 확인할 수 있다.
        res.clearCookie("connect.sid")
        // 로그아웃 후 다시 메인페이지로 돌아가기
        res.redirect("/");
    });
});

// 회원정보 수정 페이지
app.get("/userInfo",function(req,res){
    res.render("user_info",{userData:req.user});
});

app.post("/userInfoChg",function(req,res){
    db.collection("userInfo").findOne({joinid:req.user.joinid},function(err,result){
        if(req.body.userpass === req.user.joinpass){
            db.collection("userInfo").updateOne({joinid:req.user.joinid},{$set:{
                joinnick:req.body.username,
                joinpass:req.body.userpass
            }},function(err,result){
                res.redirect("/");
            });
        }
        else {
            res.send("<script>alert('비밀번호를 다시한번 확인해 주세요'); location.href='/userInfo'</script>")
        }
    });
});