/**
 * 爬虫后端控制器
 * Created by mohong on 2016/11/1.
 */
var request = require('request');
var model = require('../models/movie.server.models');
var MovieController = require('./movie.server.controller');
var parseLink = require('../models/parselink.server.model');
var ParseLinkController = require('./parselink.server.controller');
var userAgentS = require('../../config/userAgent');

module.exports = {
    /*
     *通过详情页url获得电影详情信息
     */
    getDetail:function (url) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = model(body);
                MovieController.add(data.douban_movie_id,data.title,data.director,data.writer,data.actors,data.type,data.country,data.language,data.released,data.duration,data.rate,data.star,data.link);
            }
        });
    },

    /*
     * parselink.server.model用了两次，
     * 第一次是为了得到每个标签有多少页，
     * 第二次是为了得到每页的20个条目对应的详情url
     */
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
            num ++;
            console.log('总页数：'+total);
            if (num == 5){
                clearInterval(timer);
            }
        },2000);
       
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
            for (var i=0; i<urls.length; i++){
                //ParseLinkController.add(url);
                console.log(urls);
                if (i=urls.length-1){
                    console.log('已经保存到数据库中！');
                }
            }
        }
    }
};