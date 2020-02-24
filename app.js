var express = require('express')
var router = require('./router.js')

var app = express();

var allowCors = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
  };
  app.use(allowCors);//使用跨域中间件

app.use(router)


app.listen(8081,()=>{
    console.log('running')
    
})