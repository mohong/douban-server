/**
 * 主程序入口
 * Created by mohong on 2016/10/31.
 */
var express = require('express');
var WebRouter = require('./app/routers/web_router');

var app = express();

app.listen(4000);

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(allowCrossDomain);

//设置模板视图的目录
app.set("views","./public/views");
//设置是否启用视图编译缓存，启用将加快服务器执行效率
app.set("view cache",false);
//设置模板引擎的格式即运用何种模板引擎
app.set("view engine","ejs");

//挂载静态资源处理中间件
app.use('/public',express.static(__dirname+"/public"));
//挂载路由
app.use('/',WebRouter);

console.log('sever start , url: http://localhost:4000');