/**
 * 测试爬虫控制器
 * Created by mohong on 2016/11/5.
 */

var SpiderController = require('../app/controller/spider.server.controller');
var Model = require('../app/models/parselink.server.model');
var request = require('request');

var tag = encodeURI('喜剧');
SpiderController.getUrlByTag(tag);
