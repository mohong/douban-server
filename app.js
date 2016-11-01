/**
 * 主程序入口
 * Created by mohong on 2016/10/31.
 */
var express = require('express');



var app = express();

require('./app/routes/spider.server.route')(app);

app.listen(3000);
console.log('sever start , url: http://localhost:3000');