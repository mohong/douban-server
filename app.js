/**
 * 主程序入口
 * Created by mohong on 2016/10/31.
 */
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var MovieController = require('./app/controller/movie.server.controller');

var app = express();

app.get('/test', function(req, res){
    request('https://movie.douban.com/subject/26433966/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            var data = {"title":$('#content h1 span').text().trim()};
            MovieController.add('post_test','post_title','rate_test','link_test','status');
            console.log('数据已经保存到数据库~');
           // res.send('hello world');
            res.send('爬虫已经启动……');
        }
    });
});
app.listen(3000);
console.log('sever start , url: http://localhost:3000');