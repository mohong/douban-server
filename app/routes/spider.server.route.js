/**
 * 爬虫路由
 * Created by mohong on 2016/11/1.
 */

var SpiderController = require('../controller/spider.server.controller');

module.exports = function (app) {
    app.get('/spider_detail', function(req, res){
        SpiderController.getDetail('https://movie.douban.com/subject/24751756/');
        res.send('爬取电影详情页的爬虫已经启动……');
    });

    app.get('/spider_link',function (req,res) {
        SpiderController.getUrlByYear(1988);
        res.send('正在通过年份标签获取电影地址');
    })
};