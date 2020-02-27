var express = require("express");
var {
  query,
  queryList,
  queryDetail,
  queryUser,
  querySerach
} = require("./api/query.js");
var { insertUser } = require("./api/insert");
const jwt = require("jsonwebtoken");

//1.创建一个路由容器
var router = express.Router();
//填写自己需要路由的地址
// router.get("/", async function(req, res) {
//   var myres = await query("comment", `comments where mname='罗小黑战记'`);
//   console.log(myres);

//   res.json({ data: myres });
// });

router.get("/carousel", async function(req, res) {
  var myres = await query("*", `carousel`);
  res.json({ data: myres });
});

// 获取home页的电影图片，名称以及total
router.get("/all/:name/:page", async function(req, res) {
  const { name, page } = req.params;
  var myres = await queryList(name, page);

  res.json({
    data: {
      total: myres[0][0].total,
      list: myres[1]
    },
    meta: { status: 200 }
  });
});

//获取detail页面的图片，名称，演员等信息
router.get("/detail/:activeName/:mname", async function(req, res) {
  const { mname, activeName } = req.params;

  var myres = await queryDetail(activeName, mname);
  // console.log(myres[1]);

  res.json({
    data: {
      list: myres[0][0],
      src: myres[1]
    },
    meta: { status: 200 }
  });
});

// 用户登录
router.post("/login", async (req, res) => {
  const myres = await queryUser(req.body.name);
  // console.log(myres[0])
  const token = jwt.sign(
    {
      name: req.body.name
    },
    "seeforKey"
  );

  if (!myres[0]) {
    // 用户不存在，直接注册
    const myres1 = await insertUser(req.body.name, req.body.password);

    if (myres1.affectedRows == 1) {
      res.send({
        name: req.body.name,
        token
      });
    }
  } else {
    const myres2 = await queryUser(req.body.name);
    const isPasswordValid = require("bcrypt").compareSync(
      req.body.password,
      myres2[0].password
    );
    if (!isPasswordValid) {
      res.status(422).send({
        message: "密码错误"
      });
    } else {
      res.send({
        name: req.body.name,
        token
      });
    }
  }
});

// 根据名字搜索影片
router.get("/search/:name", async (req,res)=>{


  
  const { name} = req.params;
    const myres = await querySerach(name)
  console.log(myres)
  if(myres.length>0){
    console.log('已找到')
    res.json({
      data:myres,
      msg:0
    })

   
    
  }else{
    console.log('没找到')
    res.json({
      data:[],
      msg:1
      
    })

    
  }
   

 
  

})
//3.把router导出
module.exports = router;
