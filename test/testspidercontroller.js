/**
 * 测试爬虫控制器
 * Created by mohong on 2016/11/5.
 */

var SpiderController = require('../app/controller/spider.server.controller');
var Model = require('../app/models/parselink.server.model');
var request = require('request');

//SpiderController.getUrlByTag(1988);

var url = 'https://movie.douban.com/tag/2015?start=2800&type=T'

request(url,function (err,body) {
    if (err) throw err;
    Model(body);
    //console.log(body);
})