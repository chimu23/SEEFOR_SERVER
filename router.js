var express = require("express");
var { query, queryList, queryDetail } = require("./api/query.js");
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

 
  const {mname, activeName} = req.params
 
  var myres = await queryDetail(activeName, mname);


  res.json({ data: {
      list:myres[0][0],
      src:myres[1]
  }, meta: { status: 200 } });
});

//3.把router导出
module.exports = router;
