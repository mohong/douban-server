/**
 * 爬虫路由
 * Created by mohong on 2016/11/1.
 */

var SpiderController = require('../controller/spider.server.controller');

module.exports = function (app) {
    app.get('/spider_detail', function(req, res){
        SpiderController('https://movie.douban.com/subject/26433966/');
        res.send('爬取电影详情页的爬虫已经启动……');
    });
};