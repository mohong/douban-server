/**
 * 爬虫路由
 * Created by mohong on 2016/11/1.
 */

var SpiderController = require('../controller/spider.server.controller');
var ParselinkController = require('../controller/parselink.server.controller')
var async = require('async');

module.exports = function (app) {
    app.get('/spider_detail', function(req, res){
        SpiderController.getDetail('https://movie.douban.com/subject/24751756/');
        res.send('爬取电影详情页的爬虫已经启动……');
    });

    app.get('/spider_link',function (req,res) {
        var tag = encodeURI('烂片');
        SpiderController.getUrlByTag(tag);
        res.send('正在通过年份标签获取电影地址');
    });

    app.get('/getlinkbyid',function (req,res) {

        var i = 7407;
        var timer = setInterval(function () {
            ParselinkController.getLinkById(i,Print);
            if (i == 7420){
                clearInterval(timer);
            }
        },3000);

        function Print(value) {
           if ('' == value.toString()){
               console.log('此处为空,id为：'+i);
               i++;
           }else {
               console.log('正在抓取的地址：'+value+'id:'+i);
               SpiderController.getDetail(value[0].detaillink);
               i++;
           }
        }

    })
};