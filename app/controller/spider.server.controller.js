/**
 * 爬虫后端控制器
 * Created by mohong on 2016/11/1.
 */
var request = require('request');
var model = require('../models/movie.server.models');
var MovieController = require('./movie.server.controller');
var parseLink = require('../models/parselink.server.model');
var ParseLinkController = require('./parselink.server.controller');

module.exports = {
    /*
     *通过详情页url获得电影详情信息
     */
    getDetail:function (url) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = model(body);
                MovieController.add(data.douban_id,data.title,data.director,data.writer,data.actors,data.type,data.country,data.language,data.released,data.duration,data.rate,data.star,data.link,data.post,data.classify);
            }
        });
    },

    getUrlByTag: function (tag) {
        var total = 0;
        var options = {
            url: 'https://movie.douban.com/tag/'+tag+'?start=20&type=T',
            headers: {
                'User-Agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; 360SE)',
                'Connection':'keep-alive'
            }
        };

        var num = 0;
        console.log('即将向豆瓣发起请求');
        var timer = setInterval(function () {
            options.url = 'https://movie.douban.com/tag/'+tag+'?start='+ num * 20 + '&type=T';
            getCurUrl(options).then(saveUrl);
            console.log('当前标签是：'+decodeURI(tag)+',总页数：'+total+'，当前是第'+num+'页');
            num ++;
            if (num == total){
                clearInterval(timer);
                console.log(decodeURI(tag)+'标签爬取完成');
            }
        },3000);
       
        //获取总页数
        function getPagesize(options) {
            return new Promise(function (resolve,reject) {
                request(options,function (error,response,body) {
                    if (!error && response.statusCode == 200){
                        resolve(parseLink(body).pagesize);
                    }
                })
            })
        }
        getPagesize(options).then(function (value) {
            total = value;
        });

        //获取当前页的所有url(20个)
        function getCurUrl(options) {
            return new Promise(function (resolve,reject) {
                request(options,function (error,response,body) {
                    if (!error && response.statusCode == 200){
                        console.log('成功请求到数据');
                        resolve(parseLink(body).url);
                    }
                })
            })
        }

        //保存url至数据库
        function saveUrl(urls) {
            for (var item in urls){
                ParseLinkController.add(urls[item]);
                //console.log(urls[item]);
            }
            console.log('数据已经保存到到数据库中');
        }
    }
};