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
        //var tags = ['短片','魔幻','黑色幽默','传记','情色','感人','暴力','动画短片','家庭','音乐','童年','浪漫','黑帮','女性','同志','史诗','童话','烂片'];
        var tag = encodeURI('短片');
        SpiderController.getUrlByTag(tag);
        res.send('正在通过年份标签获取电影地址');
    })

    app.get('/getlinkbyid',function (req,res) {
        ParselinkController.getLinkById(34393,function () {
            
        })
    })
};