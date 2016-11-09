/**
 * 主程序入口
 * Created by mohong on 2016/10/31.
 */
var express = require('express');



var app = express();

require('./app/routes/spider.server.route')(app);

app.listen(3000);

//挂载静态资源处理中间件
app.use(express.static(__dirname+"/public"));
//设置模板视图的目录
app.set("views","./public/views");
//设置是否启用视图编译缓存，启用将加快服务器执行效率
app.set("view cache",false);
//设置模板引擎的格式即运用何种模板引擎
app.set("view engine","ejs");

//设置路由
app.get("/analyze",function(req,res){
    res.render("analyze",{});
});
app.get("/regional",function(req,res){
    res.render("regional",{});
});
app.get("/dbreport",function(req,res){
    res.render("dbreport",{});
});


console.log('sever start , url: http://localhost:3000');